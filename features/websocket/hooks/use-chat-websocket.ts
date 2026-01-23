import { useEffect, useCallback } from 'react';
import {
    websocketConnect,
    websocketDisconnect,
    websocketSubscribe,
    websocketEmit,
    isWebsocketConnected,
} from '../services/websocket.service';
import { WEBSOCKET_EVENTS } from '../interfaces/websocket.constants';
import type { ChatMessagePayload, ChatTypingPayload } from '../interfaces/websocket.interfaces';

export const useChatWebsocket = (
    chatUuid: string | null,
    clientUuid: string | null,
    onMessage?: (payload: ChatMessagePayload) => void,
    onTyping?: (payload: ChatTypingPayload) => void
) => {
    useEffect(() => {
        if (!chatUuid || !clientUuid) return;

        if (!isWebsocketConnected()) {
            websocketConnect(clientUuid);
        }

        websocketEmit(WEBSOCKET_EVENTS.CHAT.JOIN, { chat_uuid: chatUuid });

        const messageSubscription = onMessage
            ? websocketSubscribe<ChatMessagePayload>(
                WEBSOCKET_EVENTS.CHAT.MESSAGE_RECEIVED,
                (payload) => {
                    if (payload.chat_uuid === chatUuid) {
                        onMessage(payload);
                    }
                }
            )
            : null;

        const typingSubscription = onTyping
            ? websocketSubscribe<ChatTypingPayload>(
                WEBSOCKET_EVENTS.CHAT.TYPING_RECEIVED,
                (payload) => {
                    if (payload.chat_uuid === chatUuid) {
                        onTyping({ ...payload, is_typing: true });
                    }
                }
            )
            : null;

        const stopTypingSubscription = onTyping
            ? websocketSubscribe<ChatTypingPayload>(
                WEBSOCKET_EVENTS.CHAT.STOP_TYPING_RECEIVED,
                (payload) => {
                    if (payload.chat_uuid === chatUuid) {
                        onTyping({ ...payload, is_typing: false });
                    }
                }
            )
            : null;

        return () => {
            websocketEmit(WEBSOCKET_EVENTS.CHAT.LEAVE, { chat_uuid: chatUuid });
            messageSubscription?.unsubscribe();
            typingSubscription?.unsubscribe();
            stopTypingSubscription?.unsubscribe();
        };
    }, [chatUuid, clientUuid, onMessage, onTyping]);

    const disconnect = useCallback(() => {
        websocketDisconnect();
    }, []);

    return { disconnect };
};
