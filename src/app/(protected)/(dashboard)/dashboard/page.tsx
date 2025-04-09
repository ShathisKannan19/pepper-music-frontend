import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import ActivePlayers from '@/components/dashboard/activePlayers';
import dynamic from 'next/dynamic';
import MusicHistoryLoadingSkeleton from '@/components/skeletons/musicHistoryLoadingSkeleton';
import { RecentTracks } from '@/components/shared/recentTracks';
import { GetUserData } from '@/lib/discord';
import { getSession } from '@/lib/session';

const UserGuildsMusicHistory = dynamic(
	() => import('@/components/dashboard/guildMusicHistory'),
	{
		loading: () => <MusicHistoryLoadingSkeleton />,
	},
);

export default async function Dashboard() {
	const session = await getSession();
	if (!session) return;

	const userData = await GetUserData(session.value);

	return (
		<div className="flex flex-col min-h-screen ">
			<main className="flex-1 p-6 space-y-6">
				<div className="flex flex-col space-y-2 py-6">
					<h1 className="text-3xl font-bold text-white">
						Hey {userData.user.global_name}!{' '}
						<span className="text-zinc-600">Welcome to Pepper</span>
					</h1>
					<p className="text-zinc-400 text-lg">
						Control your music seamlessly across all your Discord servers
					</p>
				</div>

				{/* Active Players Section */}
				<ActivePlayers />

				{/* Guild Music History */}
				<UserGuildsMusicHistory userId={userData.user.id} />
				{/* User History and Top Songs */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* User History */}

					<RecentTracks
						entityType="user"
						entityId={userData.user.id}
						title="Your History"
						description="Your personal listening history"
					/>
					{/* Top Songs */}
					<RecentTracks
						entityType="user"
						entityId={userData.user.id}
						endpointPath="topsongs"
						title="Your Top Plays"
						description="Most played tracks across all servers"
					/>
				</div>

				{/* Recommendations */}
				{/* <Card className="bg-zinc-900 border-zinc-800 text-white">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Recommended For You</CardTitle>
							<Badge variant="outline" className="text-white border-zinc-700">
								API: /music/recommendations/{'{userId}'}/{'{guildId}'}
							</Badge>
						</div>
						<CardDescription className="text-zinc-400">
							Personalized song recommendations based on your listening history
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="server1">
							<TabsList className="bg-zinc-800 border-zinc-700">
								<TabsTrigger
									value="server1"
									className="data-[state=active]:bg-zinc-900"
								>
									Server 1
								</TabsTrigger>
								<TabsTrigger
									value="server2"
									className="data-[state=active]:bg-zinc-900"
								>
									Server 2
								</TabsTrigger>
								<TabsTrigger
									value="server3"
									className="data-[state=active]:bg-zinc-900"
								>
									Server 3
								</TabsTrigger>
							</TabsList>

							{['server1', 'server2', 'server3'].map((server) => (
								<TabsContent key={server} value={server} className="mt-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
										{[1, 2, 3, 4, 5, 6].map((item) => (
											<div
												key={item}
												className="bg-zinc-800 rounded-md p-3 hover:bg-zinc-700 transition-colors"
											>
												<div className="flex items-center space-x-3 mb-2">
													<div className="h-12 w-12 bg-zinc-700 rounded-md flex items-center justify-center">
														<Music className="h-6 w-6 text-zinc-400" />
													</div>
													<div>
														<p className="text-sm font-medium">
															Recommended {item}
														</p>
														<p className="text-xs text-zinc-400">
															Similar to your top songs
														</p>
													</div>
												</div>
												<Button
													variant="ghost"
													size="sm"
													className="w-full text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:bg-zinc-600"
												>
													<Play className="h-3 w-3 mr-1" /> Play Now
												</Button>
											</div>
										))}
									</div>
								</TabsContent>
							))}
						</Tabs>
					</CardContent>
				</Card> */}
				<Card className="border-zinc-800 bg-black text-white">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Recommended For You</CardTitle>
						</div>
						<CardDescription className="text-zinc-400">
							Personalized song recommendations based on your listening history
						</CardDescription>
					</CardHeader>
					<CardContent className="bg-zinc-900 w-full h-[300px] flex justify-center items-center">
						<p className="text-zinc-500">Coming Soon</p>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
