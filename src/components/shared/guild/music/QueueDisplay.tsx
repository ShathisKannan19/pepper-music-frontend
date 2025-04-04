'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getQueue } from '@/app/actions/websocket';
import { toast } from 'sonner';

interface QueueDisplayProps {
	guildId: string;
}

interface QueueItem {
	title: string;
	artist: string;
	duration: string;
	thumbnail: string;
}

const QueueDisplay = ({ guildId }: QueueDisplayProps) => {
	const [queue, setQueue] = useState<QueueItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchQueue = async () => {
		setIsLoading(true);
		try {
			const result = await getQueue(guildId);
			if (result.success) {
				// In a real implementation, your WebSocket would receive queue data
				// and you'd update the state here
				// For now, we'll just show a toast
				toast('Queue Retrieved', {
					description: 'Queue data would be displayed here',
				});
			} else {
				toast('Failed to get queue', {
					description: result.message,
				});
			}
		} catch (error) {
			toast('Error', {
				description: 'An unexpected error occurred',
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Mock queue data for demonstration
		setQueue([
			{
				title: 'Song One',
				artist: 'Artist One',
				duration: '3:45',
				thumbnail: '/api/placeholder/40/40',
			},
			{
				title: 'Song Two',
				artist: 'Artist Two',
				duration: '4:12',
				thumbnail: '/api/placeholder/40/40',
			},
			{
				title: 'Song Three',
				artist: 'Artist Three',
				duration: '3:21',
				thumbnail: '/api/placeholder/40/40',
			},
		]);
	}, []);

	return (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Queue</CardTitle>
				<button
					onClick={fetchQueue}
					disabled={isLoading}
					className="text-xs text-zinc-400 hover:text-white"
				>
					{isLoading ? 'Refreshing...' : 'Refresh'}
				</button>
			</CardHeader>
			<CardContent>
				{queue.length === 0 ? (
					<div className="text-center text-zinc-500 py-4">Queue is empty</div>
				) : (
					<div className="space-y-2">
						{queue.map((item, index) => (
							<div
								key={index}
								className="flex items-center p-2 bg-zinc-800 rounded-md"
							>
								<div className="mr-3 text-zinc-500 font-mono w-6 text-center">
									{index + 1}
								</div>
								<img
									src={item.thumbnail}
									alt={item.title}
									className="w-10 h-10 rounded mr-3"
								/>
								<div className="flex-grow min-w-0">
									<div className="truncate font-medium">{item.title}</div>
									<div className="text-xs text-zinc-400 truncate">
										{item.artist}
									</div>
								</div>
								<div className="text-zinc-400 text-sm ml-2">
									{item.duration}
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default QueueDisplay;
