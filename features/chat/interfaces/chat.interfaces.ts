import { Account } from "@/features/account/interfaces/account.interfaces";

export interface Chat {
    id: string;
    uuid: string;
    title?: string;
    type: ChatType;
    provider_uuid?: string;
    participants: ChatParticipant[];
    messages: ChatMessage[];
    provider?: Account;
    created_at: string;
    updated_at: string;
}

export interface ChatParticipant {
    id: string;
    uuid: string;
    chat_uuid: string;
    account_uuid: string;
    role: ChatParticipantRole;
    created_at: string;
    updated_at: string;
    account: Account;
}

export interface ChatMessage {
    id: string;
    uuid: string;
    chat_uuid: string;
    sender_uuid: string;
    content: string;
    type: ChatMessageType;
    status: ChatMessageStatus;
    created_at: string;
    updated_at: string;
    sender: Account;
    chat?: Chat;
    documents?: Document[];
}

export interface CreateMessageLandingDto {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    content: string;
    provider_uuid: string;
    phone_country_code: string;
    client_uuid?: string;
    human_chat?: boolean;
    confirmation_message_channel?: ConfirmationMessageChannel;
}

export interface GetMessagesLandingDto {
    provider_uuid: string;
    client_uuid: string;
    include_messages: boolean;
}

export interface CreateMessageLandingResponse {
    message: ChatMessage;
    client: Account;
    chat_agent_enabled: boolean;
}

export interface ChatMessagesResponse {
    id: string;
    uuid: string;
    title?: string;
    type: ChatType;
    provider_uuid?: string;
    participants: ChatParticipant[];
    messages: ChatMessage[];
    provider?: Account;
    created_at: string;
    updated_at: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}


export const ConfirmationMessageChannels = {
    EMAIL: "EMAIL",
    SMS: "SMS",
} as const;

export const ChatTypes = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP',
    SYSTEM: 'SYSTEM',
} as const;

export const ChatParticipantRoles = {
    OWNER: 'OWNER',
    MEMBER: 'MEMBER',
    // ASSISTANT: 'ASSISTANT',
    // SUPPORT: 'SUPPORT',
} as const;

export const ChatMessageTypes = {
    MESSAGE: 'MESSAGE',
    DOCUMENT: 'DOCUMENT',
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    AUTO_RESPONSE: 'AUTO_RESPONSE',
}

export const ChatMessageStatuses = {
    SENT: 'SENT',
    DELIVERED: 'DELIVERED',
    FAILED: 'FAILED',
    DELETED: 'DELETED',
} as const;


export type ChatType = (typeof ChatTypes)[keyof typeof ChatTypes];
export type ChatParticipantRole = (typeof ChatParticipantRoles)[keyof typeof ChatParticipantRoles];
export type ChatMessageType = (typeof ChatMessageTypes)[keyof typeof ChatMessageTypes];
export type ChatMessageStatus = (typeof ChatMessageStatuses)[keyof typeof ChatMessageStatuses];

export type ConfirmationMessageChannel = (typeof ConfirmationMessageChannels)[keyof typeof ConfirmationMessageChannels];