import { MusicState } from '@/types';
import { WebsocketService } from './websocketService';

let wsService: WebsocketService | null = null;
const musicState: {
	[guildId: string]: MusicState | null;
} = {};

export function handleWebSocketMessage(message: any) {
	if (!message || typeof message !== 'object') return;

	const { type, data } = message;
	if (!data || !data.guildId) return;

	const guildId = data.guildId;

	if (!musicState[guildId]) {
		musicState[guildId] = {
			currentTrack: null,
			playing: false,
			paused: false,
			queue: [],
		};
	}

	switch (type) {
		case 'track_start':
			musicState[guildId].currentTrack = data.track || null;
			musicState[guildId].queue = data.queue || [];
			musicState[guildId].playing = true;
			break;

		case 'queue_end':
		case 'track_end':
			musicState[guildId].currentTrack = null;
			musicState[guildId].playing = false;
			musicState[guildId].paused = false;
			break;

		case 'player_paused':
			musicState[guildId].playing = false;
			musicState[guildId].paused = true;
			break;

		case 'player_resume':
			musicState[guildId].playing = true;
			musicState[guildId].paused = false;
			break;

		case 'track_added':
			musicState[guildId].queue = data.queue || [];
			break;
	}
}

export function initializeWebSocketHandler(service: WebsocketService) {
	wsService = service;
	wsService.setMessageHandler(handleWebSocketMessage);

	return wsService;
}

export function getWebsocketService() {
	return wsService;
}

// New method to get the current music state for a guild
export function getMusicState(guildId: string): any {
	return musicState[guildId] || null;
}
