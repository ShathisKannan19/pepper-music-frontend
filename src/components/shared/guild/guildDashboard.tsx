'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GuildData, UserGuildData } from '@/types';
import Overview from '@/components/shared/guild/giuldOverview';
import GuildMusic from '@/components/shared/guild/guildMusic';
import GuildPermission from './guildPermission';
import GuildSettings from './guildSettings';
import { client_id } from '@/constants';
import ServerNotFound from '../serverNotFound';
import BotNotinGuild from '../botNotinGuild';
import { getServerIcon } from '@/helpers';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Settings, Users } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const tabMotionVariants = {
	initial: { x: 10 },
	animate: { x: 0 },
	exit: { x: 10 },
	transition: { duration: 0.2 },
};

const tabComponents = {
	overview: Overview,
	music: GuildMusic,
	permissions: GuildPermission,
	settings: GuildSettings,
} as const;

type TabKey = keyof typeof tabComponents;

const GuildDashboard = ({
	guildData,
	userGuildData,
}: {
	guildData: GuildData;
	userGuildData: UserGuildData;
}) => {
	const [activeTab, setActiveTab] = useState<TabKey>('overview');
	const [botInstalled, setBotInstalled] = useState(true);

	useEffect(() => {
		if (guildData) {
			const shadowXBot = guildData.roles.find(
				(role) => role.tags?.bot_id === client_id,
			);
			setBotInstalled(!!shadowXBot);
		}
	}, [guildData]);

	if (!guildData) return <ServerNotFound />;
	if (!botInstalled) return <BotNotinGuild />;

	const ActiveComponent = tabComponents[activeTab];

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
			<Tabs
				defaultValue="overview"
				className="w-full"
				onValueChange={(value) => setActiveTab(value as TabKey)}
			>
				<TabsList className="bg-black border-zinc-900 border rounded-lg w-full justify-start h-auto p-0">
					{Object.keys(tabComponents).map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className="px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white data-[state=active]:shadow-none rounded-lg cursor-pointer"
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</TabsTrigger>
					))}
				</TabsList>

				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={tabMotionVariants.initial}
						animate={tabMotionVariants.animate}
						exit={tabMotionVariants.exit}
						transition={tabMotionVariants.transition}
						className="pt-6"
					>
						<ActiveComponent guildData={guildData} />
					</motion.div>
				</AnimatePresence>
			</Tabs>
		</div>
	);
};

export default GuildDashboard;
