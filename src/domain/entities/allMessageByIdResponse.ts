import { TChatUser } from "@/src/application/zustand/useChatStore";

export default interface IAllMessageById {
  _id: string;
  chat: {
    _id: string;
    chatName: string;
    createdAt: string;
    isGroupChat: boolean;
    latestMessage: string;
    updatedAt: string;
    users: TChatUser[];
  };
  content: string;
  isRead: boolean;
  sender: TChatUser;

  createdAt: string;
  updatedAt: string;
}
