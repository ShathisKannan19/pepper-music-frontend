'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Music,
	Settings,
	Users,
	Shield,
	Filter,
	Volume2,
	Play,
	List,
	ListMusic,
	PlusCircle,
	User,
	BotMessageSquare,
	Crown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GuildData } from '@/types';

const GuildDashboard = ({ guildData }: { guildData: GuildData }) => {
	const [botInstalled, setBotInstalled] = useState(true);

	useEffect(() => {
		if (guildData) {
			const shadowXBot = guildData.roles.find(
				(role) => role.tags?.bot_id === '1302023614735847597',
			);
			setBotInstalled(!!shadowXBot);
		}
	}, [guildData]);

	if (!guildData) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
						<Shield className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-2xl font-bold text-white mb-2">
						Server not found
					</h1>
					<p className="text-zinc-400 mb-6">
						The server you're looking for doesn't exist or you don't have access
						to it.
					</p>
					<Link href="/dashboard/server-list">
						<Button className="bg-white text-black hover:bg-zinc-200">
							Return to Server List
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	if (!botInstalled) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center max-w-md">
					<div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
						<BotMessageSquare className="w-10 h-10 text-white" />
					</div>
					<h1 className="text-2xl font-bold text-white mb-2">
						Bot Not Installed
					</h1>
					<p className="text-zinc-400 mb-6">
						The bot needs to be added to "{guildData.name}" before you can
						manage it.
					</p>
					<Button className="bg-white text-black hover:bg-zinc-200">
						Add Bot to Server
					</Button>
				</div>
			</div>
		);
	}

	const serverIcon = guildData.icon
		? `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.webp?size=256`
		: `https://ui-avatars.com/api/?name=${encodeURIComponent(
				guildData.name,
		  )}&background=000&color=fff&size=256`;

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
						{guildData.owner_id && (
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
						<Card className="bg-black border-zinc-800 text-white">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-zinc-400">
									Bot Status
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-center">
									<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
									<span className="text-xl font-bold">Online</span>
								</div>
								<p className="text-zinc-400 text-sm mt-1">
									Last active: Just now
								</p>
							</CardContent>
						</Card>

						<Card className="bg-black border-zinc-800 text-white">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-zinc-400">
									Music Commands
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold">35</p>
								<p className="text-zinc-400 text-sm">Commands used today</p>
							</CardContent>
						</Card>

						<Card className="bg-black border-zinc-800 text-white">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-zinc-400">
									Songs Played
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold">128</p>
								<p className="text-zinc-400 text-sm">This week</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card className="bg-black border-zinc-800 text-white">
							<CardHeader>
								<CardTitle className="flex items-center">
									<ListMusic className="w-5 h-5 mr-2" />
									Recent Tracks
								</CardTitle>
								<CardDescription className="text-zinc-400">
									Recently played music in your server
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
										>
											<div className="w-10 h-10 bg-zinc-800 rounded-md flex items-center justify-center mr-3">
												<Music className="w-5 h-5 text-zinc-400" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-white font-medium truncate">
													Song Title Example {i}
												</p>
												<p className="text-zinc-400 text-sm truncate">
													Artist Name
												</p>
											</div>
											<div className="text-zinc-500 text-sm">3:45</div>
										</div>
									))}
								</div>
								<Button
									variant="outline"
									className="w-full mt-4 bg-zinc-900 border-zinc-900 text-white hover:bg-black hover:text-white cursor-pointer"
								>
									View All History
								</Button>
							</CardContent>
						</Card>

						<Card className="bg-black border-zinc-800 text-white">
							<CardHeader>
								<CardTitle className="flex items-center">
									<Users className="w-5 h-5 mr-2" />
									DJ Roles
								</CardTitle>
								<CardDescription className="text-zinc-400">
									Roles that can control the music bot
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{guildData.roles
										.slice(0, 4)
										.filter((role) => role.position > 0)
										.map((role) => (
											<div
												key={role.id}
												className="flex items-center p-2 hover:bg-zinc-800 rounded-md transition-colors"
											>
												<div
													className="w-3 h-3 rounded-full mr-3"
													style={{
														backgroundColor: role.color
															? `#${role.color.toString(16).padStart(6, '0')}`
															: '#ffffff',
													}}
												></div>
												<span className="flex-1">{role.name}</span>
												<label className="relative inline-flex items-center cursor-pointer">
													<input type="checkbox" className="sr-only peer" />
													<div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
												</label>
											</div>
										))}
								</div>
								<Button className="w-full mt-4 bg-white text-black hover:bg-zinc-200">
									<PlusCircle className="w-4 h-4 mr-2" />
									Add DJ Role
								</Button>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="music" className="pt-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2">
							<Card className="bg-black border-zinc-800 text-white">
								<CardHeader>
									<CardTitle>Music Configuration</CardTitle>
									<CardDescription className="text-zinc-400">
										Customize how the music bot behaves in your server
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="p-4 bg-zinc-800 rounded-md">
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center">
													<Volume2 className="w-4 h-4 mr-2 text-zinc-400" />
													<span className="font-medium">Default Volume</span>
												</div>
												<span className="text-sm text-zinc-400">70%</span>
											</div>
											<input
												type="range"
												min="0"
												max="100"
												defaultValue="70"
												className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
											/>
										</div>

										<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
											<div className="flex items-center">
												<Play className="w-4 h-4 mr-2 text-zinc-400" />
												<span className="font-medium">Auto-Play</span>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													className="sr-only peer"
													defaultChecked
												/>
												<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
											</label>
										</div>

										<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
											<div className="flex items-center">
												<List className="w-4 h-4 mr-2 text-zinc-400" />
												<span className="font-medium">
													Song Request Channel
												</span>
											</div>
											<Button
												variant="outline"
												className="h-8 px-3 bg-zinc-700 border-0 text-zinc-300 hover:bg-zinc-600"
											>
												#music
											</Button>
										</div>

										<div className="p-4 bg-zinc-800 rounded-md flex items-center justify-between">
											<div className="flex items-center">
												<Filter className="w-4 h-4 mr-2 text-zinc-400" />
												<span className="font-medium">
													Filter Explicit Content
												</span>
											</div>
											<label className="relative inline-flex items-center cursor-pointer">
												<input type="checkbox" className="sr-only peer" />
												<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
											</label>
										</div>
									</div>

									<Button className="bg-white text-black hover:bg-zinc-200 mt-4">
										Save Changes
									</Button>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="bg-black border-zinc-800 text-white sticky top-6">
								<CardHeader>
									<CardTitle>Commands</CardTitle>
									<CardDescription className="text-zinc-400">
										Music control commands
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									{[
										{ cmd: '/play', desc: 'Play a song' },
										{ cmd: '/skip', desc: 'Skip current song' },
										{ cmd: '/pause', desc: 'Pause playback' },
										{ cmd: '/resume', desc: 'Resume playback' },
										{ cmd: '/stop', desc: 'Stop playback' },
										{ cmd: '/queue', desc: 'Show current queue' },
										{ cmd: '/shuffle', desc: 'Shuffle the queue' },
									].map((cmd) => (
										<div key={cmd.cmd} className="p-2 bg-zinc-800 rounded-md">
											<code className="font-mono text-green-400">
												{cmd.cmd}
											</code>
											<p className="text-sm text-zinc-400 mt-1">{cmd.desc}</p>
										</div>
									))}
									<Button
										variant="outline"
										className="w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
									>
										View All Commands
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="permissions" className="pt-6">
					<Card className="bg-black border-zinc-800 text-white">
						<CardHeader>
							<CardTitle>Role Permissions</CardTitle>
							<CardDescription className="text-zinc-400">
								Configure which roles can use music bot features
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{[
									{
										name: 'Play Music',
										desc: 'Start playing music in voice channels',
									},
									{
										name: 'Skip Tracks',
										desc: 'Skip the currently playing track',
									},
									{
										name: 'Manage Queue',
										desc: 'Add, remove, or rearrange songs in the queue',
									},
									{ name: 'Control Volume', desc: 'Adjust music volume' },
								].map((perm) => (
									<div
										key={perm.name}
										className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
									>
										<div className="flex justify-between items-center mb-2">
											<div>
												<h3 className="font-medium">{perm.name}</h3>
												<p className="text-sm text-zinc-400">{perm.desc}</p>
											</div>
											<Button
												variant="outline"
												className="h-8 bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
											>
												Configure
											</Button>
										</div>
										<div className="flex flex-wrap gap-2 mt-3">
											{guildData.roles
												.slice(0, 3)
												.filter(
													(role) => role.position > 0 && !role.tags?.bot_id,
												)
												.map((role) => (
													<Badge
														key={role.id}
														className="bg-zinc-800 border border-zinc-700 flex items-center gap-1"
													>
														<div
															className="w-2 h-2 rounded-full"
															style={{
																backgroundColor: role.color
																	? `#${role.color
																			.toString(16)
																			.padStart(6, '0')}`
																	: '#ffffff',
															}}
														></div>
														{role.name}
													</Badge>
												))}
											<Badge className="bg-zinc-800 border border-zinc-700">
												+ 3 more
											</Badge>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="settings" className="pt-6">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2">
							<Card className="bg-black border-zinc-800 text-white">
								<CardHeader>
									<CardTitle>Bot Settings</CardTitle>
									<CardDescription className="text-zinc-400">
										Configure general bot settings for this server
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-4">
										<div className="p-4 bg-zinc-800 rounded-md">
											<h3 className="font-medium mb-2">Command Prefix</h3>
											<div className="flex">
												<input
													type="text"
													className="flex-1 p-2 bg-black border border-zinc-700 rounded-l-md text-white focus:outline-none focus:ring-1 focus:ring-white"
													defaultValue="/"
												/>
												<Button className="bg-white text-black hover:bg-zinc-200 rounded-l-none">
													Save
												</Button>
											</div>
										</div>

										<div className="p-4 bg-zinc-800 rounded-md">
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-medium">DJ Mode</h3>
												<label className="relative inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														className="sr-only peer"
														defaultChecked
													/>
													<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
												</label>
											</div>
											<p className="text-sm text-zinc-400">
												Only users with DJ roles can control music playback
											</p>
										</div>

										<div className="p-4 bg-zinc-800 rounded-md">
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-medium">Song Announcements</h3>
												<label className="relative inline-flex items-center cursor-pointer">
													<input
														type="checkbox"
														className="sr-only peer"
														defaultChecked
													/>
													<div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
												</label>
											</div>
											<p className="text-sm text-zinc-400">
												Announce new songs in the text channel when they start
												playing
											</p>
										</div>
									</div>

									<Button className="bg-white text-black hover:bg-zinc-200 mt-4">
										Save All Changes
									</Button>
								</CardContent>
							</Card>
						</div>

						<div>
							<Card className="bg-black border-zinc-800 text-white mb-6">
								<CardHeader>
									<CardTitle className="flex items-center">
										<Crown className="w-4 h-4 mr-2 text-yellow-400" />
										Premium Features
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										{[
											'Higher audio quality',
											'Unlimited playlists',
											'Custom bot branding',
											'24/7 playback mode',
											'Unlimited DJ roles',
										].map((feature) => (
											<div key={feature} className="flex items-center">
												<div className="w-4 h-4 mr-2 text-zinc-400">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
														<polyline points="22 4 12 14.01 9 11.01" />
													</svg>
												</div>
												<span>{feature}</span>
											</div>
										))}
									</div>
									<Button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:opacity-90">
										Upgrade to Premium
									</Button>
								</CardContent>
							</Card>

							<Card className="bg-black border-zinc-800 text-white">
								<CardHeader>
									<CardTitle className="text-red-500">Danger Zone</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<Button
											variant="outline"
											className="w-full border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
										>
											Reset Bot Settings
										</Button>
										<Button
											variant="outline"
											className="w-full border-red-800 text-red-500 hover:bg-red-900 hover:text-white"
										>
											Remove Bot from Server
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default GuildDashboard;
