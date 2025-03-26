export const formatUptime = (seconds: number) => {
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	return `${days}d ${hours}h ${minutes}m ${secs}s`;
};

export const formatTimestamp = (timestamp: string) => {
	const date = new Date(timestamp);
	return date.toLocaleString();
};

export const getOptionTypeLabel = (type: number) => {
	const types: Record<number, string> = {
		1: 'Subcommand',
		3: 'String',
		4: 'Integer',
		5: 'Boolean',
		6: 'User',
		7: 'Channel',
		8: 'Role',
		9: 'Mentionable',
		10: 'Number',
	};
	return types[type] || 'Unknown';
};

export const hasManagePermission = (permissions: string) => {
	const permNum = BigInt(permissions);
	return (permNum & BigInt(0x20)) !== BigInt(0);
};
