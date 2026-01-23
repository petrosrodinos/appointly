import type { ChatMessage } from "@/features/chat/interfaces/chat.interfaces";

export interface ChatMessagePayload {
    chat_uuid: string;
    message_uuid: string;
    sender_uuid: string;
    content: string;
    message_type: string;
    timestamp: string;
    message?: ChatMessage;
}

export interface ChatTypingPayload {
    chat_uuid: string;
    account_uuid: string;
    is_typing: boolean;
    timestamp: string;
}
