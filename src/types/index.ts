import { HealthAPIStatus } from '@/enums';

export interface MenuItemType {
	name: string;
	value: string;
}

export interface FeaturesType extends MenuItemType {
	imgSrc: string;
}

export interface CommandOption {
	type: number;
	name: string;
	description: string;
	required?: boolean;
	options?: CommandOption[];
	autocomplete?: boolean;
	min_value?: number;
	max_value?: number;
}

export interface BotCommand {
	name: string;
	description: string;
	type: string;
	cooldown: number;
	ownerOnly: boolean;
	premiumOnly: boolean;
	guildOnly: boolean;
	options: CommandOption[];
}

export interface CommandsData {
	status: string;
	timestamp: string;
	count: number;
	data: {
		slash: BotCommand[];
		message: BotCommand[];
	};
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

export interface HealthAPIData {
	status: HealthAPIStatus.SUCCESS;
	timestamp: Date;
	uptime: number;
	system: {
		platform: 'linux';
		cpuLoad: number;
		memoryUsage: number;
		nodeVersion: string;
	};
}

export interface BaseTrackData {
	title: string;
	author: string;
	sourceName: string;
	uri: string;
	played_number: number;
	timestamp: Date;
	artworkUrl: string;
}

export interface GuildCommandHistoryData {
	status: string;
	timestamp: Date;
	pagination: {
		page: number;
		pageSize: number;
		total: number;
		totalPages: number;
	};
	data: BaseTrackData[];
}

export interface ErrorComponentProps {
	title?: string;
	message?: string;
	retryAction?: () => void;
	customAction?: {
		label: string;
		onClick: () => void;
	};
}
