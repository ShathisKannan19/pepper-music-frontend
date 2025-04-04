'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, ChevronRight } from 'lucide-react';
import { inviteLink } from '@/constants';
import Link from 'next/link';
import { getServerIcon, hasDiscordPermission } from '@/helpers';
import { DiscordPermissions } from '@/enums';

interface Guild {
	id: string;
	name: string;
	icon: string;
	banner: string;
	owner: boolean;
	permissions: string;
	features: string[];
}

interface PageProps {
	guildData: Guild[];
}

export default function ServerList({ guildData }: PageProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');

	const getIconUrl = (guild: Guild) => {
		return getServerIcon(guild.id, guild.icon, guild.name);
	};

	const filteredGuilds = guildData?.filter((guild) =>
		guild.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="p-6 ">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-white mb-2">Select a Server</h1>
				<p className="text-zinc-400">
					Choose a server to manage its music bot settings
				</p>

				<div className="relative mt-4">
					<input
						type="text"
						placeholder="Search servers..."
						className="w-full p-3 pl-10 bg-black border border-zinc-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="absolute left-3 top-3.5 text-zinc-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-2 justify-between px-12">
				{filteredGuilds?.map((guild) => (
					<Card
						key={guild.id}
						className="bg-black border-zinc-800 text-white hover:border-white transition-all justify-between min-w-3xs h-64 mt-6"
					>
						<div>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-3">
									<div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800">
										<Image
											src={getIconUrl(guild)}
											alt={guild.name}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<CardTitle className="text-lg">{guild.name}</CardTitle>
										<CardDescription className="text-zinc-400">
											{guild.features.includes('COMMUNITY')
												? 'Community Server'
												: 'Regular Server'}
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pb-4">
								<div className="flex flex-wrap gap-1 mt-2">
									{guild.owner && (
										<Badge className="bg-white text-black hover:bg-zinc-200">
											Owner
										</Badge>
									)}
									{guild.features.includes('VERIFIED') && (
										<Badge className="bg-zinc-800 text-white">Verified</Badge>
									)}
								</div>
							</CardContent>
						</div>
						<CardFooter className="pt-0">
							<Button
								className={`w-full ${
									hasDiscordPermission(
										guild.permissions,
										DiscordPermissions.MANAGE_SERVER,
									)
										? 'bg-white text-black hover:bg-zinc-200 cursor-pointer'
										: 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
								}`}
								onClick={() =>
									hasDiscordPermission(
										guild.permissions,
										DiscordPermissions.MANAGE_SERVER,
									) && router.push(`/dashboard/server/${guild.id}`)
								}
								disabled={
									!hasDiscordPermission(
										guild.permissions,
										DiscordPermissions.MANAGE_SERVER,
									)
								}
							>
								{hasDiscordPermission(
									guild.permissions,
									DiscordPermissions.MANAGE_SERVER,
								)
									? 'Manage Bot'
									: 'Missing Permissions'}
								<ChevronRight className="w-4 h-4 ml-2" />
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			{filteredGuilds?.length === 0 && (
				<div className="text-center py-12 text-zinc-400">
					<div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-zinc-900 rounded-full">
						<Music className="w-8 h-8" />
					</div>
					<h3 className="text-xl font-semibold text-white">No servers found</h3>
					<p className="mt-2">
						Try adjusting your search or invite the bot to a server
					</p>
					<Link href={inviteLink} target="_blank">
						<Button className="mt-4 bg-white text-black hover:bg-zinc-200 cursor-pointer">
							Invite Bot to Server
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
