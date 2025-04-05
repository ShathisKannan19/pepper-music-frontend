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

interface Props {
	params: Promise<{
		guildId: string;
	}>;
}

const fetchGuilds = async (token: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user/guilds',
			{
				method: 'POST',
				body: JSON.stringify({ token }),
			},
		);
		if (!response.ok) return null;
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const fetchGuild = async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/guilds/' + guildId,
		);

		if (!response.ok) return null;

		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const fetchHealthAPI = async () => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/health',
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const guildCommandHistory = async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/guild/' + guildId + '/history',
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const guildPlayers = async (guildId: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/guild/' + guildId + '/players',
		);
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};
const Page: NextPage<Props> = async ({ params }) => {
	const { guildId } = await params;
	if (!guildId) redirect('/dashboard/server-list');

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

	const healthAPIData = await fetchHealthAPI();
	const guildCommandHistoryData = await guildCommandHistory(guildId);
	const guildPlayersData = await guildPlayers(guildId);
	const userData = await GetUserData(session.value);

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
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
