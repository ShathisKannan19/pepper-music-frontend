import { WebsocketService } from './websocketService';

// Keep track of registered callbacks
interface MusicEventCallback {
	guildId: string;
	onTrackStart?: (track: any, position: number) => void;
	onTrackEnd?: (track: any) => void;
	onQueueEnd?: () => void;
	onPlayerPaused?: (position: number) => void;
	onPlayerResumed?: (position: number) => void;
	onPositionUpdate?: (position: number) => void;
	onVolumeUpdate?: (volume: number) => void;
}

let registeredCallbacks: MusicEventCallback[] = [];
let wsService: WebsocketService | null = null;

// Register a new handler for a specific guild
export function registerMusicEventHandler(callback: MusicEventCallback) {
	// Remove any existing handlers for this guild
	registeredCallbacks = registeredCallbacks.filter(
		(cb) => cb.guildId !== callback.guildId,
	);
	// Add the new handler
	registeredCallbacks.push(callback);

	// Return an unregister function
	return () => {
		registeredCallbacks = registeredCallbacks.filter(
			(cb) => cb.guildId !== callback.guildId,
		);
	};
}

// Function to be called from the WebsocketService when new messages arrive
export function handleWebSocketMessage(message: any) {
	if (!message || typeof message !== 'object') return;

	const { type, data } = message;

	if (!data || !data.guildId) return;

	// Find callbacks registered for this guild
	const callbacks = registeredCallbacks.filter(
		(cb) => cb.guildId === data.guildId,
	);

	if (callbacks.length === 0) return;

	// Process the message
	switch (type) {
		case 'track_start':
			callbacks.forEach((cb) =>
				cb.onTrackStart?.(data.track, data.position || 0),
			);
			break;

		case 'track_end':
			callbacks.forEach((cb) => cb.onTrackEnd?.(data.track));
			break;

		case 'queue_end':
			callbacks.forEach((cb) => cb.onQueueEnd?.());
			break;

		case 'player_paused':
			callbacks.forEach((cb) => cb.onPlayerPaused?.(data.position || 0));
			break;

		case 'player_resumed':
			callbacks.forEach((cb) => cb.onPlayerResumed?.(data.position || 0));
			break;

		case 'position_update':
			callbacks.forEach((cb) => cb.onPositionUpdate?.(data.position || 0));
			break;

		case 'volume_update':
			callbacks.forEach((cb) => cb.onVolumeUpdate?.(data.volume || 50));
			break;
	}
}

// Initialize the WebsocketService to use our handler
export function initializeWebSocketHandler(service: WebsocketService) {
	wsService = service;
	wsService.setMessageHandler(handleWebSocketMessage);
	return wsService;
}

// Get the initialized WebsocketService
export function getWebsocketService() {
	return wsService;
}
