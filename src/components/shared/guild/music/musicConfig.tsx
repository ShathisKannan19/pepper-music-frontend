'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Filter, List, Play, Volume2 } from 'lucide-react';
import { NextPage } from 'next';
import GlobalButton from '../../globalButton';
import { useEffect, useState } from 'react';
import { setGuildAutoPlay, setGuildVolume } from '@/app/actions/websocket';
import { MusicState } from '@/types';
import { showToast } from '@/utils/toast';
import { Switch } from '@/components/ui/switch';

interface Props {
	guildId: string;
	musicState: MusicState;
}

const MusicConfig: NextPage<Props> = ({ guildId, musicState }) => {
	// Initialize with the actual values from musicState
	const [volume, setVolume] = useState<string>(
		(musicState?.volume ?? 50).toString(),
	);
	const [newVolume, setNewVolume] = useState<string | null>(null);

	const [autoPlay, setAutoPlay] = useState<boolean>(
		musicState?.autoPlay ?? false,
	);

	const [newAutoPlay, setNewAutoPlay] = useState<boolean | null>(null);

	useEffect(() => {
		if (musicState) {
			if (
				musicState.volume !== undefined &&
				musicState.volume.toString() !== volume
			) {
				setVolume(musicState.volume.toString());
			}

			if (
				musicState.autoPlay !== undefined &&
				musicState.autoPlay !== autoPlay
			) {
				setAutoPlay(musicState.autoPlay);
			}
		}
	}, [musicState, volume, autoPlay]);

	const handleAutoPlay = async (checked: boolean) => {
		const result = await setGuildAutoPlay(guildId, checked);
		if (!result.success)
			showToast('Auto Play Update Failed', result.message, { type: 'error' });

		return result;
	};

	const handleVolume = async (volume: number) => {
		const result = await setGuildVolume(guildId, volume);
		if (!result.success)
			showToast('Volume Update Failed', result.message, { type: 'error' });

		return result;
	};

	const saveChanges = async () => {
		const volumeResult = await handleVolume(parseInt(newVolume ?? volume));
		const autoPlayResult = await handleAutoPlay(newAutoPlay ?? autoPlay);

		if (volumeResult.success && autoPlayResult.success) {
			showToast('Settings saved successfully');
		}
	};

	const ComingSoonTag = () => (
		<span className="text-xs text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded-md ml-2">
			Coming Soon
		</span>
	);

	return (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader>
				<CardTitle>Music Configuration</CardTitle>
				<CardDescription className="text-zinc-400">
					Customize how the music bot behaves in your server
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 bg-zinc-800 rounded-md">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center">
								<Volume2 className="w-4 h-4 mr-2 text-zinc-400" />
								<span className="font-medium">Default Volume</span>
							</div>
							<span className="text-sm text-zinc-400">
								{newVolume ? newVolume : volume}%
							</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							onChange={(e) => setNewVolume(e.target.value)}
							value={newVolume ?? volume}
							defaultValue={volume}
							className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
						/>
					</div>

					<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
						<div className="flex items-center">
							<Play className="w-4 h-4 mr-2 text-zinc-400" />
							<span className="font-medium flex items-center">Auto-Play</span>
						</div>

						<Switch
							checked={newAutoPlay ?? autoPlay}
							onCheckedChange={(e) => setNewAutoPlay(e)}
						/>
					</div>

					<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between opacity-60 cursor-not-allowed">
						<div className="flex items-center">
							<List className="w-4 h-4 mr-2 text-zinc-400" />
							<span className="font-medium flex items-center">
								Song Request Channel <ComingSoonTag />
							</span>
						</div>
						<GlobalButton
							variant="outline"
							className="h-8 px-3 bg-zinc-700 border-0 text-zinc-300 cursor-not-allowed"
							disabled
						>
							#music
						</GlobalButton>
					</div>

					<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between opacity-60 cursor-not-allowed">
						<div className="flex items-center">
							<Filter className="w-4 h-4 mr-2 text-zinc-400" />
							<span className="font-medium flex items-center">
								Filter Explicit Content <ComingSoonTag />
							</span>
						</div>
						<label className="relative inline-flex items-center cursor-not-allowed">
							<input type="checkbox" className="sr-only" disabled />
							<div className="w-11 h-6 bg-zinc-700 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
						</label>
					</div>
				</div>

				<GlobalButton
					className="bg-white text-black mt-4 hover:bg-zinc-900 hover:text-white"
					onClick={saveChanges}
				>
					Save Changes
				</GlobalButton>
			</CardContent>
		</Card>
	);
};

export default MusicConfig;
