'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pause, Play, SkipForward, StopCircle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	pausePlayback,
	resumePlayback,
	skipSong,
	stopPlayback,
} from '@/app/actions/websocket';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface CurrentSongPlayerProps {
	guildId: string;
}

interface SongInfo {
	title: string;
	artist: string;
	thumbnail: string;
	duration: number;
	currentPosition: number;
}

const CurrentSongPlayer = ({ guildId }: CurrentSongPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLooping, setIsLooping] = useState(false);
	const [currentSong, setCurrentSong] = useState<SongInfo | null>(null);

	const setToast = (title: string, description?: string) => {
		toast.success(title, {
			description: description,
		});
	};

	const handlePlayPause = async () => {
		if (!currentSong) {
			setToast('No song is currently playing');
			return;
		}

		if (isPlaying) {
			const result = await pausePlayback(guildId);
			if (result.success) {
				setIsPlaying(false);
				setToast('Playback paused');
			} else {
				setToast('Failed to pause', result.message);
			}
		} else {
			const result = await resumePlayback(guildId);
			if (result.success) {
				setIsPlaying(true);
				setToast('Playback resumed');
			} else {
				setToast('Failed to resume', result.message);
			}
		}
	};

	const handleSkip = async () => {
		const result = await skipSong(guildId);
		if (result.success) {
			setToast('Skipped to next song');
		} else {
			setToast('Failed to skip', result.message);
		}
	};

	const handleStop = async () => {
		const result = await stopPlayback(guildId);
		if (result.success) {
			setIsPlaying(false);
			setToast('Playback stopped');
			setCurrentSong(null);
		} else {
			setToast('Failed to stop', result.message);
		}
	};

	const handleLoop = () => {
		setIsLooping(!isLooping);
		setToast(isLooping ? 'Loop disabled' : 'Loop enabled');
		// Here you'd implement the actual loop functionality with your websocket
	};

	const formatTime = (seconds: number) => {
		if (!seconds) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return currentSong ? (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader>
				<CardTitle>Now Playing</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="flex-shrink-0">
						<img
							src={currentSong?.thumbnail || '/api/placeholder/120/120'}
							alt="Song thumbnail"
							className="w-24 h-24 rounded-md"
						/>
					</div>

					<div className="flex-grow">
						<h3 className="font-semibold text-lg">{currentSong?.title}</h3>
						<p className="text-zinc-400 text-sm mb-2">{currentSong?.artist}</p>

						<div className="mb-2">
							{currentSong && (
								<Progress
									value={
										(currentSong?.currentPosition / currentSong?.duration) *
											100 || 0
									}
									className="h-1 bg-zinc-700"
								/>
							)}

							<div className="flex justify-between text-xs text-zinc-500 mt-1">
								<span>{formatTime(currentSong?.currentPosition || 0)}</span>
								<span>{formatTime(currentSong?.duration || 0)}</span>
							</div>
						</div>

						<div className="flex justify-center space-x-2 mt-4">
							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-zinc-800 border-0 hover:bg-zinc-700"
								onClick={handlePlayPause}
							>
								{isPlaying ? (
									<Pause className="h-5 w-5" />
								) : (
									<Play className="h-5 w-5" />
								)}
							</Button>

							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-zinc-800 border-0 hover:bg-zinc-700"
								onClick={handleSkip}
							>
								<SkipForward className="h-5 w-5" />
							</Button>

							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-zinc-800 border-0 hover:bg-zinc-700"
								onClick={handleStop}
							>
								<StopCircle className="h-5 w-5" />
							</Button>

							<Button
								variant="outline"
								size="icon"
								className={`rounded-full bg-zinc-800 border-0 hover:bg-zinc-700 ${
									isLooping ? 'text-green-400' : ''
								}`}
								onClick={handleLoop}
							>
								<Repeat className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	) : (
		<Card className="bg-black border-zinc-800 text-zinc-500 text-center">
			{' '}
			<CardHeader>
				<CardTitle>No songs playing now</CardTitle>
			</CardHeader>{' '}
		</Card>
	);
};

export default CurrentSongPlayer;
