import { GuildCommandHistoryData, UserGuildData } from '@/types';
import { getSession } from '../session';
import GetUserGuildData from './getUserGuildData';

const getUserGuildsMusicHistory = async () => {
	try {
		const session = await getSession();
		const token = session?.value;

		if (!token) throw new Error('Token not Provided');

		const userGuildData: UserGuildData[] = await GetUserGuildData(token);

		// Fetch history for each guild
		const guildHistoryPromises = userGuildData.map(async (guild) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/guild/${guild.id}/history?page=1&pageSize=10`,
			);

			const guildHistory: GuildCommandHistoryData = await response.json();

			// Return with guild name for reference
			return {
				guildName: guild.name,
				guildId: guild.id,
				guildIcon: guild.icon,
				history: guildHistory,
			};
		});

		const allGuildsHistory = await Promise.all(guildHistoryPromises);
		return allGuildsHistory;
	} catch (error) {
		return { message: 'Error Occurred', error };
	}
};

export default getUserGuildsMusicHistory;
