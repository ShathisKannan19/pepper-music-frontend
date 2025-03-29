import { MusicPlayersData, UserGuildData } from '@/types';
import { getSession } from '../session';
import GetUserData from './getUserData';
import GetUserGuildData from './getUserGuildData';

const GetUserGuildPlayers = async () => {
	try {
		const session = await getSession();
		const token = session?.value;

		if (!token) throw new Error('Token not Provided');

		const userGuildData: UserGuildData[] = await GetUserGuildData(token);

		const userGuilds = userGuildData.map(({ id, icon }) => ({ id, icon }));

		const activePlayers = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/players',
			{ cache: 'no-store' },
		);
		const activePlayersData: MusicPlayersData = await activePlayers.json();

		// Match players with guilds and attach the icon
		const userActivePlayers = activePlayersData.data
			.map((player) => {
				const guild = userGuilds.find((g) => g.id === player.guildId);
				if (guild) {
					return {
						...player,
						icon: guild.icon,
					};
				}
				return null;
			})
			.filter(Boolean);

		return userActivePlayers;
	} catch (error) {
		return { message: 'Error Occured', error };
	}
};

export default GetUserGuildPlayers;
