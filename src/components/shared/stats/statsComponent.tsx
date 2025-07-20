"use client";

import React, { useState, useEffect } from "react";
import StatsInsights from "./parts/statsInsights";
import StatsMusicPage from "./parts/statsMusic";
import { StatsData, FeatureCardProps} from "@/types";

import {
    Music,
    Users,
    Server,
    Zap,
    Award,
    Clock,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

const FeatureCardContent = [
	{
		icon: <Zap className="h-8 w-8 text-yellow-500" />,
		title: "Real-Time Analytics",
		description: "Latest real-time stats from this Discord server.",
	},
	{
		icon: <Users className="h-8 w-8 text-green-500" />,
		title: "Most Active Requester",
		description: "See who’s leading the music requests today.",
	},
	{
		icon: <Clock className="h-8 w-8 text-orange-500" />,
		title: "Total Playtime",
		description: "View the server’s cumulative listening time.",
	},
	{
		icon: <Music className="h-8 w-8 text-blue-500" />,
		title: "Total Songs",
		description: "Count of unique songs played here.",
	},
	{
		icon: <Award className="h-8 w-8 text-red-500" />,
		title: "Top Songs",
		description: "Discover the tracks you play the most.",
	},
	{
		icon: <Server className="h-8 w-8 text-purple-500" />,
		title: "Server Insights",
		description: "Quick overview of this server’s music activity.",
	},
];

const fetchAPI = async (): Promise<StatsData | null> => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/stats'
		);
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
}

function FeatureCard({
    icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <Card className="bg-black border-zinc-700 text-white">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{icon}</div>
                    <CardTitle className="mb-2">{title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        {description}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

const StatsComponent: React.FC = () => {
	const [data, setData] = useState<StatsData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetchAPI()
			.then((stats) => {
				if (!stats) {
					setError(true);
				} else {
					setData(stats);
				}
			})
			.catch(() => {
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="py-2 md:px-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto p-6 bg-black">
				{FeatureCardContent.map((feature, index) => (
					<FeatureCard
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
						key={index}
					/>
				))}
            </div>
			<StatsInsights data={data} isLoading={isLoading} error={error} />
			<StatsMusicPage data={data} isLoading={isLoading} error={error} />
		</div>
	);
}

export default StatsComponent;