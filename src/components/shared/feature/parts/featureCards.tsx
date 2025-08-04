import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Music, Users, Server, Zap, Award, Clock } from 'lucide-react';
import { FeatureCardProps } from '@/types';

function FeatureCard({
    icon,
    title,
    description,
}: FeatureCardProps) {
    return (
        <Card className="bg-black border-zinc-700 text-white">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{icon}</div>
                    <CardTitle className="mb-2">{title}</CardTitle>
                    <CardDescription className="text-gray-400">
                        {description}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
}

const FeatureCardContent = [
    {
        icon: <Music className="h-8 w-8 text-purple-500" />,
        title: 'Voice Channel Music',
        description: 'Play high-quality music directly in your Discord voice channels with simple commands.',
    },
    {
        icon: <Server className="h-8 w-8 text-purple-500" />,
        title: 'Multi-Server Support',
        description: 'Add Pepper to multiple Discord servers and enjoy consistent music experience across all of them.',
    },
    {        icon: <Users className="h-8 w-8 text-purple-500" />,
        title: 'Community Playlists',
        description: 'Let server members add songs to the queue and create collaborative listening sessions.',
    },
    {        icon: <Zap className="h-8 w-8 text-purple-500" />,
        title: 'Fast & Reliable',
        description: 'Lightning-fast song loading and stable 24/7 uptime for uninterrupted music sessions.',
    },
    {
        icon: <Award className="h-8 w-8 text-purple-500" />,
        title: 'Premium Audio Quality',
        description: 'Enjoy crystal-clear sound with support for high-bitrate audio streaming.',
    },
    {
        icon: <Clock className="h-8 w-8 text-purple-500" />,
        title: 'Queue Management',
        description: 'Easily manage song queues, skip tracks, and loop your favorite songs or playlists.',
    },
];

const FeatureCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FeatureCardContent.map((feature, index) => (
                <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </div>
    );
}

export default FeatureCards;
