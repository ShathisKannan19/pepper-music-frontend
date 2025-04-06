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
	StopCircle,
	List,
	Shuffle,
} from 'lucide-react';
import CommandInput from './CommandInput';
import {
	getQueue,
	pausePlayback,
	resumePlayback,
	skipSong,
	stopPlayback,
} from '@/app/actions/websocket';
import { showToast } from '@/utils/toast';

interface Command {
	cmd: string;
	desc: string;
	icon: React.ReactNode;
	placeholder?: string;
	needsInput?: boolean;
}

interface InteractiveCommandsProps {
	guildId: string;
	userId: string;
}

const InteractiveCommands = ({ guildId, userId }: InteractiveCommandsProps) => {
	const [activeCommand, setActiveCommand] = useState<string | null>(null);

	const commands: Command[] = [
		{
			cmd: '/play',
			desc: 'Play a song',
			icon: <Play className="h-4 w-4 mr-2 text-green-400" />,
			placeholder: 'Enter song name or URL',
			needsInput: true,
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
			icon: <Play className="h-4 w-4 mr-2 text-green-400" />,
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
		const command = commands.find((c) => c.cmd === cmd);

		if (!command) return;

		// For commands that need input like /play, show the input field
		if (command.needsInput) {
			setActiveCommand(activeCommand === cmd ? null : cmd);
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
				showToast(cmd.substring(1), 'Command executed successfully');
			} else {
				showToast('Command Failed', result.message, { type: 'error' });
			}
		} catch (error) {
			console.error(`Error executing command ${cmd}:`, error);
			showToast('Error', 'An unexpected error occurred', { type: 'error' });
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
				{commands.map((command) => (
					<CommandItem
						key={command.cmd}
						command={command}
						isActive={activeCommand === command.cmd}
						onClick={() => handleCommandClick(command.cmd)}
						guildId={guildId}
						userId={userId}
						onSuccess={() => setActiveCommand(null)}
					/>
				))}
			</CardContent>
		</Card>
	);
};

interface CommandItemProps {
	command: Command;
	isActive: boolean;
	onClick: () => void;
	guildId: string;
	userId: string;
	onSuccess: () => void;
}

const CommandItem = ({
	command,
	isActive,
	onClick,
	guildId,
	userId,
	onSuccess,
}: CommandItemProps) => {
	return (
		<div>
			<div
				className="p-2 bg-zinc-900 rounded-md cursor-pointer hover:bg-zinc-700 transition-colors"
				onClick={onClick}
			>
				<div className="flex items-center">
					{command.icon}
					<code className="font-mono text-white">{command.cmd}</code>
				</div>
				<p className="text-sm text-zinc-400 mt-1">{command.desc}</p>
			</div>

			{isActive && command.needsInput && (
				<div className="mt-2">
					<CommandInput
						guildId={guildId}
						userId={userId}
						command={command.cmd}
						description={command.desc}
						placeholder={command.placeholder || ''}
						onSuccess={onSuccess}
					/>
				</div>
			)}
		</div>
	);
};

export default InteractiveCommands;
