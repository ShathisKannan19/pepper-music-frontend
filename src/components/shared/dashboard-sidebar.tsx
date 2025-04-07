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
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { pepperLogoLink, SidebarServerItems } from '@/constants';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown, ChevronUp, User2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { DiscordData } from '@/types';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
			<SidebarContent className="gap-0">
				{SidebarServerItems.map((item) => (
					<Collapsible key={item.name} className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel asChild>
								<CollapsibleTrigger className="flex items-center w-full cursor-pointer">
									{item.name}
									{item.children && (
										<ChevronDown
											className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
											size={16}
										/>
									)}
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.children &&
											item.children.map((child) => {
												const isActive =
													pathname === '/dashboard' + child.value;

												return (
													<SidebarMenuItem key={child.name}>
														<SidebarMenuButton
															className={isActive ? 'bg-white text-black' : ''}
														>
															<Link
																href={'/dashboard' + child.value}
																className="flex gap-2 items-center leading-tight w-full"
															>
																<child.icon size={'20'} />
																<span className="capitalize">{child.name}</span>
															</Link>
														</SidebarMenuButton>
													</SidebarMenuItem>
												);
											})}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
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
