import { WebsocketService } from './websocketService';

let wsService: WebsocketService | null = null;

export function handleWebSocketMessage(message: any) {
	if (!message || typeof message !== 'object') return;

	const { type, data } = message;
	if (!data || !data.guildId) return;

	// Process the message
	switch (type) {
		case 'track_start':
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
