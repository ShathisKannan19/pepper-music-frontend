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
