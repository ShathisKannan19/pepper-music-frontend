import { NextPage } from 'next';
import StatsComponent from "@/components/shared/stats/statsComponent"

interface Props {}

export const metadata = {
    title: 'Stats | What we have achieved with Pepper',
    description: 'View Pepper\'s music bot statistics including total songs played, unique artists, and more.',
    keywords: [
        'Discord music bot stats',
        'Pepper music bot statistics',
        'Discord music streaming stats',
        "Discord bot analytics",
    ],
};

const StatsPage: NextPage<Props> = async ({}) => {
    return (
        <div className="w-full mx-auto px-3 space-y-8 bg-black">
            <div className="text-center pt-6">
                <h1 className="text-3xl font-bold text-white mb-6">Pepper Music Bot Stats</h1>
                <p className="text-gray-400">
                    Explore Pepper's music streaming statistics including total songs played, unique artists, and more.
                </p>
            </div>
            <StatsComponent />
        </div>
    );
};

export const dynamic = 'force-dynamic';
export default StatsPage;