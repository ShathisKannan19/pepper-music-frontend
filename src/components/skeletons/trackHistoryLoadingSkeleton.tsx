import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export const TrackHistoryLoadingSkeleton: React.FC = () => {
	return (
		<ScrollArea className="min-h-[500px] max-h-[500px] overflow-hidden">
			<div className="space-y-3">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
					<div key={item} className="flex items-center space-x-4 py-2">
						<Skeleton className="h-10 w-10 rounded-md" />
						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
						</div>
						<Skeleton className="h-4 w-16" />
					</div>
				))}
			</div>

			<div className="flex justify-between items-center mt-4">
				<Button
					variant="outline"
					className="bg-zinc-900 border-zinc-900 text-white cursor-pointer"
					disabled
				>
					Previous
				</Button>
				<Skeleton className="h-4 w-20" />
				<Button
					variant="outline"
					className="bg-zinc-900 border-zinc-900 text-white cursor-pointer"
					disabled
				>
					Next
				</Button>
			</div>
		</ScrollArea>
	);
};
