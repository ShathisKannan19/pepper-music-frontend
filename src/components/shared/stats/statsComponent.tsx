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
		const data = await response.json();
		return data as StatsData;
	} catch {
		return null;
	}
}

const StatsComponent: React.FC = async () => {
	const data = await fetchAPI();
	const error = false;

	return (
		<div className="py-2 md:px-8">
			<FeatureCards />
			<StatsInsights data={data} error={error} />
			<StatsMusicPage data={data} error={error} />
		</div>
	);
}

export default StatsComponent;