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

	return (
		<div className="p-6">
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
