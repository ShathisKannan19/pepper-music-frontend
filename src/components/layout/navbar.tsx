'use client';
import { NextPage } from 'next';
import { Button } from '../ui/button';
import { menuItems, pepperLogoLink } from '@/constants';
import Link from 'next/link';
import { MenuItemType } from '@/types';
import GlobalButton from '../shared/globalButton';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className="flex items-center justify-between px-4 md:px-8 py-4 bg-black border-b border-gray-700 text-white">
			<Link href={'/'} className="flex items-center gap-1 z-10">
				<Image
					src={pepperLogoLink}
					width={25}
					height={100}
					className="rounded-full"
					alt="Pepper Logo"
				/>
				<h1 className="text-xl md:text-2xl font-bold">Pepper</h1>
			</Link>

			{/* Desktop Navigation */}
			<nav className="hidden md:block">
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

			<div className="hidden md:block">
				<GlobalButton className="bg-none">Get Started</GlobalButton>
			</div>

			{/* Mobile Menu Button */}
			<button
				className="md:hidden text-white z-10"
				onClick={toggleMenu}
				aria-label="Toggle menu"
			>
				{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-0">
					<nav className="mb-8">
						<ul className="flex flex-col items-center space-y-6">
							{menuItems.map((item: MenuItemType) => (
								<li key={item.value}>
									<Link
										href={item.value}
										className="text-xl hover:text-gray-400"
										onClick={toggleMenu}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<GlobalButton className="bg-none" onClick={toggleMenu}>
						Get Started
					</GlobalButton>
				</div>
			)}
		</header>
	);
};

export default Navbar;
