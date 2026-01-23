export const WEBSOCKET_EVENTS = {
    CHAT: {
        JOIN: 'join_chat',
        LEAVE: 'leave_chat',
        MESSAGE_RECEIVED: 'chat:message_received',
        TYPING_RECEIVED: 'chat:typing',
        STOP_TYPING_RECEIVED: 'chat:stop_typing',
    },
} as const;
