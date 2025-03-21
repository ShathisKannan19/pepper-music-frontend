export interface MenuItemType {
	name: string;
	value: string;
}

export interface FeaturesType extends MenuItemType {
	imgSrc: string;
}

export interface StatsData {
	status: string;
	timestamp: string;
	data: {
		id: string;
		name: string;
		uptime: number;
		players: number;
		guilds: number;
		users: number;
	};
}
