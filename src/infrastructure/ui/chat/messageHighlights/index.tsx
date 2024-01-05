import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import IChatResponse from "@/src/domain/entities/chatResponse";
import {
  TChatUser,
  useChatStore,
} from "@/src/application/zustand/useChatStore";
import IAllMessageById from "@/src/domain/entities/allMessageByIdResponse";

type TProps = {
  chat: IChatResponse;
  joinedUser: TChatUser | null;
  selectedChat: IChatResponse | null;
  setSelectedChat: (chat: IChatResponse) => void;
  setOpenChat: (values: React.SetStateAction<boolean>) => void;
};

// const getLatestMessage = (
//   chat: IChatResponse,
//   notifications: IAllMessageById[] | [],
// ) => {
//   return (
//     notifications.findLast((notification) => notification.chat._id === chat._id)
//       ?.content ||
//     (chat.latestMessage ? chat.latestMessage.content : "Belum ada chat")
//   );
// };

const getSenderName = (
  chat: Omit<IChatResponse, "latestMessage">,
  joinedUser: TChatUser | null,
) => {
  return (
    chat.users.find((user) => user.id !== joinedUser?.id)?.name ||
    chat.users[0].name
  );
};

type TUnreadNotification = {
  chatId: string;
  message: string;
};

const getUnreadMessageNotification = (
  notifications: IAllMessageById[] | [],
  joinedUser: TChatUser | null,
  callback: (
    unreadNotifications: TUnreadNotification[],
  ) => React.ReactNode | undefined,
) => {
  if (!notifications.length) return [];

  const unreadNotifications = notifications
    .filter((notification) => !notification.isRead)
    .map((notification) => ({
      chatId: notification.chat._id,
      message: `Ada pesan baru dari ${getSenderName(
        notification.chat,
        joinedUser,
      )}`,
    }));

  return callback(unreadNotifications);
};

const subStrLatestMessage = (latestMessage: string) => {
  if (latestMessage.length > 16) {
    return latestMessage.split("").slice(0, 15).join("") + "...";
  }

  return latestMessage;
};

const MessageHighlights: React.FC<TProps> = ({
  chat,
  joinedUser,
  selectedChat,
  setSelectedChat,
  setOpenChat,
}) => {
  const { notifications } = useChatStore();

  return (
    <div
      className={`flex flex-row py-[22px] gap-[24px]  cursor-pointer ${selectedChat?._id === chat._id
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
            {getSenderName(chat, joinedUser).toUpperCase()[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col overflow-hidden relative w-full">
        <h1 className="font-satoshi text-[#020831] md:text-[22px] text-lg font-bold">
          {!chat.isGroupChat && joinedUser
            ? chat.users.find((user) => user.id !== joinedUser?.id)?.name ||
            "Diri Sendiri"
            : chat.chatName}
        </h1>
        <div className="flex items-center">
          <p className="md:w-[300px] whitespace-wrap break-all truncate text-[#425379] font-inter md:text-[16px]">
            {subStrLatestMessage(
              chat.latestMessage
                ? chat.latestMessage.content
                : "Belum ada pesan",
            )}
          </p>
          {getUnreadMessageNotification(
            notifications,
            joinedUser,
            (unreadNotifications) => {
              const currentChatUnreadNotification = unreadNotifications.filter(
                (notification) => notification.chatId === chat._id,
              ).length;

              if (currentChatUnreadNotification) {
                return (
                  <Badge className="bg-[#E75252] hover:bg-[#E75252] rounded-full md:text-[14px] absolute top-0 right-2 md:static">
                    {currentChatUnreadNotification}
                  </Badge>
                );
              }
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageHighlights;
