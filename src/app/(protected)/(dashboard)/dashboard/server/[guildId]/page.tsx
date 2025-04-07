import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { GuildData } from '@/types';
import { hasDiscordPermission } from '@/helpers';
import ServerNotFound from '@/components/shared/serverNotFound';
import { DiscordPermissions } from '@/enums';
import { GetUserData } from '@/lib/discord';
import { client_id } from '@/constants';
import BotNotinGuild from '@/components/shared/botNotinGuild';
import GuildWrapper from '@/components/shared/guild/guildWrapper';
import { useCallback } from 'react';
import { debounce } from '@/utils/debounce';

interface Props {
	params: Promise<{
		guildId: string;
	}>;
}

const DEBOUNCE_WAIT = 1000;
const fetchGuilds = debounce(async (token: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user/guilds',
			{
				method: 'POST',
				body: JSON.stringify({ token }),
				cache: 'force-cache',
				next: { revalidate: 10000 },
			},
		);
		if (!response.ok) return null;
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}, DEBOUNCE_WAIT);

const fetchGuild = debounce(async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/guilds/' + guildId,
			{ cache: 'force-cache', next: { revalidate: 10000 } },
		);

		if (!response.ok) return null;

		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}, DEBOUNCE_WAIT);

const fetchHealthAPI = debounce(async () => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/health',
			{ cache: 'force-cache', next: { revalidate: 10000 } },
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}, DEBOUNCE_WAIT);

const guildCommandHistory = debounce(async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/guild/' + guildId + '/history',
			{ cache: 'force-cache', next: { revalidate: 10000 } },
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}, DEBOUNCE_WAIT);

const guildPlayers = debounce(async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/guild/' + guildId + '/players',
			{ cache: 'force-cache', next: { revalidate: 10000 } },
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
}, DEBOUNCE_WAIT);

const Page: NextPage<Props> = async ({ params }) => {
	const { guildId } = await params;
	if (!guildId) redirect('/dashboard/server');

	const session = await getSession();

	if (!session) {
		redirect('/auth/login');
	}

	//fetch guild that is requested via params
	const guildData = await fetchGuild(guildId);

	if (!guildData) return <ServerNotFound />;

	//fetch all guilds that user is present in
	const guildDatas = await fetchGuilds(session.value);

	//get whether user is present in that guild
	const userInGuildData = guildDatas.find(
		(guildID: GuildData) => guildID.id === guildData.id,
	);

	if (!userInGuildData) return <ServerNotFound />;

	//check if bot is present in that guild
	const Bot = guildData.roles.find(
		(role: any) => role.tags?.bot_id === client_id,
	);

	if (!Bot) return <BotNotinGuild />;

	const userHasPerms = hasDiscordPermission(
		userInGuildData.permissions,
		DiscordPermissions.MANAGE_SERVER,
	);

	if (!userHasPerms) return <ServerNotFound />;

	// Using Promise.all to parallelize API calls while maintaining debouncing
	const [healthAPIData, guildCommandHistoryData, guildPlayersData, userData] =
		await Promise.all([
			fetchHealthAPI(),
			guildCommandHistory(guildId),
			guildPlayers(guildId),
			GetUserData(session.value),
		]);

	return (
		<GuildWrapper
			guildData={guildData}
			userData={userData.user}
			userGuildData={userInGuildData}
			healthData={healthAPIData}
			guildCommandHistory={guildCommandHistoryData}
			guildPlayers={guildPlayersData}
		/>
	);
};

export default Page;
