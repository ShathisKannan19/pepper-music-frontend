import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Disc } from 'lucide-react';
import { Badge } from '../ui/badge';
import getUserGuildsMusicHistory from '@/lib/discord/getUserGuildsMusicHistory';

const getRelativeTime = (dateString: Date) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();

	const diffMins = Math.floor(diffMs / 60000);
	if (diffMins < 60) return `${diffMins}m ago`;

	const diffHrs = Math.floor(diffMins / 60);
	if (diffHrs < 24) return `${diffHrs}h ago`;

	const diffDays = Math.floor(diffHrs / 24);
	return `${diffDays}d ago`;
};

const UserGuildsMusicHistory = async () => {
	try {
		const response = await getUserGuildsMusicHistory();
		if ('message' in response) {
			throw new Error(response.message as string);
		}

		const allTracks = response.flatMap((guild) => {
			if (!guild.history || !guild.history.data) {
				return [];
			}
			return guild.history.data.map((track) => ({
				...track,
				guildName: guild.guildName,
				guildId: guild.guildId,
			}));
		});

		const sortedTracks = allTracks.sort(
			(a, b) =>
				new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime(),
		);

		return (
			<Card className="bg-black border-zinc-800 text-white">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Server Music History</CardTitle>
					</div>
					<CardDescription className="text-zinc-400">
						Recently played tracks across your servers
					</CardDescription>
				</CardHeader>
				<CardContent>
					{sortedTracks.length === 0 ? (
						<div className="h-48 flex items-center justify-center">
							<p className="text-zinc-400">No music history found</p>
						</div>
					) : (
						<ScrollArea className="h-80">
							<div className="space-y-3">
								{sortedTracks.map((track, index) => (
									<div
										key={`${track.guildId}-${track.uri}-${index}`}
										className="flex items-center p-2 hover:bg-zinc-800 rounded-md"
									>
										{track.artworkUrl ? (
											<img
												src={track.artworkUrl}
												alt={track.title}
												className="h-10 w-10 object-cover rounded mr-3"
											/>
										) : (
											<div className="h-10 w-10 bg-zinc-800 rounded flex items-center justify-center mr-3">
												<Disc className="h-5 w-5 text-zinc-400" />
											</div>
										)}
										<div className="flex-1">
											<div className="flex justify-between items-center">
												<p className="text-sm font-medium truncate max-w-[200px]">
													{track.title}
												</p>
												<p className="text-xs text-zinc-400 ml-2">
													{getRelativeTime(track.lastPlayed)}
												</p>
											</div>
											<div className="flex items-center">
												<p className="text-xs text-zinc-400 truncate max-w-[120px]">
													{track.author}
												</p>
												<Badge
													variant="outline"
													className="ml-2 h-5 bg-zinc-900 text-zinc-400 text-xs border-zinc-700"
												>
													{track.guildName}
												</Badge>
												{track.playCount > 1 && (
													<Badge
														variant="outline"
														className="ml-2 h-5 bg-zinc-900 text-zinc-400 text-xs border-zinc-700"
													>
														Played {track.playCount}x
													</Badge>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					)}
				</CardContent>
			</Card>
		);
	} catch (error) {
		console.error('Error fetching music history:', error);

		return (
			<Card className="bg-black border-zinc-800 text-white">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle>Server Music History</CardTitle>
					</div>
					<CardDescription className="text-zinc-400">
						Recently played tracks across your servers
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-48 flex items-center justify-center">
						<p className="text-red-400">Failed to load music history</p>
					</div>
				</CardContent>
			</Card>
		);
	}
};

export default UserGuildsMusicHistory;
