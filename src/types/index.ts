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

export interface StatsData {
	global_stats: {
		total_songs: number;
		total_plays: number;
		total_duration_ms: number;
		total_duration_formatted: string;
		unique_artists: number;
		unique_requesters: number;
		most_active_requester: {
			id: string;
			username: string;
			total_plays: number;
		};
		average_song_duration_ms: number;
	};
	top_songs: {
		track: string;
		artist: string;
		total_plays: number;
		total_duration_ms: number;
		total_duration_formatted: string;
		unique_requesters: number;
		artwork_url: string;
		spotify_uri: string;
	}[];
}

export interface FeatureCardProps {
    readonly icon: React.ReactNode;
    readonly title: string;
    readonly description: string;
}