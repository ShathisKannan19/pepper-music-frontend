import { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Page: NextPage = () => {
	return (
		<div className="min-h-screen bg-black text-white">
			{/* Navbar */}
			<header className="flex items-center justify-between px-8 py-4 bg-black border-b border-gray-700">
				<h1 className="text-2xl font-bold">Pepper</h1>
				<nav>
					<ul className="flex space-x-6">
						<li>
							<a href="#features" className="hover:text-gray-400">
								Features
							</a>
						</li>
						<li>
							<a href="#about" className="hover:text-gray-400">
								About
							</a>
						</li>
						<li>
							<a href="#contact" className="hover:text-gray-400">
								Contact
							</a>
						</li>
					</ul>
				</nav>
				<Button
					variant="default"
					className="bg-white text-black hover:bg-gray-200"
				>
					Get Started
				</Button>
			</header>

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center px-8 py-20 bg-black">
				<h2 className="text-5xl font-extrabold mb-4 text-white">
					Stream Music Effortlessly with Pepper
				</h2>
				<p className="text-lg text-gray-400 mb-6">
					Your ultimate music companion on Discord. Play, manage, and enjoy
					music seamlessly.
				</p>
				<Button
					variant="default"
					className="bg-white text-black hover:bg-gray-200"
					size="lg"
				>
					Add Pepper to Discord
				</Button>
				<div className="mt-10">
					<Image
						src="/hero-image.png"
						alt="Music Streaming"
						width={600}
						height={400}
						className="rounded-lg shadow-lg"
					/>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="px-8 py-16 bg-black">
				<h3 className="text-3xl font-bold text-center mb-12 text-white">
					Why Choose Pepper?
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="text-center">
						<Image
							src="/feature1.png"
							alt="Feature 1"
							width={100}
							height={100}
						/>
						<h4 className="text-xl font-bold mt-4 text-white">
							High Quality Audio
						</h4>
						<p className="text-gray-400 mt-2">
							Experience crystal-clear sound for all your favorite tracks.
						</p>
					</div>
					<div className="text-center">
						<Image
							src="/feature2.png"
							alt="Feature 2"
							width={100}
							height={100}
						/>
						<h4 className="text-xl font-bold mt-4 text-white">
							Custom Playlists
						</h4>
						<p className="text-gray-400 mt-2">
							Create and manage playlists directly on Discord.
						</p>
					</div>
					<div className="text-center">
						<Image
							src="/feature3.png"
							alt="Feature 3"
							width={100}
							height={100}
						/>
						<h4 className="text-xl font-bold mt-4 text-white">
							24/7 Availability
						</h4>
						<p className="text-gray-400 mt-2">
							Keep the music going anytime, anywhere.
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="px-8 py-6 bg-black text-center">
				<p className="text-gray-400">2025 Pepper. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Page;
