import { logout } from '@/app/actions/auth';
import DashboardSEO from '@/components/dashboard/dashboardPublic';
import { DashboardSidebar } from '@/components/shared/dashboard-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getSession } from '@/lib/session';
import { Metadata, NextPage } from 'next';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: 'Pepper Dashboard | Manage Music Playback Across Your Discord Servers',
	description:
		'Access the Pepper dashboard to control music playback, manage queues and playlists, adjust volume, and customize settings across all your Discord servers. Seamless control, powerful features.',
	keywords: [
		'Pepper dashboard',
		'Discord bot dashboard',
		'manage Discord music bot',
		'music bot control panel',
		'Discord playlist manager',
		'volume control Discord bot',
		'Pepper music bot settings',
		'queue management Discord bot',
		'Lavalink Discord dashboard',
	],
};

const fetchUserData = async (sessionToken: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user',
			{
				method: 'POST',
				body: JSON.stringify({ token: sessionToken }),
				next: { revalidate: 10000 },
			},
		);

		if (!response.ok) return null;
		const data = await response.json();
		return data;
	} catch {
		return null;
	}
};

const Layout: NextPage<Props> = async ({ children }) => {
	const session = await getSession();

	if (!session) {
		return <DashboardSEO />;
	}

	const userData = await fetchUserData(session?.value);

	if (!userData) {
		await logout('/auth/login');
	}

	return (
		<SidebarProvider defaultOpen={true} className="bg-black">
			<DashboardSidebar userData={userData} />
			<section className="w-full">
				<SidebarTrigger className="text-white cursor-pointer" />
				{children}
			</section>
		</SidebarProvider>
	);
};

export default Layout;
