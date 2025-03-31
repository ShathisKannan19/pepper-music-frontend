import { create } from 'zustand';

export interface TrackInfo {
	id: string;
	title: string;
	author: string;
	duration: number;
	url: string;
	artworkUrl?: string;
}

export interface PlayerState {
	isPlaying: boolean;
	volume: number;
	position: number;
	currentTrack: TrackInfo | null;
	queue: TrackInfo[];
}

interface MusicStore {
	players: Record<string, PlayerState>;
	getPlayerState: (guildId: string) => PlayerState;
	updatePlayerState: (guildId: string, update: Partial<PlayerState>) => void;
	setQueue: (guildId: string, queue: TrackInfo[]) => void;
}

// Default state for a new player
const defaultPlayerState: PlayerState = {
	isPlaying: false,
	volume: 50,
	position: 0,
	currentTrack: null,
	queue: [],
};

export const useMusicStore = create<MusicStore>((set, get) => ({
	players: {},

	getPlayerState: (guildId: string) => {
		const state = get();
		return state.players[guildId] || { ...defaultPlayerState };
	},

	updatePlayerState: (guildId: string, update: Partial<PlayerState>) => {
		set((state) => {
			// Get the current player state or use default
			const currentState = state.players[guildId] || { ...defaultPlayerState };

			// Create the updated state
			const updatedState = {
				...currentState,
				...update,
			};

			console.log(`Updating player state for ${guildId}:`, updatedState);

			// Return the new state object
			return {
				players: {
					...state.players,
					[guildId]: updatedState,
				},
			};
		});
	},

	setQueue: (guildId: string, queue: TrackInfo[]) => {
		set((state) => {
			const currentState = state.players[guildId] || { ...defaultPlayerState };
			return {
				players: {
					...state.players,
					[guildId]: {
						...currentState,
						queue,
					},
				},
			};
		});
	},
}));
