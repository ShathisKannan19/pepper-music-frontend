import { NextPage } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Server, Users, Music, Clock } from 'lucide-react';
import { formatTimestamp, formatUptime } from '@/helpers';
import { StatsData } from '@/types';
import { ErrorComponent } from '@/components/shared/errorComponent';

export const metadata = {
	title: 'Pepper Bot Stats | Real-Time Metrics for the Pepper Music Bot',
	description:
		'Track real-time statistics for Pepper Music Bot including total servers, active users, current playback sessions, uptime, and global reach. Stay updated on Pepper’s performance and usage.',
	keywords: [
		'Pepper bot stats',
		'Discord music bot stats',
		'real-time Discord bot metrics',
		'Pepper uptime',
		'Discord bot server count',
		'Pepper usage stats',
		'Discord bot analytics',
		'Lavalink bot stats',
		'Pepper bot reach and performance',
	],
};

interface Props {}

const fetchAPI = async () => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/stats',
		);
		if (!response.ok) return null;
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const StatsPage: NextPage<Props> = async ({}) => {
	const data: StatsData = await fetchAPI();
	if (!data) return <ErrorComponent />;
	return (
		<div className="min-h-screen bg-black py-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold text-white mb-8 text-center">
					Pepper Bot Statistics
				</h1>

				<Card className="w-full bg-black text-white border-zinc-800 mb-6">
					<CardHeader className="pb-2">
						<div className="flex justify-between items-center">
							<CardTitle className="text-xl font-bold">
								{data.data.name} Overview
							</CardTitle>
							<Badge
								variant="outline"
								className="border-green-500 text-green-500"
							>
								{data.status.toUpperCase()}
							</Badge>
						</div>
						<CardDescription className="text-zinc-400">
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4" />
								<span>Last updated: {formatTimestamp(data.timestamp)}</span>
							</div>
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div className="bg-zinc-900 p-4 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Activity className="h-5 w-5 text-zinc-400" />
									<h3 className="font-medium">Uptime</h3>
								</div>
								<p className="text-2xl font-mono">
									{formatUptime(data.data.uptime)}
								</p>
							</div>

							<div className="bg-zinc-900 p-4 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Server className="h-5 w-5 text-zinc-400" />
									<h3 className="font-medium">Bot ID</h3>
								</div>
								<p className="text-lg font-mono">{data.data.id}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-zinc-900 p-4 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Music className="h-5 w-5 text-zinc-400" />
									<h3 className="font-medium">Active Players</h3>
								</div>
								<p className="text-3xl font-bold text-center mt-2">
									{data.data.players}
								</p>
							</div>

							<div className="bg-zinc-900 p-4 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Server className="h-5 w-5 text-zinc-400" />
									<h3 className="font-medium">Servers</h3>
								</div>
								<p className="text-3xl font-bold text-center mt-2">
									{data.data.guilds.toLocaleString()}
								</p>
							</div>

							<div className="bg-zinc-900 p-4 rounded-lg">
								<div className="flex items-center gap-2 mb-2">
									<Users className="h-5 w-5 text-zinc-400" />
									<h3 className="font-medium">Total Users</h3>
								</div>
								<p className="text-3xl font-bold text-center mt-2">
									{data.data.users.toLocaleString()}
								</p>
							</div>
						</div>
					</CardContent>

					<CardFooter className="border-t border-zinc-800 pt-4">
						<div className="text-xs text-zinc-500">Bot Stats API</div>
					</CardFooter>
				</Card>

				<Card className="w-full bg-black text-white border-zinc-800">
					<CardHeader>
						<CardTitle className="text-xl font-bold">
							Performance History
						</CardTitle>
						<CardDescription className="text-zinc-400">
							Daily activity metrics for {data.data.name}
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="h-64 w-full bg-zinc-900 rounded-lg flex items-center justify-center">
							<p className="text-zinc-500">Performance chart coming soon</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export const dynamic = 'force-dynamic';
export default StatsPage;
