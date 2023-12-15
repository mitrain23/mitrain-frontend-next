import { useEffect, useState } from "react";
import MessageHighlights from "../messageHighlights";
import { useQuery } from "react-query";
import { ChatRepository } from "@/src/infrastructure/services/chat/chatRepository";
import {
  TChatUser,
  useChatStore,
} from "@/src/application/zustand/useChatStore";
import LoadingState from "../../global/state/loading";
import EmptyState from "../../global/state/empty";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Separator } from "@/src/components/ui/separator";
import { useUser } from "@/src/application/hooks/global/useUser";

type TProps = {
  refetchChat: boolean;
  setOpenChat: (values: React.SetStateAction<boolean>) => void;
};

const ChatList: React.FC<TProps> = ({ setOpenChat, refetchChat }) => {
  const { selectedChat, setSelectedChat, chats, setChats } = useChatStore(
    (state) => state,
  );

  const { currentUser: joinedUser } = useUser();

  const getChats = useQuery("get_chats", () => ChatRepository.getChats());

  useEffect(() => {
    if (getChats.data) {
      setChats(getChats.data);
      console.log(getChats.data);
    }
  }, [getChats.data]);

  useEffect(() => {
    if (selectedChat) {
      setOpenChat(true);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (refetchChat) getChats.refetch();
  }, [refetchChat]);

  return (
    <div className="py-[34px] px-[28px] border-[1px] border-[#E7E7E7] rounded-md lg:rounded-r-none">
      <h1 className="text-[#020831] font-semibold font-inter text-[30px] mb-4">
        Chat
      </h1>
      <Separator className="mb-4 h-px" />
      <LoadingState
        isLoading={getChats.isLoading}
        loadingCount={1}
        loadingFallback={<Skeleton className="py-10 w-full rounded-md" />}
      >
        <EmptyState
          data={chats}
          customErrorTitle="Chat Kosong"
          customErrorMessage="Mulai chat dengan mitra kami sekarang"
        >
          {chats.map((chat, idx) => (
            <MessageHighlights
              chat={chat}
              joinedUser={joinedUser}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              setOpenChat={setOpenChat}
              key={idx}
            />
          ))}
        </EmptyState>
      </LoadingState>
    </div>
  );
};

export default ChatList;
