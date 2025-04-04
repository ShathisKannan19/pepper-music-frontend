import { BotMessageSquare } from 'lucide-react';
import { NextPage } from 'next';
import GlobalButton from './globalButton';
import Link from 'next/link';
import { inviteLink } from '@/constants';

interface Props {}

const BotNotinGuild: NextPage<Props> = ({}) => {
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
					The bot needs to be added to Guild before you can manage it.
				</p>
				<Link href={inviteLink} target="_blank">
					<GlobalButton className="bg-white text-black hover:bg-zinc-200">
						Add Bot to Server
					</GlobalButton>
				</Link>
			</div>
		</div>
	);
};

export default BotNotinGuild;
