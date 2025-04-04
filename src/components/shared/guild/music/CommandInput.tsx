'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { playSong, skipSong } from '@/app/actions/websocket';
import { toast } from 'sonner';

interface CommandInputProps {
	guildId: string;
	userId: string;
	command: string;
	description: string;
	placeholder: string;
	onSuccess?: () => void;
}

const CommandInput = ({
	guildId,
	userId,
	command,
	description,
	placeholder,
	onSuccess,
}: CommandInputProps) => {
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		setIsLoading(true);
		try {
			let result;

			// Handle different commands
			if (command === '/play') {
				result = await playSong(guildId, userId, input);
			} else {
				// Add other command handlers here
				result = { success: false, message: 'Command not implemented' };
			}

			if (result.success) {
				toast(description, {
					description: `${command} ${input}`,
				});
				setInput('');
				if (onSuccess) onSuccess();
			} else {
				toast('Command Failed', {
					description: result.message,
				});
			}
		} catch (error) {
			toast('Error', {
				description: `An unexpected error occurred`,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="bg-zinc-800 border-zinc-700">
			<CardContent className="pt-4">
				<form onSubmit={handleSubmit} className="flex space-x-2">
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={placeholder}
						className="bg-zinc-700 border-zinc-600 text-white"
					/>
					<Button
						type="submit"
						disabled={isLoading}
						className="bg-white text-black hover:bg-zinc-200"
					>
						{isLoading ? 'Loading...' : 'Submit'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default CommandInput;
