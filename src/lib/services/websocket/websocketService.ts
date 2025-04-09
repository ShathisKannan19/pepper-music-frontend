import 'server-only';
/**
 * WebsocketService - A reusable WebSocket client for Pepper Music API
 *
 * This class handles WebSocket connections, authentication, reconnection,
 * and common music playback operations.
 */
export class WebsocketService {
	private ws: WebSocket | null = null;
	private apiKey: string;
	private serverUrl: string;
	private autoReconnect: boolean;
	private reconnectAttempts: number = 0;
	private maxReconnectAttempts: number = 5;
	private reconnectDelay: number = 2000;
	private eventListeners: Record<string, ((data: any) => void)[]> = {};
	private messageHandler: ((message: any) => void) | null = null;

	/**
	 * Create a new Pepper Music WebSocket client
	 *
	 * @param serverUrl - The WebSocket server URL
	 * @param autoReconnect - Whether to automatically attempt reconnection
	 */
	constructor(serverUrl: string, autoReconnect: boolean = true) {
		this.serverUrl = serverUrl;
		this.apiKey = `${process.env.BACKEND_API_SECRET}`;
		this.autoReconnect = autoReconnect;
	}

	/**
	 * Set a global message handler for this WebSocket
	 */
	setMessageHandler(handler: (message: any) => void) {
		this.messageHandler = handler;
	}

	/**
	 * Connect to the Pepper Music WebSocket server
	 * @returns Promise that resolves when authentication succeeds or rejects on failure
	 */
	connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.ws = new WebSocket(this.serverUrl);

				this.ws.onopen = () => {
					console.log('Connected to Pepper Music WebSocket');
					this.authenticate(resolve, reject);
				};

				this.ws.onmessage = (event) => {
					this.handleMessage(event);
				};

				this.ws.onerror = (error) => {
					console.error('WebSocket error:', error);
					reject(error);
				};

				this.ws.onclose = (event) => {
					console.log(`Connection closed: ${event.code} ${event.reason}`);
					this.handleDisconnect(event);
				};
			} catch (error) {
				console.error('Failed to create WebSocket connection:', error);
				reject(error);
			}
		});
	}

	/**
	 * Authenticate with the Pepper Music API
	 */
	private authenticate(
		resolve: (value: void) => void,
		reject: (reason: any) => void,
	): void {
		if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
			reject(new Error('WebSocket is not connected'));
			return;
		}

		// Set up a one-time listener for auth response
		const authListener = (event: MessageEvent) => {
			const message = JSON.parse(event.data);

			if (message.type === 'auth_success') {
				console.log('Authentication successful');
				this.ws?.removeEventListener('message', authListener);
				resolve();
			} else if (
				message.type === 'error' &&
				message.data?.code?.includes('auth')
			) {
				console.error(`Authentication failed: ${message.data.message}`);
				this.ws?.removeEventListener('message', authListener);
				reject(new Error(message.data.message));
			}
		};

		this.ws.addEventListener('message', authListener);

		// Send authentication request
		this.ws.send(
			JSON.stringify({
				type: 'auth',
				data: {
					apiKey: this.apiKey,
				},
			}),
		);
	}

	/**
	 * Handle incoming WebSocket messages
	 */
	private handleMessage(event: MessageEvent): void {
		try {
			const message = JSON.parse(event.data);

			// Use the global message handler if set
			if (this.messageHandler) {
				this.messageHandler(message);
			}

			// Trigger any registered event listeners
			if (message.type && this.eventListeners[message.type]) {
				this.eventListeners[message.type].forEach((callback) => {
					callback(message.data);
				});
			}
		} catch (error) {
			console.error('Error handling WebSocket message:', error);
		}
	}

	/**
	 * Handle WebSocket disconnection
	 */
	private handleDisconnect(event: CloseEvent): void {
		if (
			this.autoReconnect &&
			this.reconnectAttempts < this.maxReconnectAttempts
		) {
			this.reconnectAttempts++;
			const delay = this.reconnectDelay * this.reconnectAttempts;

			console.log(
				`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
			);

			setTimeout(() => {
				this.connect()
					.then(() => {
						this.reconnectAttempts = 0;
					})
					.catch((error) => {
						console.error('Reconnection attempt failed:', error);
					});
			}, delay);
		}
	}

	/**
	 * Disconnect from the WebSocket server
	 */
	disconnect(): void {
		if (this.ws) {
			console.log('Disconnected from Websocket');
			this.autoReconnect = false; // Prevent auto reconnection
			this.ws.close();
			this.ws = null;
		}
	}

	/**
	 * Check if the WebSocket is currently connected
	 */
	isConnected(): boolean {
		return !!this.ws && this.ws.readyState === WebSocket.OPEN;
	}

	/**
	 * Register an event listener
	 *
	 * @param eventType - The event type to listen for (e.g., 'track_start')
	 * @param callback - Function to call when event is received
	 */
	on(eventType: string, callback: (data: any) => void): void {
		if (!this.eventListeners[eventType]) {
			this.eventListeners[eventType] = [];
		}
		this.eventListeners[eventType].push(callback);
	}

	/**
	 * Remove an event listener
	 */
	off(eventType: string, callback: (data: any) => void): void {
		if (this.eventListeners[eventType]) {
			this.eventListeners[eventType] = this.eventListeners[eventType].filter(
				(cb) => cb !== callback,
			);
		}
	}

	/**
	 * Send a message to the WebSocket server
	 */
	send(type: string, data: any): void {
		if (!this.isConnected()) {
			throw new Error('Cannot send message: WebSocket is not connected');
		}

		this.ws!.send(
			JSON.stringify({
				type,
				data,
			}),
		);
	}

	/**
	 * Play a song in the specified guild
	 */
	playSong(guildId: string, userId: string, query: string): void {
		this.send('play', { guildId, userId, query });
	}

	/**
	 * Pause the currently playing track
	 */
	pause(guildId: string): void {
		this.send('pause', { guildId });
	}

	/**
	 * Resume the currently paused track
	 */
	resume(guildId: string): void {
		this.send('resume', { guildId });
	}

	/**
	 * Skip to the next track in queue
	 */
	skip(guildId: string): void {
		this.send('skip', { guildId });
	}

	/**
	 * Stop playback and clear the queue
	 */
	stop(guildId: string): void {
		this.send('stop', { guildId });
	}

	/**
	 * Set Volume for a Guild Player
	 */
	setVolume(guildId: string, volume: number): void {
		this.send('volume', { guildId, volume });
	}

	getVolume(guildId: string): void {
		this.send('volume', { guildId });
	}

	setAutoPlay(guildId: string, enabled: boolean): void {
		this.send('autoplay', { guildId, enabled });
	}

	getAutoPlay(guildId: string): void {
		this.send('autoplay', { guildId });
	}
}
