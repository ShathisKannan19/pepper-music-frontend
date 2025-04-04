import { NextPage } from 'next';
import { getMusicState } from '@/lib/services/websocket/websocketHandler';
import {
	DiscordUserData,
	GuildCommandHistoryData,
	GuildData,
	HealthAPIData,
	MusicPlayersData,
	MusicState,
	MusicTrack,
	UserGuildData,
} from '@/types';
import GuildDashboard from './guildDashboard';

interface Props {
	guildData: GuildData;
	userData: DiscordUserData;
	userGuildData: UserGuildData;
	healthData: HealthAPIData;
	guildCommandHistory: GuildCommandHistoryData;
	guildPlayers: MusicPlayersData;
}

const GuildWrapper: NextPage<Props> = async ({
	guildData,
	userData,
	userGuildData,
	healthData,
	guildCommandHistory,
	guildPlayers,
}) => {
	let musicstate = await getMusicState(guildData.id);
	if (!musicstate && !Array.isArray(guildPlayers.data))
		musicstate = guildPlayers.data;

	if (!musicstate) {
		musicstate = {
			currentTrack: null,
			isPlaying: false,
			isPaused: false,
			queue: [],
		};
	}

	return (
		<GuildDashboard
			guildData={guildData}
			userData={userData}
			userGuildData={userGuildData}
			healthData={healthData}
			guildCommandHistory={guildCommandHistory}
			guildPlayers={guildPlayers}
			musicState={musicstate}
		/>
	);
};

export default GuildWrapper;
