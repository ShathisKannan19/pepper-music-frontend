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
import { Activity, Cpu, MemoryStick, Server, Clock } from 'lucide-react';
import { formatTimestamp, formatUptime } from '@/helpers';

interface HealthData {
	status: string;
	timestamp: string;
	uptime: number;
	system: {
		platform: string;
		cpuLoad: number;
		memoryUsage: number;
		nodeVersion: string;
	};
}

interface Props {}

const fetchAPI = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + '/api/health',
	);
	const data = await response.json();
	return data;
};

const Uptime: NextPage<Props> = async ({}) => {
	const data: HealthData = await fetchAPI();

	return (
		<div className="w-full mx-auto p-4">
			<Card className="w-full bg-black text-white border-zinc-800">
				<CardHeader className="pb-2">
					<div className="flex justify-between items-center">
						<CardTitle className="text-xl font-bold">
							Pepper Bot Status
						</CardTitle>
						<Badge
							variant="outline"
							className={`${
								data.status === 'healthy'
									? 'border-green-500 text-green-500'
									: 'border-red-500 text-red-500'
							}`}
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-zinc-900 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<Activity className="h-5 w-5 text-zinc-400" />
								<h3 className="font-medium">Uptime</h3>
							</div>
							<p className="text-2xl font-mono">{formatUptime(data.uptime)}</p>
						</div>

						<div className="bg-zinc-900 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<Server className="h-5 w-5 text-zinc-400" />
								<h3 className="font-medium">Platform</h3>
							</div>
							<p className="text-lg font-mono capitalize">
								{data.system.platform}
							</p>
							<p className="text-sm text-zinc-400 mt-1">
								Node {data.system.nodeVersion}
							</p>
						</div>

						<div className="bg-zinc-900 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<Cpu className="h-5 w-5 text-zinc-400" />
								<h3 className="font-medium">CPU Load</h3>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-full bg-zinc-800 rounded-full h-2.5">
									<div
										className="bg-white h-2.5 rounded-full"
										style={{
											width: `${Math.min(data.system.cpuLoad * 10, 100)}%`,
										}}
									></div>
								</div>
								<span className="text-sm font-mono">
									{data.system.cpuLoad.toFixed(1)}%
								</span>
							</div>
						</div>

						<div className="bg-zinc-900 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<MemoryStick className="h-5 w-5 text-zinc-400" />
								<h3 className="font-medium">Memory Usage</h3>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-full bg-zinc-800 rounded-full h-2.5">
									<div
										className="bg-white h-2.5 rounded-full"
										style={{ width: `${data.system.memoryUsage}%` }}
									></div>
								</div>
								<span className="text-sm font-mono">
									{data.system.memoryUsage.toFixed(1)}%
								</span>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className="border-t border-zinc-800 pt-4">
					<div className="text-xs text-zinc-500">API Health Status</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Uptime;
