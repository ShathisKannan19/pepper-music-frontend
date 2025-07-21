import Image from 'next/image';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import FeatureCards from '@/components/shared/feature/parts/featureCards';

const FeatureComponent: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <header className="text-center">
                <Image
                    src="/images/pepperLogo.png"
                    alt="Pepper Discord Music Bot"
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-6"
                />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Pepper Discord Music Bot Features
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
                    Enhance your Discord servers with high-quality music and powerful bot commands.
                </p>
            </header>

            <section className="mt-12">
                <FeatureCards />
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Why Choose Pepper for Your Discord Server?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-black border-zinc-700 text-white">
                        <CardHeader>
                            <CardTitle>Easy to Use Commands</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>• Simple slash commands for all music functions</li>
                                <li>• Intuitive song search and playlist management</li>
                                <li>• Quick setup with minimal configuration required</li>
                                <li>• Support for YouTube, Spotify, and SoundCloud</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="bg-black border-zinc-700 text-white">
                        <CardHeader>
                            <CardTitle>Built for Discord Communities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li>
                                    • Seamless integration with Discord voice channels
                                </li>
                                <li>• Permissions system for better server control</li>
                                <li>• Real-time music status and now playing updates</li>
                                <li>• Stable performance during peak server activity</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

export default FeatureComponent;