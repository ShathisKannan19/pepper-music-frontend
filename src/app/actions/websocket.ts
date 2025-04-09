'use server';
import { WebsocketService } from '@/lib/services/websocket/websocketService';
import { initializeWebSocketHandler } from '@/lib/services/websocket/websocketHandler';
import { revalidatePath } from 'next/cache';

// Global instance of the WebSocket service
let webSocketInstance: WebsocketService | null = null;

const ensureWebSocketConnection = async () => {
	if (!webSocketInstance || !webSocketInstance.isConnected()) {
		webSocketInstance = new WebsocketService(
			`${process.env.BACKEND_MUSIC_ENDPOINT}`,
		);
		initializeWebSocketHandler(webSocketInstance);
		await webSocketInstance.connect();
	}
};

// Connect to the WebSocket server
export const connectWebsocket = async () => {
	try {
		await ensureWebSocketConnection();
		return { success: true, message: 'Connected to WebSocket server' };
	} catch (error) {
		return {
			success: false,
			message: `Failed to connect to WebSocket server: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Disconnect from the WebSocket server
export const disconnectWebsocket = async () => {
	if (webSocketInstance) {
		webSocketInstance.disconnect();
		webSocketInstance = null;

		return { success: true, message: 'Disconnected from WebSocket server' };
	}

	return { success: true, message: 'No active WebSocket connection' };
};

// Set volume for a guild
export const setGuildVolume = async (
	guildId: string,
	volume: number,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.setVolume(guildId, volume);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

		return {
			success: true,
			message: `Volume set to ${volume} for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to set volume: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

export const getGuildVolume = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.getVolume(guildId);

		return {
			success: true,
			message: `Volume for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to get volume: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Play a song or playlist
export const playSong = async (
	guildId: string,
	userId: string,
	query: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.playSong(guildId, userId, query);

		// Revalidate the path to update any server components
		revalidatePath(`/dashboard/server/${guildId}`);

		return {
			success: true,
			message: `Playing "${query}" in guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to play song: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Pause playback
export const pausePlayback = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.pause(guildId);

		return {
			success: true,
			message: `Paused playback in guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to pause playback: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Resume playback
export const resumePlayback = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.resume(guildId);

		return {
			success: true,
			message: `Resumed playback in guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to resume playback: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Skip current song
export const skipSong = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.skip(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/dashboard/server/${guildId}`);

		return {
			success: true,
			message: `Skipped to next song in guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to skip song: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Stop playback
export const stopPlayback = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.stop(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/dashboard/server/${guildId}`);

		return {
			success: true,
			message: `Stopped playback in guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to stop playback: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Get queue
export const getQueue = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.send('queue', { guildId });

		// Revalidate the path to update any server components
		revalidatePath(`/dashboard/server/${guildId}`);

		return {
			success: true,
			message: `Requested queue data for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to get queue: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

export const getNowPlaying = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.send('now_playing', { guildId });

		revalidatePath(`/dashboard/server/${guildId}`);

		return {
			success: true,
			message: `Now playing data for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to get now playing: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Set Autoplay
// This function sets the autoplay feature for a specific guild
export const setGuildAutoPlay = async (
	guildId: string,
	enabled: boolean,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.setAutoPlay(guildId, enabled);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

		return {
			success: true,
			message: `AutoPlay set to ${enabled} for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to set Autoplay: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};

// Get Autoplay
// This function retrieves the autoplay status for a specific guild
export const getGuildAutoPlay = async (
	guildId: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		await ensureWebSocketConnection();

		webSocketInstance!.getAutoPlay(guildId);

		return {
			success: true,
			message: `Volume for guild ${guildId}`,
		};
	} catch (error) {
		return {
			success: false,
			message: `Failed to get volume: ${
				error instanceof Error ? error.message : String(error)
			}`,
		};
	}
};
