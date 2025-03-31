'use client';
import {
	connectWebsocket,
	disconnectWebsocket,
	setGuildVolume,
} from '@/app/actions/websocket';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { WebsocketService } from '@/lib/services/websocket/websocketService';
import { DiscordUserData, GuildData } from '@/types';
import { Filter, List, Play, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlobalButton from '../globalButton';
import { toast } from 'sonner';
import CurrentSongPlayer from './music/CurrentSongPlayer';
import InteractiveCommands from './music/InteractiveCommands';
import QueueDisplay from './music/QueueDisplay';

const GuildMusic = ({
	guildData,
	userData,
}: {
	guildData: GuildData;
	userData: DiscordUserData;
}) => {
	const [ws, setWs] = useState<WebsocketService | null>(null);
	const [volume, setVolume] = useState<string>('50');

	useEffect(() => {
		const initWebsocket = async () => {
			const result = await connectWebsocket();
			if (!result.success) {
				toast('Connection Failed', {
					description: result.message,
				});
			}
		};

		initWebsocket();

		return () => {
			disconnectWebsocket();
		};
	}, []);

	const setToast = (title: string, description?: string) => {
		toast(title, {
			description: description,
		});
	};

	const handleVolume = async (volume: number) => {
		const result = await setGuildVolume(guildData.id, volume);
		if (!result.success) {
			setToast('Volume Update Failed', result.message);
		} else {
			setToast('Volume Updated successfully');
		}
	};

	return (
		<div className="space-y-6">
			{/* Current Song Player */}
			<CurrentSongPlayer guildId={guildData.id} />

			{/* Queue Display */}
			<QueueDisplay guildId={guildData.id} />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
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
										<span className="text-sm text-zinc-400">{volume}%</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										onChange={(e) => setVolume(e.target.value)}
										defaultValue={volume}
										className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
									/>
								</div>

								<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
									<div className="flex items-center">
										<Play className="w-4 h-4 mr-2 text-zinc-400" />
										<span className="font-medium">Auto-Play</span>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input
											type="checkbox"
											className="sr-only peer"
											defaultChecked
										/>
										<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
									</label>
								</div>

								<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
									<div className="flex items-center">
										<List className="w-4 h-4 mr-2 text-zinc-400" />
										<span className="font-medium">Song Request Channel</span>
									</div>
									<Button
										variant="outline"
										className="h-8 px-3 bg-zinc-700 border-0 text-zinc-300 hover:bg-zinc-600"
									>
										#music
									</Button>
								</div>

								<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
									<div className="flex items-center">
										<Filter className="w-4 h-4 mr-2 text-zinc-400" />
										<span className="font-medium">Filter Explicit Content</span>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" />
										<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
									</label>
								</div>
							</div>

							<GlobalButton
								className="bg-white text-black hover:bg-zinc-200 mt-4"
								onClick={() => handleVolume(parseInt(volume))}
							>
								Save Changes
							</GlobalButton>
						</CardContent>
					</Card>
				</div>

				<div>
					{/* Interactive Commands */}
					<InteractiveCommands guildId={guildData.id} userId={userData.id} />
				</div>
			</div>
		</div>
	);
};

export default GuildMusic;
