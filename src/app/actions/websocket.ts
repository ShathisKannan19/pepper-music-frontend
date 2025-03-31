'use server';
import { WebsocketService } from '@/lib/services/websocket/websocketService';
import { initializeWebSocketHandler } from '@/lib/services/websocket/websocketHandler';
import { revalidatePath } from 'next/cache';

// Global instance of the WebSocket service
let webSocketInstance: WebsocketService | null = null;

// Connect to the WebSocket server
export const connectWebsocket = async () => {
	try {
		if (webSocketInstance && webSocketInstance.isConnected()) {
			return {
				success: true,
				message: 'Already connected to WebSocket server',
			};
		}

		webSocketInstance = new WebsocketService(
			`${process.env.BACKEND_MUSIC_ENDPOINT}`,
		);

		// Initialize our handler before connecting
		initializeWebSocketHandler(webSocketInstance);

		await webSocketInstance.connect();

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.setVolume(guildId, volume);

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

// Play a song or playlist
export const playSong = async (
	guildId: string,
	userId: string,
	query: string,
): Promise<{ success: boolean; message: string }> => {
	try {
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.playSong(guildId, userId, query);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.pause(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.resume(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.skip(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.stop(guildId);

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
		if (!webSocketInstance) {
			return { success: false, message: 'WebSocket is not connected' };
		}

		webSocketInstance.send('queue', { guildId });

		// Revalidate the path to update any server components
		revalidatePath(`/guilds/${guildId}`);

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
