'use client';
import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Play,
	SkipForward,
	Pause,
	Play as Resume,
	StopCircle,
	List,
	Shuffle,
} from 'lucide-react';
import CommandInput from './CommandInput';
import { toast } from 'sonner';
import {
	getQueue,
	pausePlayback,
	resumePlayback,
	skipSong,
	stopPlayback,
} from '@/app/actions/websocket';

interface InteractiveCommandsProps {
	guildId: string;
	userId: string;
}

const InteractiveCommands = ({ guildId, userId }: InteractiveCommandsProps) => {
	const [activeCommand, setActiveCommand] = useState<string | null>(null);

	const commands = [
		{
			cmd: '/play',
			desc: 'Play a song',
			icon: <Play className="h-4 w-4 mr-2 text-green-400" />,
			placeholder: 'Enter song name or URL',
		},
		{
			cmd: '/skip',
			desc: 'Skip current song',
			icon: <SkipForward className="h-4 w-4 mr-2 text-blue-400" />,
		},
		{
			cmd: '/pause',
			desc: 'Pause playback',
			icon: <Pause className="h-4 w-4 mr-2 text-yellow-400" />,
		},
		{
			cmd: '/resume',
			desc: 'Resume playback',
			icon: <Resume className="h-4 w-4 mr-2 text-green-400" />,
		},
		{
			cmd: '/stop',
			desc: 'Stop playback',
			icon: <StopCircle className="h-4 w-4 mr-2 text-red-400" />,
		},
		{
			cmd: '/queue',
			desc: 'Show current queue',
			icon: <List className="h-4 w-4 mr-2 text-purple-400" />,
		},
	];

	const handleCommandClick = (cmd: string) => {
		// For commands that need input like /play, show the input field
		if (cmd === '/play') {
			if (activeCommand === cmd) {
				setActiveCommand(null);
			} else {
				setActiveCommand(cmd);
			}
			return;
		}

		// For commands that don't need input, execute them directly
		executeCommand(cmd);
	};
	const executeCommand = async (cmd: string) => {
		try {
			let result;

			switch (cmd) {
				case '/skip':
					result = await skipSong(guildId);
					break;
				case '/pause':
					result = await pausePlayback(guildId);
					break;
				case '/resume':
					result = await resumePlayback(guildId);
					break;
				case '/stop':
					result = await stopPlayback(guildId);
					break;
				case '/queue':
					result = await getQueue(guildId);
					break;
				case '/shuffle':
					result = { success: true, message: 'Queue shuffled' };
					break;
				default:
					result = { success: false, message: 'Unknown command' };
			}

			if (result.success) {
				toast(cmd.substring(1), {
					description: `Command executed successfully`,
				});
			} else {
				toast('Command Failed', {
					description: result.message,
				});
			}
		} catch (error) {
			toast('Error', {
				description: `An unexpected error occurred`,
			});
		}
	};

	return (
		<Card className="bg-black border-zinc-800 text-white sticky top-6">
			<CardHeader>
				<CardTitle>Interactive Commands</CardTitle>
				<CardDescription className="text-zinc-400">
					Click a command to use it
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{commands.map((cmd) => (
					<div key={cmd.cmd}>
						<div
							className="p-2 bg-zinc-800 rounded-md cursor-pointer hover:bg-zinc-700 transition-colors"
							onClick={() => handleCommandClick(cmd.cmd)}
						>
							<div className="flex items-center">
								{cmd.icon}
								<code className="font-mono text-white">{cmd.cmd}</code>
							</div>
							<p className="text-sm text-zinc-400 mt-1">{cmd.desc}</p>
						</div>

						{activeCommand === cmd.cmd && cmd.cmd === '/play' && (
							<div className="mt-2">
								<CommandInput
									guildId={guildId}
									userId={userId}
									command={cmd.cmd}
									description={cmd.desc}
									placeholder={cmd.placeholder || ''}
									onSuccess={() => setActiveCommand(null)}
								/>
							</div>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default InteractiveCommands;
