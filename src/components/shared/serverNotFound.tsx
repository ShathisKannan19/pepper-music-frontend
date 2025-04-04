import { NextPage } from 'next';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Shield } from 'lucide-react';

interface Props {}

const ServerNotFound: NextPage<Props> = ({}) => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
					<Shield className="w-10 h-10 text-white" />
				</div>
				<h1 className="text-2xl font-bold text-white mb-2">Server not found</h1>
				<p className="text-zinc-400 mb-6">
					The server you're looking for doesn't exist or you don't have access
					to it.
				</p>
				<Link href="/dashboard/server-list">
					<Button className="bg-white text-black hover:bg-zinc-200 cursor-pointer">
						Return to Server List
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default ServerNotFound;
