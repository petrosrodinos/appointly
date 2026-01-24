import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Account } from "@/features/account/interfaces/account.interfaces";

interface ClientState {
    client: Account | null;
    chat_uuid: string | null;
    setClient: (client: Account) => void;
    setChatUuid: (chat_uuid: string | null) => void;
    clearClient: () => void;
}

const STORE_KEY = "client";

const initialValues: ClientState = {
    client: null,
    chat_uuid: null,
    setClient: () => { },
    setChatUuid: () => { },
    clearClient: () => { },
};

export const useClientStore = create<ClientState>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                setClient: (client: Account) => set({ client }),
                setChatUuid: (chat_uuid: string | null) => set({ chat_uuid }),
                clearClient: () => set({ client: null, chat_uuid: null }),
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getClientStoreState = () => useClientStore.getState();
