import { logout } from '@/actions/auth';
import ServerList from '@/components/shared/serverList';
import { getSession } from '@/lib/session';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

interface Props {}

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

const Page: NextPage<Props> = async ({}) => {
	const session = await getSession();

	if (!session) {
		redirect('/auth/login');
	}

	const guildData = await fetchGuilds(session.value);

	if (!guildData) {
		await logout('/auth/login');
	}

	return <ServerList guildData={guildData} />;
};

export default Page;
