'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	DiscordUserData,
	GuildCommandHistoryData,
	GuildData,
	HealthAPIData,
	MusicPlayersData,
	MusicState,
	UserGuildData,
} from '@/types';
import Overview from '@/components/shared/guild/guildOverview';
import GuildMusic from '@/components/shared/guild/guildMusic';
import GuildPermission from './guildPermission';
import GuildSettings from './guildSettings';
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
import Link from 'next/link';

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
	userData,
	userGuildData,
	healthData,
	guildCommandHistory,
	guildPlayers,
	musicState,
}: {
	guildData: GuildData;
	userData: DiscordUserData;
	userGuildData: UserGuildData;
	healthData: HealthAPIData;
	guildCommandHistory: GuildCommandHistoryData;
	guildPlayers: MusicPlayersData;
	musicState: MusicState;
}) => {
	const [activeTab, setActiveTab] = useState<TabKey>('overview');
	const ActiveComponent = tabComponents[activeTab];

	const serverIcon = getServerIcon(
		guildData.id,
		guildData.icon,
		guildData.name,
	);

	const features = guildData.features.slice(0, 3);
	const roleCount = guildData.roles.length;

	const ComingSoonTag = () => (
		<span className="text-xs text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded-md ml-2">
			Coming Soon
		</span>
	);
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
								className="bg-black border-zinc-800 text-white hover:bg-black hover:text-white cursor-pointer"
							>
								<Settings className="w-4 h-4 mr-2" />
								Server Options
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-black border-zinc-800 text-white">
							<DropdownMenuItem className=" hover:bg-zinc-800 cursor-pointer">
								<Link
									href={`https://discord.com/channels/${guildData.id}`}
									target="_blank"
								>
									View in Discord
								</Link>
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
							disabled={tab === 'permissions' || tab === 'settings'}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
							{tab === 'permissions' && <ComingSoonTag />}
							{tab === 'settings' && <ComingSoonTag />}
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
						<ActiveComponent
							guildData={guildData}
							userData={userData}
							healthData={healthData}
							guildCommandHistory={guildCommandHistory}
							guildPlayers={guildPlayers}
							musicState={musicState}
						/>
					</motion.div>
				</AnimatePresence>
			</Tabs>
		</div>
	);
};

export default GuildDashboard;
