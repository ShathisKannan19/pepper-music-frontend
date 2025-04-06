/**
 * Formats milliseconds into a time string in the format "m:ss"
 */
export const formatTime = (milliseconds: number): string => {
	if (!milliseconds && milliseconds !== 0) return '0:00';

	const seconds = milliseconds / 1000;
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);

	return `${mins}:${secs.toString().padStart(2, '0')}`;
};
