import { TChatUser } from "@/src/application/zustand/useChatStore";

export default interface IChatResponse {
  _id: string;
  product_name: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  createdAt: string;
  updatedAt: string;
  latestMessage: {
    _id: string;
    chat: string;
    content: string;
    readBy: TChatUser[];
    sender: TChatUser;
    createdAt: string;
    updatedAt: string;
  } | null;
}

type User = {
  id: string;
  name: string;
  email: string;
};
