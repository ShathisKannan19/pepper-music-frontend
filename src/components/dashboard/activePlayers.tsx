import { NextPage } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Music } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { MusicPlayersData, MusicTrack } from '@/types';
import { getServerIcon } from '@/helpers';
import GetUserGuildPlayers from '@/lib/discord/getUserGuildPlayers';
import Link from 'next/link';

type PlayersData = (MusicPlayersData['data'] & { icon?: string }) | any;

const ActivePlayers: NextPage = async () => {
	const playersData: PlayersData = await GetUserGuildPlayers();

	const formatTime = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const calculateProgress = (position: number, duration: number) => {
		return (position / duration) * 100;
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold text-white">Active Players</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{playersData.length > 0 ? (
					playersData.map((player: PlayersData) => (
						<Link
							href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/server/${player.guildId}`}
							target="_blank"
							key={player.guildId}
						>
							<Card className="bg-black border-zinc-800 border-2 text-white overflow-hidden hover:bg-zinc-900/20 hover:scale-101 transition-all">
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Avatar className="h-10 w-10 bg-zinc-800">
												<AvatarImage
													src={getServerIcon(
														player.guildId,
														player.icon,
														player.guildName,
													)}
												/>
											</Avatar>
											<div>
												<CardTitle className="text-base">
													{player.guildName}
												</CardTitle>
												{player.playing && (
													<CardDescription className="text-xs text-green-500">
														Playing Now
													</CardDescription>
												)}

												{player.paused && (
													<CardDescription className="text-xs text-yellow-500">
														Paused
													</CardDescription>
												)}

												{!player.playing && !player.paused && (
													<CardDescription className="text-xs text-orange-500">
														Idle
													</CardDescription>
												)}
											</div>
										</div>
										{player.currentTrack && (
											<Badge
												variant="outline"
												className="text-white border-zinc-700"
											>
												{player.currentTrack?.sourceName}
											</Badge>
										)}
									</div>
								</CardHeader>

								<CardContent className="pb-2">
									<div className="space-y-3">
										<div className="flex items-center space-x-3">
											{player.currentTrack?.artworkUrl ? (
												<img
													src={player.currentTrack?.artworkUrl}
													alt={player.currentTrack?.title}
													className="h-12 w-12 rounded object-cover"
												/>
											) : (
												<div className="h-12 w-12 bg-zinc-800 rounded flex items-center justify-center">
													<Music className="h-6 w-6 text-zinc-400" />
												</div>
											)}
											<div>
												<p className="text-sm font-medium">
													{player.currentTrack?.title}
												</p>
												<p className="text-xs text-zinc-400">
													{player.currentTrack?.author}
												</p>
											</div>
										</div>

										<div className="space-y-1">
											<Progress
												value={calculateProgress(
													player.currentTrack?.position,
													player.currentTrack?.duration,
												)}
												className="h-1 bg-zinc-800 border-white outline-white"
											/>
											<div className="flex justify-between text-xs text-zinc-400">
												<span>{formatTime(player.currentTrack?.position)}</span>
												<span>{formatTime(player.currentTrack?.duration)}</span>
											</div>
										</div>
									</div>
								</CardContent>

								<CardFooter className="pt-0">
									<div className="w-full text-xs text-zinc-400">
										<span>Volume: {player.volume}%</span>
										{player.queueSize > 0 && (
											<span className="float-right">
												{player.queueSize} in queue
											</span>
										)}
									</div>
								</CardFooter>
							</Card>
						</Link>
					))
				) : (
					<Card className="bg-black border-zinc-800 text-white col-span-full p-6 text-center">
						<p>No active players found</p>
					</Card>
				)}
			</div>
		</div>
	);
};

export default ActivePlayers;
