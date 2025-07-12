import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	FaMusic,
	FaPlay,
	FaClock,
	FaUserAlt,
	FaUsers,
	FaCrown,
	FaHourglassHalf,
} from 'react-icons/fa';
import { MusicQuotes } from '@/constants';
import { FaDiscord } from 'react-icons/fa';
import { ErrorComponent } from '../../errorComponent';
import StatsSkeletonComponent from '@/components/skeletons/statsSkeletonComponent';

interface StatsData {
	global_stats: {
		total_songs: number;
		total_plays: number;
		total_duration_ms: number;
		total_duration_formatted: string;
		unique_artists: number;
		unique_requesters: number;
		most_active_requester: {
			id: string;
			username: string;
			total_plays: number;
		};
		average_song_duration_ms: number;
	};
	top_songs: {
		track: string;
		artist: string;
		total_plays: number;
		total_duration_ms: number;
		total_duration_formatted: string;
		unique_requesters: number;
		artwork_url: string;
		spotify_uri: string;
	}[];
}

interface StatsInsightsProps {
	data: StatsData | null;
	isLoading: boolean;
	error: boolean;
}

const parsedQuotes = MusicQuotes.map((q) => {
	const [quote, author] = q.split(' – ')
	return { quote, author }
})

const pickRandomQuote = () => {
	const idx = Math.floor(Math.random() * parsedQuotes.length)
	return parsedQuotes[idx]
}

export const StatsInsights: React.FC<StatsInsightsProps> = ({ data, isLoading, error }) => {

	if (error) return <ErrorComponent />;
	if (isLoading) return <StatsSkeletonComponent />;
	if (!data) return null;
	
	const stats = data.global_stats;

	return (
		<div className="w-full mx-auto p-6 space-y-8">
			<Card className="w-full bg-zinc-900/70 backdrop-blur-md text-white border border-zinc-700">
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl font-bold">
						Hot Info 🔥
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 text-zinc-200 p-4 bg-amber-100/10">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<FaCrown className="text-yellow-400 text-2xl" />
							<h2 className="text-lg font-semibold text-yellow-200">
								Most Active Requester
							</h2>
						</div>
						<div className="flex items-center space-x-2">
							<FaDiscord className="text-2xl text-indigo-400" />
							<a
								href={`https://discord.com/users/${stats.most_active_requester.id}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-lg font-mono text-yellow-100 hover:underline"
							>
								{stats.most_active_requester.username}
							</a>
							<span className="text-lg font-mono text-yellow-100">
								({stats.most_active_requester.total_plays} plays)
							</span>
						</div>
					</div>
					<p className="text-sm text-zinc-400">
						Stats are updated to date. Data is collected from the
						global stats endpoint.
					</p>
				</CardContent>
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-zinc-100">
						<div className="flex items-center space-x-3">
							<FaClock className="text-zinc-400 text-2xl" />
							<h3 className="text-lg font-semibold text-zinc-200">
								Total Playtime Breakdown
							</h3>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex flex-wrap gap-2">
						{stats.total_duration_formatted
							.split(', ')
							.map((part: string, idx: number) => (
								<span
									key={idx}
									className="flex items-center space-x-1 bg-teal-700/80 text-teal-100 px-3 py-1 rounded-full text-sm font-medium"
								>
									<FaHourglassHalf className="text-xs" />
									<span>{part}</span>
								</span>
							))}
					</div>
					{/* Highlight the total in a more concise summary */}
					<div className="mt-2 p-3 bg-teal-800/50 rounded-lg">
						<p className="text-sm text-teal-200">
							That's over{' '}
							<span className="font-semibold text-white">
								{Math.floor(stats.total_duration_ms / (1000 * 60 * 60 * 24 * 365))} years
							</span>{' '}
							of music enjoyed by our community—proof of how valuable our service is!
						</p>
					</div>
				</CardContent>
				<CardContent className="border-t border-zinc-800 pt-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="p-4 rounded-lg bg-blue-900/50">
							<div className="flex items-center space-x-2 mb-2">
								<FaMusic className="text-2xl text-blue-300" />
								<h3 className="font-medium text-blue-200">Total Songs</h3>
							</div>
							<p className="text-2xl font-mono">{stats.total_songs}</p>
						</div>
						<div className="p-4 rounded-lg bg-green-900/50">
							<div className="flex items-center space-x-2 mb-2">
								<FaPlay className="text-2xl text-green-300" />
								<h3 className="font-medium text-green-200">Total Plays</h3>
							</div>
							<p className="text-2xl font-mono">{stats.total_plays}</p>
						</div>
						<div className="p-4 rounded-lg bg-yellow-900/50">
							<div className="flex items-center space-x-2 mb-2">
								<FaUserAlt className="text-2xl text-yellow-300" />
								<h3 className="font-medium text-yellow-200">
									Unique Artists
								</h3>
							</div>
							<p className="text-2xl font-mono">{stats.unique_artists}</p>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
						<div className="p-4 rounded-lg bg-pink-900/50">
							<div className="flex items-center space-x-2 mb-2">
								<FaUsers className="text-2xl text-pink-300" />
								<h3 className="font-medium text-pink-200">
									Unique Requesters
								</h3>
							</div>
							<p className="text-2xl font-mono">
								{stats.unique_requesters}
							</p>
						</div>
						<div className="p-4 rounded-lg bg-teal-900/50">
							<div className="flex items-center space-x-2 mb-2">
								<FaHourglassHalf className="text-2xl text-teal-300" />
								<h3 className="font-medium text-teal-200">
									Avg. Song Duration
								</h3>
							</div>
							<p className="text-2xl font-mono">
								{(() => {
									const ms = stats.average_song_duration_ms;
									const hours = Math.floor(ms / 3600000);
									const minutes = Math.floor((ms % 3600000) / 60000);
									const seconds = Math.floor((ms % 60000) / 1000);
									if (hours > 0) {
										return `${hours} hr ${minutes} min :${seconds.toString().padStart(2, '0')} sec`;
									}
								})()}
							</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className="border-t border-zinc-800 pt-4">
					<div className="text-xs text-zinc-500">
						<p>
							{pickRandomQuote().quote} -{' '}
							<span className="font-semibold text-zinc-300">
								{pickRandomQuote().author}
							</span>
						</p>
					</div>
				</CardFooter>

			</Card>
		</div>
	);
};

export default StatsInsights;
