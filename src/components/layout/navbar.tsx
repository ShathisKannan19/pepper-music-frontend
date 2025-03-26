import Link from 'next/link';
import Image from 'next/image';
import { menuItems, pepperLogoLink } from '@/constants';
import { MenuItemType } from '@/types';
import GlobalButton from '../shared/globalButton';
import { NextPage } from 'next';

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
	return (
		<header className="flex items-center justify-between px-4 md:px-8 py-3 bg-black border-b border-gray-700 text-white">
			<Link href={'/'} className="flex items-center gap-1 z-10">
				<Image
					src={pepperLogoLink}
					width={25}
					height={25}
					className="rounded-full"
					alt="Pepper Logo"
					priority
				/>
				<h1 className="text-xl md:text-2xl font-bold">Pepper</h1>
			</Link>

			<nav className="hidden md:block">
				<ul className="flex space-x-6">
					{menuItems.map((item: MenuItemType) => (
						<li key={item.value}>
							<Link
								href={item.value}
								className="hover:text-gray-400 text-gray-300"
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="hidden md:block">
				<GlobalButton className="bg-none hover:bg-gray-800 transition-colors duration-300">
					Get Started
				</GlobalButton>
			</div>
		</header>
	);
};

export default Navbar;
