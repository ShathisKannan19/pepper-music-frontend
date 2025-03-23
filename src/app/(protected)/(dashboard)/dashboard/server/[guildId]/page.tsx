import { NextPage } from 'next';
import { redirect } from 'next/navigation';
import GuildDashboard from '@/components/shared/guild/guildDashboard';

interface Props {
	params: Promise<{
		guildId: string;
	}>;
}

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

	const guildData = await fetchGuild(guildId);
	return <GuildDashboard guildData={guildData} />;
};

export default Page;
