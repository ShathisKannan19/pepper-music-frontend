import React from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MusicHistoryLoadingSkeleton from "@/components/skeletons/musicHistoryLoadingSkeleton";
import { ErrorComponent } from "../../errorComponent";
import { StatsData } from "@/types";

interface StatsMusicPageProps {
    data: StatsData | null;
    error: boolean;
}

const StatsMusicPage: React.FC<StatsMusicPageProps> = ({ data , error }) => {
    if (error) {
        return (
            <div className="text-center text-gray-400">
                <ErrorComponent />
            </div>
        );
    }

    if (!data?.top_songs) {
        return (
            <div className="text-center text-gray-400">
                No music data available.
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 space-y-8 bg-black">
            <Card className="w-full bg-black backdrop-blur-md text-white border border-zinc-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Server Top Songs</CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                        Top songs played on this server.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-80">
                        <div className="space-y-3">
                            {data.top_songs.map((song) => (
                                <div
                                    key={song.spotify_uri}
                                    className="flex items-center p-2 rounded-md hover:bg-zinc-800 transition"
                                >
                                    <div className="h-10 w-10 rounded overflow-hidden mr-3 relative bg-zinc-800">
                                        <Image
                                            src={song.artwork_url}
                                            alt={song.track}
                                            fill
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{song.track}</span>
                                            <span className="text-sm text-gray-400">
                                                {song.total_plays} plays
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-2 text-sm text-gray-400">
                                            <span>{song.artist}</span>
                                            <span className="mx-2">•</span>
                                            <span>{song.total_duration_formatted}</span>
                                            <span className="mx-2">•</span>
                                            <span>{song.unique_requesters} users</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsMusicPage;
