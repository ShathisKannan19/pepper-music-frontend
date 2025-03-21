import { NextPage } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, Clock, Lock, Star, Server } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { formatTimestamp, getOptionTypeLabel } from '@/helpers';
import { BotCommand, CommandsData } from '@/types';

interface Props {}

export const metadata = {
	title: 'Pepper Bot Commands | Pepper Music Bot',
	description:
		'Browse all available slash commands for Pepper Music Bot including music playback, queue management, and statistics features.',
};

const fetchAPI = async () => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + '/api/commands',
	);
	const data = await response.json();
	return data;
};

const CommandsPage: NextPage<Props> = async ({}) => {
	const data: CommandsData = await fetchAPI();

	const categories = {
		music: ['play', 'queue', 'skip', 'stop'],
		statistics: ['chart', 'node-stats', 'ping'],
		utility: ['feedback', 'help', 'suggest-songs'],
	};

	const categorizeCommands = (commands: BotCommand[]) => {
		const result: Record<string, BotCommand[]> = {
			music: [],
			statistics: [],
			utility: [],
			other: [],
		};

		commands.forEach((cmd) => {
			if (categories.music.includes(cmd.name)) {
				result.music.push(cmd);
			} else if (categories.statistics.includes(cmd.name)) {
				result.statistics.push(cmd);
			} else if (categories.utility.includes(cmd.name)) {
				result.utility.push(cmd);
			} else {
				result.other.push(cmd);
			}
		});

		return result;
	};

	const categorizedCommands = categorizeCommands(data.data.slash);

	return (
		<div className="min-h-screen bg-black py-8 px-4">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-white mb-2 ">
					Pepper Bot Commands
				</h1>
				<p className="text-zinc-400 mb-8 text-balance">
					Total commands: {data.count} • Last updated:{' '}
					{formatTimestamp(data.timestamp)}
				</p>

				<Tabs defaultValue="music" className="w-full">
					<TabsList className="grid grid-cols-4 mb-6 bg-zinc-900">
						<TabsTrigger
							value="music"
							className="data-[state=active]:bg-white data-[state=active]:text-black text-white cursor-pointer "
						>
							Music
						</TabsTrigger>
						<TabsTrigger
							value="statistics"
							className="data-[state=active]:bg-white data-[state=active]:text-black text-white cursor-pointer"
						>
							Statistics
						</TabsTrigger>
						<TabsTrigger
							value="utility"
							className="data-[state=active]:bg-white data-[state=active]:text-black text-white cursor-pointer"
						>
							Utility
						</TabsTrigger>
						<TabsTrigger
							value="all"
							className="data-[state=active]:bg-white data-[state=active]:text-black text-white cursor-pointer"
						>
							All Commands
						</TabsTrigger>
					</TabsList>

					{Object.entries(categorizedCommands).map(([category, commands]) => (
						<TabsContent
							key={category}
							value={category === 'other' ? 'all' : category}
							className="space-y-4"
						>
							{commands.map((command) => (
								<Card
									key={command.name}
									className="bg-black text-white border-zinc-800"
								>
									<CardHeader className="pb-2">
										<div className="flex justify-between items-start">
											<div>
												<div className="flex items-center gap-2">
													<Command className="h-5 w-5 text-zinc-400" />
													<CardTitle className="text-lg font-bold">
														/{command.name}
													</CardTitle>
												</div>
												<CardDescription className="text-zinc-400 mt-1">
													{command.description}
												</CardDescription>
											</div>
											<div className="flex gap-1 flex-wrap justify-end">
												{command.cooldown > 0 && (
													<Badge
														variant="outline"
														className="border-zinc-700 text-zinc-400"
													>
														<Clock className="h-3 w-3 mr-1" />
														{command.cooldown}s
													</Badge>
												)}
												{command.ownerOnly && (
													<Badge
														variant="outline"
														className="border-zinc-700 text-zinc-400"
													>
														<Lock className="h-3 w-3 mr-1" />
														Owner
													</Badge>
												)}
												{command.premiumOnly && (
													<Badge
														variant="outline"
														className="border-yellow-700 text-yellow-400"
													>
														<Star className="h-3 w-3 mr-1" />
														Premium
													</Badge>
												)}
												{command.guildOnly && (
													<Badge
														variant="outline"
														className="border-zinc-700 text-zinc-400"
													>
														<Server className="h-3 w-3 mr-1" />
														Server
													</Badge>
												)}
											</div>
										</div>
									</CardHeader>

									{command.options.length > 0 && (
										<CardContent>
											<Collapsible className="w-full">
												<CollapsibleTrigger className="cursor-pointer flex w-full items-center justify-between rounded px-4 py-2 font-medium text-sm bg-zinc-900 hover:bg-zinc-800">
													<span>Command Options</span>
													<span className="text-xs text-zinc-500">
														{command.options.length} option(s)
													</span>
												</CollapsibleTrigger>
												<CollapsibleContent className="mt-2">
													<div className="space-y-2">
														{command.options.map((option, index) => (
															<div
																key={index}
																className="border border-zinc-800 rounded-md p-3"
															>
																<div className="flex justify-between">
																	<div>
																		<div className="flex items-center gap-2">
																			<Badge
																				variant="outline"
																				className="bg-zinc-900 text-xs text-white border-zinc-900"
																			>
																				{getOptionTypeLabel(option.type)}
																			</Badge>
																			<span className="font-mono text-sm">
																				{option.name}
																			</span>
																			{option.required && (
																				<Badge className="bg-zinc-700 text-xs">
																					Required
																				</Badge>
																			)}
																		</div>
																		<p className="text-sm text-zinc-400 mt-1">
																			{option.description}
																		</p>
																	</div>
																	<div className="text-xs text-zinc-500">
																		{option.autocomplete && 'Autocomplete'}
																		{option.min_value !== undefined &&
																			` Min: ${option.min_value}`}
																		{option.max_value !== undefined &&
																			` Max: ${option.max_value}`}
																	</div>
																</div>

																{option.type === 1 &&
																	option.options &&
																	option.options.length > 0 && (
																		<div className="mt-3 pl-4 border-l border-zinc-800 space-y-2">
																			{option.options.map(
																				(subOption, subIndex) => (
																					<div
																						key={subIndex}
																						className="bg-zinc-900 rounded-md p-2"
																					>
																						<div className="flex justify-between">
																							<div>
																								<div className="flex items-center gap-2">
																									<Badge
																										variant="outline"
																										className="bg-black text-xs text-white border-zinc-900"
																									>
																										{getOptionTypeLabel(
																											subOption.type,
																										)}
																									</Badge>
																									<span className="font-mono text-xs">
																										{subOption.name}
																									</span>
																									{subOption.required && (
																										<Badge className="bg-zinc-700 text-xs">
																											Required
																										</Badge>
																									)}
																								</div>
																								<p className="text-xs text-zinc-400 mt-1">
																									{subOption.description}
																								</p>
																							</div>
																						</div>
																					</div>
																				),
																			)}
																		</div>
																	)}
															</div>
														))}
													</div>
												</CollapsibleContent>
											</Collapsible>
										</CardContent>
									)}
								</Card>
							))}
						</TabsContent>
					))}

					<TabsContent value="all" className="space-y-4">
						{data.data.slash.map((command) => (
							<Card
								key={command.name}
								className="bg-black text-white border-zinc-800"
							>
								<CardHeader className="pb-2">
									<div className="flex justify-between items-start">
										<div>
											<div className="flex items-center gap-2">
												<Command className="h-5 w-5 text-zinc-400" />
												<CardTitle className="text-lg font-bold">
													/{command.name}
												</CardTitle>
											</div>
											<CardDescription className="text-zinc-400 mt-1">
												{command.description}
											</CardDescription>
										</div>
										<div className="flex gap-1 flex-wrap justify-end">
											{command.cooldown > 0 && (
												<Badge
													variant="outline"
													className="border-zinc-700 text-zinc-400"
												>
													<Clock className="h-3 w-3 mr-1" />
													{command.cooldown}s
												</Badge>
											)}
											{command.ownerOnly && (
												<Badge
													variant="outline"
													className="border-zinc-700 text-zinc-400"
												>
													<Lock className="h-3 w-3 mr-1" />
													Owner
												</Badge>
											)}
											{command.premiumOnly && (
												<Badge
													variant="outline"
													className="border-yellow-700 text-yellow-400"
												>
													<Star className="h-3 w-3 mr-1" />
													Premium
												</Badge>
											)}
											{command.guildOnly && (
												<Badge
													variant="outline"
													className="border-zinc-700 text-zinc-400"
												>
													<Server className="h-3 w-3 mr-1" />
													Server
												</Badge>
											)}
										</div>
									</div>
								</CardHeader>

								{command.options.length > 0 && (
									<CardContent>
										<Collapsible className="w-full ">
											<CollapsibleTrigger className="cursor-pointer flex w-full items-center justify-between rounded px-4 py-2 font-medium text-sm bg-zinc-900 hover:bg-zinc-800 ">
												<span>Command Options</span>
												<span className="text-xs text-zinc-500">
													{command.options.length} option(s)
												</span>
											</CollapsibleTrigger>
											<CollapsibleContent className="mt-2">
												<div className="space-y-2">
													{command.options.map((option, index) => (
														<div
															key={index}
															className="border border-zinc-800 rounded-md p-3"
														>
															<div className="flex justify-between">
																<div>
																	<div className="flex items-center gap-2">
																		<Badge
																			variant="outline"
																			className="bg-zinc-900 text-xs text-white border-zinc-900"
																		>
																			{getOptionTypeLabel(option.type)}
																		</Badge>
																		<span className="font-mono text-sm">
																			{option.name}
																		</span>
																		{option.required && (
																			<Badge className="bg-zinc-700 text-xs">
																				Required
																			</Badge>
																		)}
																	</div>
																	<p className="text-sm text-zinc-400 mt-1">
																		{option.description}
																	</p>
																</div>
																<div className="text-xs text-zinc-500">
																	{option.autocomplete && 'Autocomplete'}
																	{option.min_value !== undefined &&
																		` Min: ${option.min_value}`}
																	{option.max_value !== undefined &&
																		` Max: ${option.max_value}`}
																</div>
															</div>

															{option.type === 1 &&
																option.options &&
																option.options.length > 0 && (
																	<div className="mt-3 pl-4 border-l border-zinc-800 space-y-2">
																		{option.options.map(
																			(subOption, subIndex) => (
																				<div
																					key={subIndex}
																					className="bg-zinc-900 rounded-md p-2"
																				>
																					<div className="flex justify-between">
																						<div>
																							<div className="flex items-center gap-2">
																								<Badge
																									variant="outline"
																									className="bg-black text-xs text-white border-zinc-900"
																								>
																									{getOptionTypeLabel(
																										subOption.type,
																									)}
																								</Badge>
																								<span className="font-mono text-xs">
																									{subOption.name}
																								</span>
																								{subOption.required && (
																									<Badge className="bg-zinc-700 text-xs">
																										Required
																									</Badge>
																								)}
																							</div>
																							<p className="text-xs text-zinc-400 mt-1">
																								{subOption.description}
																							</p>
																						</div>
																					</div>
																				</div>
																			),
																		)}
																	</div>
																)}
														</div>
													))}
												</div>
											</CollapsibleContent>
										</Collapsible>
									</CardContent>
								)}
							</Card>
						))}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default CommandsPage;
