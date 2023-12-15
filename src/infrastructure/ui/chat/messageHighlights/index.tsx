import React, { MouseEventHandler, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import IChatResponse from "@/src/domain/entities/chatResponse";
import { getSender } from "@/src/application/helper/chat";
import { TChatUser } from "@/src/application/zustand/useChatStore";

type TProps = {
  chat: IChatResponse;
  joinedUser: TChatUser | null;
  selectedChat: IChatResponse | null;
  setSelectedChat: (chat: IChatResponse) => void;
  setOpenChat: (values: React.SetStateAction<boolean>) => void;
};

const MessageHighlights: React.FC<TProps> = ({
  chat,
  joinedUser,
  selectedChat,
  setSelectedChat,
  setOpenChat,
}) => {
  return (
    <div
      className={`flex flex-row py-[22px] gap-[24px]  cursor-pointer ${
        selectedChat?._id === chat._id
          ? "border-r-4 border-sky-600"
          : "hover:border-r-4 hover:border-sky-600/50"
      }`}
      onClick={() => {
        setSelectedChat(chat);
        setOpenChat(true);
      }}
    >
      <div>
        <Avatar className="md:w-[62px] md:h-[62px]">
          <AvatarImage />
          <AvatarFallback>
            {
              chat.users
                .find((user) => user.id !== joinedUser?.id)
                ?.name.toUpperCase()[0]
            }
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col overflow-hidden relative w-full">
        <h1 className="font-satoshi text-[#020831] md:text-[22px] text-lg font-bold">
          {!chat.isGroupChat && joinedUser
            ? getSender(joinedUser, chat.users)
            : chat.chatName}
        </h1>
        <div className="flex items-center">
          <p className="md:w-[300px] whitespace-wrap break-all truncate text-[#425379] font-inter md:text-[16px]">
            {chat.latestMessage ? chat.latestMessage.content : "Belum Ada Chat"}
          </p>
          {chat.latestMessage && (
            <Badge className="bg-[#E75252] hover:bg-[#E75252] rounded-full md:text-[14px] absolute top-0 right-2 md:static">
              1
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHighlights;
