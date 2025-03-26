import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import GuildDashboard from '@/components/shared/guild/guildDashboard';
import { getSession } from '@/lib/session';
import { GuildData } from '@/types';
import { hasManagePermission } from '@/helpers';
import ServerNotFound from '@/components/shared/serverNotFound';

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

	const userHasPerms = hasManagePermission(userInGuildData.permissions);

	if (!userHasPerms) return <ServerNotFound />;

	return <GuildDashboard guildData={guildData} />;
};

export default Page;
