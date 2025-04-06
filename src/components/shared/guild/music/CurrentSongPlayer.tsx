'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	connectWebsocket,
	getNowPlaying,
	pausePlayback,
	resumePlayback,
	skipSong,
	stopPlayback,
} from '@/app/actions/websocket';
import { MusicState } from '@/types';
import { showToast } from '@/utils/toast';
import { formatTime } from '@/utils/format';
import ProgressBar from '@/components/shared/player/progressBar';
import PlayerControls from '@/components/shared/player/playerControls';

interface CurrentSongPlayerProps {
	guildId: string;
	musicState: MusicState;
}

const CurrentSongPlayer = ({ guildId, musicState }: CurrentSongPlayerProps) => {
	const [localMusicState, setLocalMusicState] = useState(musicState);
	const [currentPosition, setCurrentPosition] = useState<number>(0);

	// Update local state when props change
	useEffect(() => {
		setLocalMusicState(musicState);
		if (musicState.currentTrack) {
			setCurrentPosition(musicState.currentTrack.position || 0);
		}
	}, [musicState]);

	// Data fetching and position updating
	useEffect(() => {
		let dataFetchInterval: NodeJS.Timeout;
		let smoothUpdateInterval: NodeJS.Timeout;

		const fetchData = async () => {
			try {
				await connectWebsocket();
				await getNowPlaying(guildId);
			} catch (error) {
				console.error('Error fetching current playback:', error);
			}
		};

		dataFetchInterval = setInterval(fetchData, 10000);

		if (
			localMusicState.currentTrack &&
			localMusicState.playing &&
			!localMusicState.paused
		) {
			smoothUpdateInterval = setInterval(() => {
				setCurrentPosition((prev: number) => {
					if (!localMusicState.currentTrack) return prev;

					const newPosition = prev + 100;
					return newPosition >= localMusicState.currentTrack.duration
						? localMusicState.currentTrack.duration
						: newPosition;
				});
			}, 100);
		}

		return () => {
			clearInterval(dataFetchInterval);
			clearInterval(smoothUpdateInterval);
		};
	}, [localMusicState, guildId]);

	// Playback control handlers
	const handlePlayPause = async () => {
		if (!localMusicState.currentTrack) {
			showToast('No song is currently playing', undefined, { type: 'info' });
			return;
		}

		try {
			if (localMusicState.playing) {
				const result = await pausePlayback(guildId);
				if (result.success) {
					setLocalMusicState((prev) => ({
						...prev,
						playing: false,
						paused: true,
					}));
					showToast('Playback paused');
				} else {
					showToast('Failed to pause', result.message, { type: 'error' });
				}
			} else {
				const result = await resumePlayback(guildId);
				if (result.success) {
					setLocalMusicState((prev) => ({
						...prev,
						playing: true,
						paused: false,
					}));
					showToast('Playback resumed');
				} else {
					showToast('Failed to resume', result.message, { type: 'error' });
				}
			}
		} catch (error) {
			console.error('Error controlling playback:', error);
			showToast('An error occurred', 'Please try again later', {
				type: 'error',
			});
		}
	};

	const handleSkip = async () => {
		try {
			const result = await skipSong(guildId);
			if (result.success) {
				showToast('Skipped to next song');
			} else {
				showToast('Failed to skip', result.message, { type: 'error' });
			}
		} catch (error) {
			console.error('Error skipping song:', error);
			showToast('An error occurred', 'Please try again later', {
				type: 'error',
			});
		}
	};

	const handleStop = async () => {
		try {
			setLocalMusicState((prev) => ({
				...prev,
				currentTrack: null,
				playing: false,
				paused: false,
			}));

			const result = await stopPlayback(guildId);
			if (result.success) {
				showToast('Playback stopped');
			} else {
				showToast('Failed to stop', result.message, { type: 'error' });
			}
		} catch (error) {
			console.error('Error stopping playback:', error);
			showToast('An error occurred', 'Please try again later', {
				type: 'error',
			});
		}
	};

	return localMusicState.currentTrack ? (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader>
				<CardTitle>Now Playing</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<div className="flex-shrink-0">
						<img
							src={
								localMusicState.currentTrack.artworkUrl ||
								'/api/placeholder/120/120'
							}
							alt="Song thumbnail"
							className="w-24 h-24 rounded-md"
						/>
					</div>

					<div className="flex-grow">
						<h3 className="font-semibold text-lg">
							{localMusicState.currentTrack.title}
						</h3>
						<p className="text-zinc-400 text-sm mb-2">
							{localMusicState.currentTrack.author}
						</p>

						{localMusicState.currentTrack && (
							<ProgressBar
								currentPosition={currentPosition}
								duration={localMusicState.currentTrack.duration}
								formatTime={formatTime}
							/>
						)}

						<PlayerControls
							isPlaying={localMusicState.playing}
							onPlayPause={handlePlayPause}
							onSkip={handleSkip}
							onStop={handleStop}
						/>
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
