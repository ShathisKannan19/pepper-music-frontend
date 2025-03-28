import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { ListMusic } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentTracksLoadingSkeleton: React.FC = () => {
	return (
		<Card className="bg-black border-zinc-800 text-white">
			<CardHeader>
				<CardTitle className="flex items-center">
					<ListMusic className="w-5 h-5 mr-2" />
					Recent Tracks
				</CardTitle>
				<CardDescription className="text-zinc-400">
					Recently played music in your server
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{[1, 2, 3, 4].map((item) => (
						<div key={item} className="flex items-center space-x-4">
							<Skeleton className="h-10 w-10 rounded-md" />
							<div className="space-y-2 flex-1">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-3 w-1/2" />
							</div>
							<Skeleton className="h-4 w-16" />
						</div>
					))}
				</div>
				<Skeleton className="w-full h-10 mt-4" />
			</CardContent>
		</Card>
	);
};
