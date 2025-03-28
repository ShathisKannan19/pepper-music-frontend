export enum DiscordOauthGrantTypeEnum {
	AUTHORIZATION_CODE = 'authorization_code',
}

export enum DiscordPermissions {
	MANAGE_SERVER = 0x20,
	MANAGE_CHANNELS = 0x10,
	MANAGE_ROLES = 0x10000000,
	KICK_MEMBERS = 0x2,
	BAN_MEMBERS = 0x4,
	ADMINISTRATOR = 0x8,
}

export enum HealthAPIStatus {
	SUCCESS = 'healthy',
}
