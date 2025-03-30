import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	LineChart,
	ListMusic,
	Music,
	PlusCircle,
	Rocket,
	Users,
} from 'lucide-react';
import {
	GuildCommandHistoryData,
	GuildData,
	HealthAPIData,
	MusicPlayersData,
} from '@/types';
import { HealthAPIStatus } from '@/enums';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { RecentTracksLoadingSkeleton } from '@/components/skeletons/recentTracksLoadingSkeleton';
const RecentTracks = dynamic(
	() => import('../recentTracks').then((comp) => comp.RecentTracks),
	{ ssr: false, loading: () => <RecentTracksLoadingSkeleton /> },
);

const Overview = ({
	guildData,
	healthData,
	guildCommandHistory,
	guildPlayers,
}: {
	guildData: GuildData;
	healthData: HealthAPIData | null;
	guildCommandHistory: GuildCommandHistoryData | null;
	guildPlayers: MusicPlayersData | null;
}) => {
	let healthDate;
	if (healthData) {
		healthDate =
			new Date(healthData?.timestamp).toLocaleDateString('en-GB') +
			' ' +
			new Date(healthData.timestamp).toLocaleTimeString('en-GB');
	}
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				<Card className="bg-black border-zinc-800 text-white">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-zinc-400">
							Bot Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						{healthData?.status === HealthAPIStatus.SUCCESS ? (
							<div className="flex items-center">
								<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
								<span className="text-xl font-bold">Online</span>
							</div>
						) : (
							<div className="flex items-center">
								<div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
								<span className="text-xl font-bold">Offline</span>
							</div>
						)}
						<p className="text-zinc-400 text-sm mt-1">
							Last active: {healthDate ? healthDate : 'unknown'}
						</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-zinc-800 text-white">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-zinc-400">
							Songs Played
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">
							{guildCommandHistory?.pagination.total}
						</p>
						<p className="text-zinc-400 text-sm">Overall</p>
					</CardContent>
				</Card>

				<Card className="bg-black border-zinc-800 text-white">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-zinc-400">
							Music Activity
						</CardTitle>
					</CardHeader>
					{!Array.isArray(guildPlayers?.data) && (
						<CardContent>
							{guildPlayers?.status === 'success' &&
							guildPlayers.data.playing ? (
								<div className="flex items-center">
									<div className="mr-4 flex-shrink-0">
										{guildPlayers.data.currentTrack.artworkUrl ? (
											<Image
												src={guildPlayers.data.currentTrack.artworkUrl}
												width={50}
												height={50}
												alt="Track Artwork"
												className="rounded-md object-cover"
											/>
										) : (
											<div className="w-12 h-12 bg-zinc-800 rounded-md flex items-center justify-center">
												<Music className="w-6 h-6 text-zinc-400" />
											</div>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xl font-bold truncate">
											{guildPlayers.data.currentTrack.title}
										</p>
										<div className="flex justify-between items-center text-zinc-400 text-sm">
											<span className="truncate">
												{guildPlayers.data.currentTrack.author}
											</span>
											<div className="flex items-center space-x-2">
												<div className="flex items-center space-x-1">
													<div className="w-2 h-2 rounded-full bg-green-500"></div>
													<span>
														{guildPlayers.data.paused ? 'Paused' : 'Playing'}
													</span>
												</div>
												<span>•</span>
												<span>{guildPlayers.data.volume}%</span>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div>
									<p className="text-2xl font-bold">No Music</p>
									<p className="text-zinc-400 text-sm">Currently Idle</p>
								</div>
							)}
						</CardContent>
					)}
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<RecentTracks entityId={guildData.id} entityType="guild" />

				{/* <Card className="bg-black border-zinc-800 text-white">
					<CardHeader>
						<CardTitle className="flex items-center">
							<Users className="w-5 h-5 mr-2" />
							DJ Roles
						</CardTitle>
						<CardDescription className="text-zinc-400">
							Roles that can control the music bot
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{guildData.roles
								.slice(0, 4)
								.filter((role) => role.position > 0)
								.map((role) => (
									<div
										key={role.id}
										className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
									>
										<div
											className="w-3 h-3 rounded-full mr-3"
											style={{
												backgroundColor: role.color
													? `#${role.color.toString(16).padStart(6, '0')}`
													: '#ffffff',
											}}
										></div>
										<span className="flex-1">{role.name}</span>
										<label className="relative inline-flex items-center cursor-pointer">
											<input type="checkbox" className="sr-only peer" />
											<div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
										</label>
									</div>
								))}
						</div>
						<Button className="w-full mt-4 bg-white text-black hover:bg-zinc-200">
							<PlusCircle className="w-4 h-4 mr-2" />
							Add DJ Role
						</Button>
					</CardContent>
				</Card> */}
				<Card className="bg-black border-zinc-900 text-white">
					<CardHeader>
						<CardTitle className="flex items-center">
							<Users className="w-5 h-5 mr-2" />
							DJ Roles
						</CardTitle>
						<p className="text-zinc-400 text-sm">
							Roles that can control the music bot
						</p>
					</CardHeader>
					<CardContent className="h-full flex items-center justify-center bg-zinc-900 rounded-lg">
						<span className="text-zinc-500">coming soon</span>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Overview;
