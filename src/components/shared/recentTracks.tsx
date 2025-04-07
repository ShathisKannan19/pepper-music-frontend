'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ListMusic, Music } from 'lucide-react';
import { GuildCommandHistoryData } from '@/types';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { RecentTracksLoadingSkeleton } from '../skeletons/recentTracksLoadingSkeleton';
import { TrackHistoryLoadingSkeleton } from '../skeletons/trackHistoryLoadingSkeleton';

interface RecentTracksProps {
	entityId: string;
	entityType: 'guild' | 'user' | 'topsongs';
	endpointPath?: string;
	title?: string;
	description?: string;
}

export const RecentTracks: React.FC<RecentTracksProps> = ({
	entityId,
	entityType,
	endpointPath = 'history',
	title = 'Recent Tracks',
	description = 'Recently played music',
}) => {
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [initialTracks, setInitialTracks] = useState<
		{
			title: string;
			author: string;
			sourceName: string;
			uri: string;
			played_number: number;
			timestamp: Date;
			artworkUrl: string;
		}[]
	>([]);
	const [commandHistory, setCommandHistory] =
		useState<GuildCommandHistoryData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchCommandHistory = useCallback(
		async (page: number) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/${entityType}/${entityId}/${endpointPath}?page=${page}&pageSize=10`,
					{ cache: 'no-store' },
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch ${entityType} command history`);
				}

				const data: GuildCommandHistoryData = await response.json();

				// Store first 4 tracks from first page only
				if (page === 1) {
					setInitialTracks(data.data.slice(0, 4));
				}

				setCommandHistory(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unknown error occurred',
				);
				setCommandHistory(null);
			} finally {
				setIsLoading(false);
			}
		},
		[entityId, entityType],
	);

	useEffect(() => {
		fetchCommandHistory(currentPage);
	}, [fetchCommandHistory, currentPage]);

	const paginatedHistoryTracks = useMemo(
		() => commandHistory?.data.slice() || [],
		[commandHistory],
	);

	const totalPages = useMemo(
		() => commandHistory?.pagination.totalPages || 0,
		[commandHistory],
	);

	const handlePreviousPage = useCallback(() => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	}, [currentPage]);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}, [currentPage, totalPages]);

	const renderTrackItem = useCallback(
		(track: GuildCommandHistoryData['data'][0]) => (
			<div
				key={track.uri}
				className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
			>
				<div className="mr-3 flex-shrink-0">
					{track.artworkUrl ? (
						<Image
							src={track.artworkUrl}
							width={40}
							height={40}
							alt="Track Artwork"
							className="w-10 h-10 rounded-md object-cover"
							loading="lazy"
						/>
					) : (
						<div className="w-10 h-10 bg-zinc-800 rounded-md flex items-center justify-center">
							<Music className="w-5 h-5 text-zinc-400" />
						</div>
					)}
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-white font-medium truncate">{track.title}</p>
					<p className="text-zinc-400 text-sm truncate">{track.author}</p>
				</div>
				<div className="text-zinc-500 text-sm space-x-2">
					<span>{track.played_number} plays</span>
					<span>•</span>
					<span>{new Date(track.timestamp).toLocaleDateString()}</span>
				</div>
			</div>
		),
		[],
	);

	const entityDescription = entityType === 'guild' ? 'in your server' : '';

	return (
		<>
			{initialTracks.length <= 0 && isLoading ? (
				<RecentTracksLoadingSkeleton />
			) : (
				<Card className="bg-black border-zinc-800 text-white">
					<CardHeader>
						<CardTitle className="flex items-center">
							<ListMusic className="w-5 h-5 mr-2" />
							{title}
						</CardTitle>
						<CardDescription className="text-zinc-400">
							{description} {entityDescription}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{error ? (
								<p className="text-red-500 text-center">{error}</p>
							) : (
								initialTracks.map(renderTrackItem)
							)}
						</div>
						<Button
							variant="outline"
							className="w-full mt-4 bg-zinc-900 border-zinc-900 text-white hover:bg-black hover:text-white cursor-pointer"
							onClick={() => setIsHistoryOpen(true)}
							disabled={isLoading || error !== null}
						>
							View All History
						</Button>
					</CardContent>
				</Card>
			)}

			<Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
				<DialogContent className="max-w-[50vw] bg-black border-zinc-800 text-white">
					<DialogHeader>
						<DialogTitle className="text-white">Track History</DialogTitle>
					</DialogHeader>
					<ScrollArea className="min-h-[500px] max-h-[500px]">
						{isLoading ? (
							<TrackHistoryLoadingSkeleton />
						) : error ? (
							<p className="text-red-500 text-center">{error}</p>
						) : (
							<>
								<div className="space-y-3">
									{paginatedHistoryTracks.map(renderTrackItem)}
								</div>

								<div className="flex justify-between items-center mt-4">
									<Button
										variant="outline"
										className="bg-zinc-900 border-zinc-900 text-white cursor-pointer"
										onClick={handlePreviousPage}
										disabled={currentPage === 1}
									>
										Previous
									</Button>
									<span className="text-zinc-400">
										Page {currentPage} of {totalPages}
									</span>
									<Button
										variant="outline"
										className="bg-zinc-900 border-zinc-900 text-white cursor-pointer"
										onClick={handleNextPage}
										disabled={currentPage === totalPages}
									>
										Next
									</Button>
								</div>
							</>
						)}
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	);
};
