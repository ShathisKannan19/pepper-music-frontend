import { logout } from '@/app/actions/auth';
import { DashboardSidebar } from '@/components/shared/dashboard-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getSession } from '@/lib/session';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

interface Props {
	children: React.ReactNode;
}

const fetchUserData = async (sessionToken: string) => {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/user',
			{
				method: 'POST',
				body: JSON.stringify({ token: sessionToken }),
				cache: 'no-store',
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
		redirect('/auth/login');
	}

	const userData = await fetchUserData(session?.value);

	if (!userData) {
		await logout('/auth/login');
	}

	return (
		<SidebarProvider defaultOpen={false} className="bg-black">
			<DashboardSidebar userData={userData} />
			<section className="w-full">
				<SidebarTrigger className="text-white cursor-pointer" />
				{children}
			</section>
		</SidebarProvider>
	);
};

export default Layout;
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
