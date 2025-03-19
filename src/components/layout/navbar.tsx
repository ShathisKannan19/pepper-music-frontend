import { NextPage } from 'next';
import { Button } from '../ui/button';
import { menuItems, pepperLogoLink } from '@/constants';
import Link from 'next/link';
import { MenuItemType } from '@/types';
import GlobalButton from '../shared/globalButton';
import Image from 'next/image';

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
	return (
		<header className="flex items-center justify-between px-8 py-4 bg-black border-b border-gray-700 text-white">
			<Link href={'/'} className="flex items-center gap-1">
				<Image
					src={pepperLogoLink}
					width={25}
					height={100}
					className="rounded-full"
					alt="Pepper Logo"
				/>
				<h1 className="text-2xl font-bold">Pepper</h1>
			</Link>
			<nav>
				<ul className="flex space-x-6">
					{menuItems.map((item: MenuItemType) => (
						<li key={item.value}>
							<Link href={item.value} className="hover:text-gray-400">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<GlobalButton className="bg-none">Get Started</GlobalButton>
		</header>
	);
};

export default Navbar;
