
import FeatureCards from "@/components/shared/stats/parts/featureCards";
import MusicHistoryLoadingSkeleton from "@/components/skeletons/musicHistoryLoadingSkeleton";
import StatsSkeletonComponent from "@/components/skeletons/statsSkeletonComponent";


export default function Loading() {
    return (
        <div className="w-full mx-auto px-3 space-y-8 bg-black">
            <div className="text-center pt-6">
                <h1 className="text-3xl font-bold text-white mb-6">Pepper Music Bot Stats</h1>
                <p className="text-gray-400">
                    Explore Pepper's music streaming statistics including total songs played, unique artists, and more.
                </p>
            </div>
            <div className="py-2 md:px-8">
                <FeatureCards />
                <StatsSkeletonComponent />
                <MusicHistoryLoadingSkeleton />
            </div>
        </div>
    );
}