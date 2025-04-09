import { HealthAPIStatus } from '@/enums';
import { Settings } from 'lucide-react';

export interface MenuItemType {
	name: string;
	value: string;
}

export interface SidebarItemType extends MenuItemType {
	icon: typeof Settings;
	children: [
		{
			name: string;
			value: string;
			icon: typeof Settings;
		},
	];
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

export interface OauthToken {
	access_token: string;
	expires_in: number;
}

export interface Session {
	name: string;
	value: string;
}
export interface DiscordUserData {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: null;
	accent_color: number;
	global_name: string;
	avatar_decoration_data: null;
	collectibles: null;
	banner_color: string;
	clan: null;
	primary_guild: null;
}
export interface DiscordData {
	user?: DiscordUserData;
}

export interface Role {
	id: string;
	name: string;
	description?: string | null;
	permissions: string;
	position: number;
	color: number;
	colors: {
		primary_color: number;
		secondary_color?: number | null;
		tertiary_color?: number | null;
	};
	hoist: boolean;
	managed: boolean;
	mentionable: boolean;
	icon?: string | null;
	unicode_emoji?: string | null;
	flags: number;
	tags?: {
		bot_id?: string;
	};
}

export interface GuildData {
	id: string;
	name: string;
	icon?: string | null;
	description?: string | null;
	home_header?: string | null;
	splash?: string | null;
	discovery_splash?: string | null;
	features: string[];
	banner?: string | null;
	owner_id: string;
	application_id?: string | null;
	region: string;
	afk_channel_id?: string | null;
	afk_timeout: number;
	system_channel_id?: string | null;
	system_channel_flags: number;
	widget_enabled: boolean;
	widget_channel_id?: string | null;
	verification_level: number;
	roles: Role[];
}

export interface UserGuildData extends DiscordUserData {
	owner: boolean;
	icon: string;
	name: string;
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

export interface MusicTrack {
	title: string;
	author: string;
	duration: number;
	position: number;
	uri: string;
	sourceName: string;
	artworkUrl: string;
}
export interface MusicPlayersData {
	status: string;
	timestamp: Date;
	data:
		| {
				guildId: string;
				guildName: string;
				playing: boolean;
				paused: boolean;
				volume: number;
				trackRepeat: boolean;
				queueRepeat: boolean;
				currentTrack: MusicTrack;
				queueSize: number;
				queue: MusicTrack[];
		  }
		| Array<{
				guildId: string;
				guildName: string;
				playing: boolean;
				paused: boolean;
				volume: number;
				trackRepeat: boolean;
				queueRepeat: boolean;
				currentTrack: MusicTrack;
				queueSize: number;
				queue: MusicTrack[];
		  }>;
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

export interface MusicState {
	currentTrack: MusicTrack | null;
	playing: boolean;
	paused: boolean;
	volume?: number;
	autoPlay?: boolean;
	queue: MusicTrack[];
}
