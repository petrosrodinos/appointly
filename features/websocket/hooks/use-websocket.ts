import { useState, useEffect, useCallback, useRef } from 'react';
import {
    websocketConnect,
    websocketDisconnect,
    websocketEmit,
    websocketSubscribe,
    isWebsocketConnected,
} from '../services/websocket.service';

type WebsocketEventCallback<T = unknown> = (data: T) => void;

export const useWebsocket = (clientUuid: string | null) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!clientUuid) return;

        if (!isWebsocketConnected()) {
            websocketConnect(clientUuid);
        }
        setIsConnected(true);

        return () => {
            setIsConnected(false);
        };
    }, [clientUuid]);

    const emit = useCallback(<T = unknown>(event: string, data?: T) => {
        websocketEmit(event, data);
    }, []);

    const disconnect = useCallback(() => {
        websocketDisconnect();
        setIsConnected(false);
    }, []);

    return { emit, isConnected, disconnect };
};

export const useWebsocketEvent = <T = unknown>(
    event: string,
    callback: WebsocketEventCallback<T>,
    deps: React.DependencyList = []
) => {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const subscription = websocketSubscribe<T>(event, (data) => {
            callbackRef.current(data);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [event, ...deps]);
};
