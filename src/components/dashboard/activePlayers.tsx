import { NextPage } from 'next';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { MusicPlayersData, MusicTrack } from '@/types';
import { getServerIcon } from '@/helpers';
import GetUserGuildPlayers from '@/lib/discord/getUserGuildPlayers';
import Link from 'next/link';
import CurrentSongPlayer from '../shared/guild/music/CurrentSongPlayer';

type PlayersData = (MusicPlayersData['data'] & { icon?: string }) | any;

const ActivePlayers: NextPage = async () => {
	const playersData: PlayersData = await GetUserGuildPlayers();

	return (
		<div>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold text-white">Active Players</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{playersData.length > 0 ? (
					playersData.map((player: PlayersData) => (
						<Card
							key={player.guild}
							className="bg-black border-zinc-800 border-2 text-white overflow-hidden hover:bg-zinc-900/20 hover:scale-101 transition-all"
						>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<Link
										href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/server/${player.guildId}`}
										className="flex items-center space-x-3"
									>
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
										</div>
									</Link>

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
								<CurrentSongPlayer
									guildId={player.guildId}
									musicState={player}
								/>
							</CardContent>

							<CardFooter>
								<Link
									href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/server/${player.guildId}`}
									className="flex items-center justify-between gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
								>
									<span>View Dashboard</span>
									<ArrowRight size={'16'} />
								</Link>
							</CardFooter>
						</Card>
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
