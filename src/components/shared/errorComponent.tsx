import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { ErrorComponentProps } from '@/types';

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
	title = 'Something went wrong',
	message = "We couldn't load the data you requested. Please try again later.",
	retryAction,
	customAction,
}) => {
	return (
		<div className="min-h-screen bg-black flex justify-center items-center w-full">
			<Card className="bg-black border-zinc-800 text-white">
				<CardContent className="pt-6 flex flex-col items-center justify-center text-center">
					<AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
					<h3 className="text-xl font-bold text-white mb-2">{title}</h3>
					<p className="text-zinc-400 mb-4">{message}</p>
				</CardContent>
				{(retryAction || customAction) && (
					<CardFooter className="flex justify-center gap-4 pb-6">
						{retryAction && (
							<Button
								variant="outline"
								className="bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800"
								onClick={retryAction}
							>
								Try Again
							</Button>
						)}
						{customAction && (
							<Button
								variant="outline"
								className="bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800"
								onClick={customAction.onClick}
							>
								{customAction.label}
							</Button>
						)}
					</CardFooter>
				)}
			</Card>
		</div>
	);
};
