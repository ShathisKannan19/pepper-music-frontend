'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { playSong } from '@/app/actions/websocket';
import { showToast } from '@/utils/toast';

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
			switch (command) {
				case '/play':
					result = await playSong(guildId, userId, input);
					break;
				default:
					result = { success: false, message: 'Command not implemented' };
			}

			if (result.success) {
				showToast(description, `${command} ${input}`);
				setInput('');
				if (onSuccess) onSuccess();
			} else {
				showToast('Command Failed', result.message, { type: 'error' });
			}
		} catch (error) {
			console.error(`Error executing command ${command}:`, error);
			showToast('Error', 'An unexpected error occurred', { type: 'error' });
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
						disabled={isLoading}
					/>
					<Button
						type="submit"
						disabled={isLoading}
						className="bg-white text-black hover:bg-zinc-200 cursor-pointer"
					>
						{isLoading ? 'Loading...' : 'Submit'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default CommandInput;
