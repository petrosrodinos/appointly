import { io, Socket } from 'socket.io-client';
import { environments } from '@/config/environments';

type EventCallback<T = unknown> = (data: T) => void;

let socket: Socket | null = null;
const subscriptions: Map<string, Set<EventCallback>> = new Map();

const setupEventListeners = (): void => {
    if (!socket) return;

    socket.on('connect', () => {
        console.log('[WebSocket] Connected:', socket?.id);
    });

    socket.on('disconnect', (reason: string) => {
        console.warn('[WebSocket] Disconnected:', reason);
    });

    socket.on('connect_error', (error: Error) => {
        console.error('[WebSocket] Connection error:', error.message);
    });

    socket.onAny((event: string, data: unknown) => {
        const callbacks = subscriptions.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`[WebSocket] Error in callback for event "${event}":`, error);
                }
            });
        }
    });
};

export const websocketConnect = (clientUuid: string): void => {
    if (socket?.connected) return;

    const wsUrl = environments.API_URL?.replace(/\/$/, '') || '';

    socket = io(wsUrl, {
        auth: { client_uuid: clientUuid },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 3000,
        reconnectionAttempts: 10,
        timeout: 20000,
    });

    setupEventListeners();
};

export const websocketDisconnect = (): void => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};

export const isWebsocketConnected = (): boolean => {
    return socket?.connected ?? false;
};



export const websocketSubscribe = <T = unknown>(
    event: string,
    callback: EventCallback<T>
): { unsubscribe: () => void } => {
    if (!subscriptions.has(event)) {
        subscriptions.set(event, new Set());
    }

    const callbacks = subscriptions.get(event)!;
    callbacks.add(callback as EventCallback);

    return {
        unsubscribe: () => {
            callbacks.delete(callback as EventCallback);
            if (callbacks.size === 0) {
                subscriptions.delete(event);
            }
        },
    };
};

export const websocketEmit = <T = unknown>(event: string, data?: T): void => {
    if (!socket?.connected) {
        console.warn('[WebSocket] Cannot emit: Not connected');
        return;
    }
    socket.emit(event, data);
};
