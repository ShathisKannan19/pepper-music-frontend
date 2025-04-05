'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pause, Play, SkipForward, StopCircle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	getNowPlaying,
	pausePlayback,
	resumePlayback,
	skipSong,
	stopPlayback,
} from '@/app/actions/websocket';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { MusicState } from '@/types';

interface CurrentSongPlayerProps {
	guildId: string;
	musicState: MusicState;
}

const CurrentSongPlayer = ({ guildId, musicState }: CurrentSongPlayerProps) => {
	const [isLooping, setIsLooping] = useState(false);
	const [currentPosition, setCurrentPosition] = useState<number>(0);
	const { currentTrack, playing, paused } = musicState;

	useEffect(() => {
		if (currentTrack) {
			setCurrentPosition(currentTrack.position || 0);
		}
	}, [currentTrack?.uri]);

	useEffect(() => {
		let dataFetchInterval: NodeJS.Timeout;
		let smoothUpdateInterval: NodeJS.Timeout;

		dataFetchInterval = setInterval(async () => {
			await getNowPlaying(guildId);
			if (currentTrack) {
				setCurrentPosition(currentTrack.position);
			}
		}, 10000);

		if (currentTrack && playing && !paused) {
			smoothUpdateInterval = setInterval(() => {
				setCurrentPosition((prev: number) => {
					const newPosition = prev + 100;

					if (newPosition >= currentTrack.duration) {
						return currentTrack.duration;
					}

					return newPosition;
				});
			}, 100);
		}

		return () => {
			if (dataFetchInterval) clearInterval(dataFetchInterval);
			if (smoothUpdateInterval) clearInterval(smoothUpdateInterval);
		};
	}, [currentTrack, playing, paused, guildId]);

	const setToast = (title: string, description?: string) => {
		toast.success(title, {
			description: description,
		});
	};

	const handlePlayPause = async () => {
		if (!currentTrack) {
			setToast('No song is currently playing');
			return;
		}

		if (playing) {
			const result = await pausePlayback(guildId);
			if (result.success) {
				setToast('Playback paused');
			} else {
				setToast('Failed to pause', result.message);
			}
		} else {
			const result = await resumePlayback(guildId);
			if (result.success) {
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
			setToast('Playback stopped');
		} else {
			setToast('Failed to stop', result.message);
		}
	};

	const handleLoop = () => {
		setIsLooping(!isLooping);
		setToast(isLooping ? 'Loop disabled' : 'Loop enabled');
	};

	const formatTime = (milliseconds: number) => {
		if (!milliseconds && milliseconds !== 0) return '0:00';
		const seconds = milliseconds / 1000;
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	return currentTrack ? (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader>
				<CardTitle>Now Playing</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="flex-shrink-0">
						<img
							src={currentTrack.artworkUrl || '/api/placeholder/120/120'}
							alt="Song thumbnail"
							className="w-24 h-24 rounded-md"
						/>
					</div>

					<div className="flex-grow">
						<h3 className="font-semibold text-lg">{currentTrack.title}</h3>
						<p className="text-zinc-400 text-sm mb-2">{currentTrack.author}</p>

						<div className="mb-2">
							<Progress
								value={(currentPosition / currentTrack.duration) * 100 || 0}
								className="h-1 bg-zinc-700"
							/>

							<div className="flex justify-between text-xs text-zinc-500 mt-1">
								<span>{formatTime(currentPosition)}</span>
								<span>{formatTime(currentTrack.duration)}</span>
							</div>
						</div>

						<div className="flex justify-center space-x-2 mt-4">
							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
								onClick={handlePlayPause}
							>
								{playing ? (
									<Pause className="h-5 w-5" color="white" />
								) : (
									<Play className="h-5 w-5" color="white" />
								)}
							</Button>

							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
								onClick={handleSkip}
							>
								<SkipForward className="h-5 w-5" color="white" />
							</Button>

							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer"
								onClick={handleStop}
							>
								<StopCircle className="h-5 w-5" color="white" />
							</Button>

							{/* <Button
								variant="outline"
								size="icon"
								className={`rounded-full bg-black border-zinc-800 hover:bg-zinc-700 cursor-pointer ${
									isLooping ? 'text-green-400' : ''
								}`}
								onClick={handleLoop}
							>
								<Repeat className="h-5 w-5 " color="white" />
							</Button> */}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	) : (
		<Card className="bg-black border-zinc-800 text-zinc-500 text-center">
			<CardHeader>
				<CardTitle>No songs playing now</CardTitle>
			</CardHeader>
		</Card>
	);
};

export default CurrentSongPlayer;
