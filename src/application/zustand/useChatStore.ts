import IChatResponse from "@/src/domain/entities/chatResponse";
import { create } from "zustand";

export type TChatUser = {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
};

type TChatStore = {
  user: TChatUser | null;
  setUser: (user: TChatUser) => void;

  selectedChat: IChatResponse | null;
  setSelectedChat: (chat: IChatResponse | null) => void;

  chats: IChatResponse[] | [];
  setChats: (chats: IChatResponse[] | []) => void;
};

export const useChatStore = create<TChatStore>((set) => ({
  user: null,
  setUser: (user) => set((_) => ({ user })),

  selectedChat: null,
  setSelectedChat: (chat) => set((_) => ({ selectedChat: chat })),

  chats: [],
  setChats: (chats) => set((_) => ({ chats })),
}));
