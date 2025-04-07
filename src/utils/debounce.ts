/**
 * Debounce utility for async functions
 * Creates a debounced version of an async function that delays invoking the function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func - The async function to debounce
 * @param wait - The number of milliseconds to delay (default: 300ms)
 * @returns A debounced version of the provided function
 */
export const debounce = <F extends (...args: any[]) => Promise<any>>(
	func: F,
	wait: number = 300,
): ((...args: Parameters<F>) => Promise<ReturnType<F>>) => {
	let timeout: NodeJS.Timeout;
	let lastPromise: Promise<any> | null = null;

	return (...args: Parameters<F>): Promise<ReturnType<F>> => {
		return new Promise((resolve, reject) => {
			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(async () => {
				try {
					// Use the last promise if it exists and hasn't resolved yet
					if (!lastPromise) {
						lastPromise = func(...args);
					}
					const result = await lastPromise;
					lastPromise = null;
					resolve(result as ReturnType<F>);
				} catch (error) {
					lastPromise = null;
					reject(error);
				}
			}, wait);
		});
	};
};

/**
 * Debounce utility for synchronous functions
 * For simpler use cases that don't involve promises
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay (default: 300ms)
 * @returns A debounced version of the provided function
 */
export const debounceSync = <F extends (...args: any[]) => any>(
	func: F,
	wait: number = 300,
): ((...args: Parameters<F>) => void) => {
	let timeout: NodeJS.Timeout;

	return (...args: Parameters<F>): void => {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
};
