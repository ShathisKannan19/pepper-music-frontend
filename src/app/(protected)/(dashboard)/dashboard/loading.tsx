export default function Loading() {
	return (
		<div className="fixed inset-0 bg-black flex items-center justify-center z-50">
			<div className="flex flex-col items-center">
				{/* Spinner animation */}
				<div className="h-12 w-12 rounded-full border-4 border-gray-700 border-t-white animate-spin"></div>

				{/* Loading text */}
				<p className="mt-4 text-lg font-medium text-white">Loading...</p>
			</div>
		</div>
	);
}
