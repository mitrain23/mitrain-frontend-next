import IChatResponse from "@/src/domain/entities/chatResponse";
import { TChatUser } from "../zustand/useChatStore";

export const getSender = (
  joinedUser: TChatUser,
  users: IChatResponse["users"],
) => {
  return users[0].id === joinedUser.id ? users[1].name : users[0].name;
};
