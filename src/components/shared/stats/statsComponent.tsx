"use client";

import React, { useState, useEffect } from "react";
import StatsInsights from "./parts/statsInsights";
import StatsMusicPage from "./parts/statsMusic";
import { StatsData } from "@/types";
import FeatureCards from "./parts/featureCards";

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
			<FeatureCards />
			<StatsInsights data={data} isLoading={isLoading} error={error} />
			<StatsMusicPage data={data} isLoading={isLoading} error={error} />
		</div>
	);
}

export default StatsComponent;