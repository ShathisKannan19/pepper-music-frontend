import { Button } from '@/components/ui/button';
import { Pause, Play, SkipForward, StopCircle } from 'lucide-react';

interface PlayerControlsProps {
	isPlaying: boolean;
	onPlayPause: () => void;
	onSkip: () => void;
	onStop: () => void;
}

const PlayerControls = ({
	isPlaying,
	onPlayPause,
	onSkip,
	onStop,
}: PlayerControlsProps) => {
	return (
		<div className="flex justify-center space-x-2 mt-4">
			<Button
				variant="outline"
				size="icon"
				className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
				onClick={onPlayPause}
			>
				{isPlaying ? (
					<Pause className="h-5 w-5" color="white" />
				) : (
					<Play className="h-5 w-5" color="white" />
				)}
			</Button>

			<Button
				variant="outline"
				size="icon"
				className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
				onClick={onSkip}
			>
				<SkipForward className="h-5 w-5" color="white" />
			</Button>

			<Button
				variant="outline"
				size="icon"
				className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
				onClick={onStop}
			>
				<StopCircle className="h-5 w-5" color="white" />
			</Button>
		</div>
	);
};

export default PlayerControls;
