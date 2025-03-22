'use client';
import { NextPage } from 'next';
import { Button } from '../ui/button';
import { menuItems, pepperLogoLink } from '@/constants';
import Link from 'next/link';
import { MenuItemType } from '@/types';
import GlobalButton from '../shared/globalButton';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('/');

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setActiveItem(window.location.pathname);
		}
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const menuVariants = {
		closed: {
			opacity: 0,
			y: '-100%',
			transition: {
				duration: 0.3,
				when: 'afterChildren',
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
		open: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				when: 'beforeChildren',
				staggerChildren: 0.1,
				staggerDirection: 1,
			},
		},
	};

	const itemVariants = {
		closed: { opacity: 0, y: -20 },
		open: { opacity: 1, y: 0 },
	};

	return (
		<header className="flex items-center justify-between px-4 md:px-8 py-4 bg-black border-b border-gray-700 text-white sticky top-0 z-50">
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
							<Link
								href={item.value}
								className={`hover:text-gray-400 relative pb-1 ${
									activeItem === item.value ? 'text-white' : 'text-gray-300'
								}`}
							>
								{item.name}
								{activeItem === item.value && (
									<motion.span
										className="absolute bottom-0 left-0 h-0.5 bg-white"
										layoutId="underline"
										style={{ width: '100%' }}
									/>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="hidden md:block">
				<GlobalButton
					className="bg-none hover:bg-gray-800 transition-colors duration-300"
					size="sm"
				>
					Get Started
				</GlobalButton>
			</div>

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
											onClick={toggleMenu}
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
							<GlobalButton
								className="bg-none hover:bg-gray-800 transition-colors duration-300"
								onClick={toggleMenu}
							>
								Get Started
							</GlobalButton>
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
