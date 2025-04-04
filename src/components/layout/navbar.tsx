'use client';
import Link from 'next/link';
import Image from 'next/image';
import { menuItems, pepperLogoLink } from '@/constants';
import { MenuItemType } from '@/types';
import GlobalButton from '../shared/globalButton';
import { NextPage } from 'next';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or any icon library

interface Props {}

const menuVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.1,
		},
	},
	closed: {
		opacity: 0,
		y: '-100%',
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
	closed: {
		opacity: 0,
		y: 20,
		transition: { duration: 0.2 },
	},
};

const Navbar: NextPage<Props> = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState<string | null>(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<header className="flex items-center justify-between px-4 md:px-8 py-4 bg-black border-b border-gray-700 text-white top-0 z-50">
			<Link href="/" className="flex items-center gap-1 z-10">
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
								className={`hover:text-gray-400 ${
									activeItem === item.value ? 'text-white' : 'text-gray-300'
								}`}
								onClick={() => setActiveItem(item.value)}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<Link href="/auth/login" className="hidden md:block">
				<GlobalButton className="bg-none" size="sm">
					Get Started
				</GlobalButton>
			</Link>

			{/* Mobile Menu Button */}
			<motion.button
				className="md:hidden text-white z-10"
				onClick={toggleMenu}
				aria-label="Toggle menu"
				whileTap={{ scale: 0.9 }}
			>
				<AnimatePresence mode="wait">
					{isMenuOpen ? (
						<motion.div
							key="close"
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<X size={24} />
						</motion.div>
					) : (
						<motion.div
							key="menu"
							initial={{ rotate: 90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: -90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<Menu size={24} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			{/* Mobile Nav */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="md:hidden fixed inset-0 bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center z-0"
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
					>
						<nav className="mb-8 w-full px-6">
							<ul className="flex flex-col items-center space-y-6 w-full">
								{menuItems.map((item: MenuItemType, index) => (
									<motion.li
										key={item.value}
										className="w-full"
										variants={itemVariants}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Link
											href={item.value}
											className={`text-xl hover:text-gray-400 flex items-center justify-center p-4 ${
												activeItem === item.value
													? 'bg-gray-800 bg-opacity-50 rounded-lg'
													: ''
											}`}
											onClick={() => {
												toggleMenu();
												setActiveItem(item.value);
											}}
										>
											<motion.div
												initial={{ x: -10, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												transition={{ delay: index * 0.1 + 0.2 }}
											>
												{item.name}
											</motion.div>
										</Link>
									</motion.li>
								))}
							</ul>
						</nav>

						<motion.div
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
								<GlobalButton className="bg-none hover:bg-gray-800 transition-colors duration-300">
									Get Started
								</GlobalButton>
							</Link>
						</motion.div>

						<motion.div
							className="absolute bottom-8 text-center text-sm text-gray-500"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
						>
							<p>© 2025 Pepper</p>
							<p className="mt-1">Spice up your experience</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Navbar;
