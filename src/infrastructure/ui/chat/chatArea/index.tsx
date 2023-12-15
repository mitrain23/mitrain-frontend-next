import React from "react";
import { Textarea } from "@/src/components/ui/textarea";
import Message from "../message";
import MessageTopBar from "../messageTopBar";
import { Button } from "@/src/components/ui/button";
import SendIcon from "@/public/svg/send.svg";
import { useChatStore } from "@/src/application/zustand/useChatStore";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { QueryClient, useMutation, useQuery } from "react-query";
import { ChatRepository } from "@/src/infrastructure/services/chat/chatRepository";
import { useEffect, useState } from "react";
import { useUser } from "@/src/application/hooks/global/useUser";

type TPropsChatArea = {
  openChat: boolean;
  setOpenChat: (values: React.SetStateAction<boolean>) => void;
  setRefetchSelectedChat: (value: React.SetStateAction<boolean>) => void;
};

const ChatArea: React.FC<TPropsChatArea> = ({
  setOpenChat,
  openChat,
  setRefetchSelectedChat,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const { selectedChat, setSelectedChat } = useChatStore((state) => state);

  const queryClient = new QueryClient();

  const chatId = selectedChat?._id;
  const { currentUser } = useUser();

  const {
    data: getAllMessageById,
    isLoading: getMessageLoading,
    refetch: getAllMessageByIdRefetch,
  } = useQuery({
    queryKey: ["get_all_message_by_id"],
    queryFn: () => (chatId ? ChatRepository.getAllMessageById(chatId) : []),
    enabled: !!chatId,
  });

  const { mutate: sendMessage, isLoading: sendMessageLoading } = useMutation({
    mutationFn: (data: { content: string; chatId: string }) =>
      ChatRepository.sendMessage(data.chatId, data.content),
  });

  const sendMessageHandler = async () => {
    sendMessage(
      {
        content: inputMessage,
        chatId: selectedChat?._id as string,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("get_all_message_by_id");
          getAllMessageByIdRefetch();
          setInputMessage("");
          setRefetchSelectedChat(true);
        },
      },
    );
  };

  useEffect(() => {
    console.log(getAllMessageById);
  }, [getAllMessageById]);

  useEffect(() => {
    getAllMessageByIdRefetch();
  }, [selectedChat?._id]);

  return (
    <div
      className={`border-[1px] border-[#E7E7E7] rounded-md lg:rounded-l-none pb-[36px] px-[24px] absolute md:static inset-0 bg-white transition-all ${
        openChat ? "translate-x-0" : "translate-x-[200%] md:translate-x-0"
      }`}
    >
      {selectedChat ? (
        <>
          <div className="flex flex-col h-full">
            <div>
              <MessageTopBar
                setOpenChat={setOpenChat}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            </div>
            <div className="h-[800px] pt-[60px] flex flex-col gap-[44px] overflow-y-auto no-scrollbar">
              {getAllMessageById?.map((message, idx) => (
                <React.Fragment key={idx}>
                  {message.sender.id === currentUser?.id ? (
                    <div className="self-end">
                      <Message
                        messageContent={message.content}
                        updatedAt={message.updatedAt}
                        isCurrentUserMessage
                      />
                    </div>
                  ) : (
                    <Message
                      messageContent={message.content}
                      updatedAt={message.updatedAt}
                      isCurrentUserMessage={false}
                    />
                  )}
                </React.Fragment>
              ))}
              <div className="mb-[16px]" />
            </div>

            <div className="pt-4 z-10 flex items-center justify-between w-full gap-[24px]">
              <Textarea
                onKeyDown={(e) => {
                  e.currentTarget.style.height = "20px";
                  e.currentTarget.style.height = `${Math.min(
                    e.currentTarget.scrollHeight,
                    200,
                  )}px`;
                }}
                placeholder="Tulis pesan.."
                value={inputMessage}
                required
                className="border border-[#D9D9D9] md:text-[16px] h-[60px] py-4 md:px-8 px-4 md:rounded-[40px] rounded-xl resize-none no-scrollbar"
                onChange={(e) => setInputMessage(e.target.value)}
              />

              <Button
                onClick={sendMessageHandler}
                type="button"
                size="icon"
                disabled={sendMessageLoading}
                className="w-[64px] h-[64px] flex justify-center items-center rounded-full p-4 bg-[#0075FF]"
              >
                <SendIcon />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-lg flex items-center gap-4">
            <ChatBubbleIcon className="w-6 h-6 aspect-square" />
            <span>
              Mulai Obrolan dengan{" "}
              <Link href="/results" className="text-blue-600 underline">
                Mitra Kami
              </Link>
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
