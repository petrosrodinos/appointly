import { useMutation, useQuery } from "@tanstack/react-query";
import { createMessageLanding, getMessagesLanding } from "../services/chat.services";
import { GetMessagesLandingDto } from "../interfaces/chat.interfaces";

export const useCreateMessageLanding = () => {
    return useMutation({
        mutationFn: createMessageLanding,
    });
}

export const useGetMessagesLanding = (payload: GetMessagesLandingDto & { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["messages_landing"],
        queryFn: () => getMessagesLanding(payload),
        enabled: !!payload.provider_uuid && !!payload.client_uuid && !!payload.include_messages && !!payload.enabled,
        retry: false,
    });
}