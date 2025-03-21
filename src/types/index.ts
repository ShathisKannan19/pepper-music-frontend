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
