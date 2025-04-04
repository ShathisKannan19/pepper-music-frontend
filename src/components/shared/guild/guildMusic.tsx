'use client';
import { connectWebsocket, disconnectWebsocket } from '@/app/actions/websocket';

import { DiscordUserData, GuildData, MusicState } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CurrentSongPlayer from './music/CurrentSongPlayer';
import InteractiveCommands from './music/InteractiveCommands';
import QueueDisplay from './music/QueueDisplay';
import MusicConfig from './music/musicConfig';

const GuildMusic = ({
	guildData,
	userData,
	musicState,
}: {
	guildData: GuildData;
	userData: DiscordUserData;
	musicState: MusicState;
}) => {
	useEffect(() => {
		const initWebsocket = async () => {
			const result = await connectWebsocket();
			if (!result.success) {
				toast('Connection Failed', {
					description: result.message,
				});
			}
		};

		initWebsocket();

		return () => {
			disconnectWebsocket();
		};
	}, []);

	return (
		<div className="space-y-6">
			{/* Current Song Player */}
			<CurrentSongPlayer guildId={guildData.id} musicState={musicState} />

			{/* Queue Display */}
			{/* <QueueDisplay guildId={guildData.id} /> */}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<MusicConfig guildId={guildData.id} musicState={musicState} />
				</div>

				<div>
					{/* Interactive Commands */}
					<InteractiveCommands guildId={guildData.id} userId={userData.id} />
				</div>
			</div>
		</div>
	);
};

export default GuildMusic;
