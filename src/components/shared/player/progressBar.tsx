import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
	currentPosition: number;
	duration: number;
	formatTime: (milliseconds: number) => string;
}

const ProgressBar = ({
	currentPosition,
	duration,
	formatTime,
}: ProgressBarProps) => {
	return (
		<div className="mb-2">
			<Progress
				value={(currentPosition / duration) * 100 || 0}
				className="h-1 bg-zinc-700"
			/>

			<div className="flex justify-between text-xs text-zinc-500 mt-1">
				<span>{formatTime(currentPosition)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	);
};

export default ProgressBar;
