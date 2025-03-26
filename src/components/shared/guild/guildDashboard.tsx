'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Users, Shield, BotMessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GuildData, UserGuildData } from '@/types';
import Overview from '@/components/shared/guild/giuldOverview';
import GuildMusic from '@/components/shared/guild/guildMusic';
import GuildPermission from './guildPermission';
import GuildSettings from './guildSettings';
import { client_id } from '@/constants';
import ServerNotFound from '../serverNotFound';
import BotNotinGuild from '../botNotinGuild';
import { getServerIcon } from '@/helpers';

const GuildDashboard = ({
	guildData,
	userGuildData,
}: {
	guildData: GuildData;
	userGuildData: UserGuildData;
}) => {
	const [botInstalled, setBotInstalled] = useState(true);

	useEffect(() => {
		if (guildData) {
			const shadowXBot = guildData.roles.find(
				(role) => role.tags?.bot_id === client_id,
			);
			setBotInstalled(!!shadowXBot);
		}
	}, [guildData]);

	if (!guildData) {
		return <ServerNotFound />;
	}

	if (!botInstalled) {
		return <BotNotinGuild />;
	}

	const serverIcon = getServerIcon(
		guildData.id,
		guildData.icon,
		guildData.name,
	);

	const features = guildData.features.slice(0, 3);
	const roleCount = guildData.roles.length;
	const botRoles = guildData.roles.filter((role) => role.tags?.bot_id).length;

	return (
		<div className="p-6">
			<div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
				<div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
					<Image
						src={serverIcon}
						alt={guildData.name}
						fill
						className="object-cover"
					/>
				</div>
				<div>
					<div className="flex items-center gap-2">
						<h1 className="text-3xl font-bold text-white">{guildData.name}</h1>
						{userGuildData.owner && (
							<Badge className="bg-white text-black">Owner</Badge>
						)}
					</div>
					<div className="flex flex-wrap gap-2 mt-2">
						{features.map((feature) => (
							<Badge key={feature} className="bg-zinc-800 text-zinc-300">
								{feature.replace(/_/g, ' ')}
							</Badge>
						))}
						{roleCount > 0 && (
							<Badge className="bg-zinc-800 text-zinc-300">
								<Users className="w-3 h-3 mr-1" />
								{roleCount} Roles
							</Badge>
						)}
					</div>
				</div>
				<div className="ml-auto flex-shrink-0 mt-4 md:mt-0">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="bg-zinc-800 border-zinc-700 text-white hover:bg-black hover:text-white cursor-pointer"
							>
								<Settings className="w-4 h-4 mr-2" />
								Server Options
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-black border-zinc-800 text-white">
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								View in Discord
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">
								Reset Bot Settings
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<Tabs defaultValue="overview" className="w-full">
				<TabsList className="bg-black border-zinc-900 border rounded-lg w-full justify-start h-auto p-0">
					<TabsTrigger
						value="overview"
						className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white data-[state=active]:shadow-none rounded-lg cursor-pointer"
					>
						Overview
					</TabsTrigger>
					<TabsTrigger
						value="music"
						className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white data-[state=active]:shadow-none rounded-lg cursor-pointer"
					>
						Music
					</TabsTrigger>
					<TabsTrigger
						value="permissions"
						className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white data-[state=active]:shadow-none rounded-lg cursor-pointer"
					>
						Permissions
					</TabsTrigger>
					<TabsTrigger
						value="settings"
						className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white data-[state=active]:shadow-none rounded-lg cursor-pointer"
					>
						Settings
					</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="pt-6">
					<div>
						<Overview guildData={guildData} />
					</div>
				</TabsContent>

				<TabsContent value="music" className="pt-6">
					<div>
						<GuildMusic guildData={guildData} />
					</div>
				</TabsContent>

				<TabsContent value="permissions" className="pt-6">
					<div>
						<GuildPermission guildData={guildData} />
					</div>
				</TabsContent>

				<TabsContent value="settings" className="pt-6">
					<div>
						<GuildSettings guildData={guildData} />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default GuildDashboard;
