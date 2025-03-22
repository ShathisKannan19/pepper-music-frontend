'use client';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { pepperLogoLink, SidebarServerItems } from '@/constants';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { DiscordData } from '@/types';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const handleLogout = async () => {
	await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/logout');
	return redirect('/');
};

export function DashboardSidebar({
	userData: { user },
}: {
	userData: DiscordData;
}) {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader className="p-4">
				<Link href={'/'} className="flex items-center gap-1 z-10">
					<Image
						src={pepperLogoLink}
						width={25}
						height={100}
						className="rounded-full"
						alt="Pepper Logo"
					/>
					<h1 className="text-xl md:text-2xl font-bold">Pepper</h1>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Server Management</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{SidebarServerItems.map((item) => {
								const isActive = pathname === '/dashboard' + item.value;

								return (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton
											className={isActive ? 'bg-white text-black' : ''}
										>
											<Link
												href={'/dashboard' + item.value}
												className="flex gap-2 items-center leading-tight w-full"
											>
												<item.icon size={'20'} />
												<span className="capitalize">{item.name}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="cursor-pointer">
								<SidebarMenuButton>
									<User2 /> {user?.username}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="bg-black text-white border-zinc-800 w-[15rem]"
							>
								<DropdownMenuItem className="cursor-pointer">
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="cursor-pointer"
									onClick={handleLogout}
								>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
