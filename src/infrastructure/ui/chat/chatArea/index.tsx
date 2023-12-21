import React, { useRef } from "react";
import { Textarea } from "@/src/components/ui/textarea";
import Message from "../message";
import MessageTopBar from "../messageTopBar";
import { Button } from "@/src/components/ui/button";
import SendIcon from "@/public/svg/send.svg";
import { useChatStore } from "@/src/application/zustand/useChatStore";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ChatRepository } from "@/src/infrastructure/services/chat/chatRepository";
import { useEffect, useState } from "react";
import { useUser } from "@/src/application/hooks/global/useUser";
import EmptyState from "../../global/state/empty";
import LoadingState from "../../global/state/loading";
import { Skeleton } from "@/src/components/ui/skeleton";
import { io } from "socket.io-client";
import IChatResponse from "@/src/domain/entities/chatResponse";
import IAllMessageById from "@/src/domain/entities/allMessageByIdResponse";
import { useToast } from "@/src/components/ui/use-toast";

type TPropsChatArea = {
  openChat: boolean;
  setOpenChat: (values: React.SetStateAction<boolean>) => void;
};

const ENDPOINT = process.env.BASE_URL;

const socket = io(ENDPOINT!);
let selectedChatCompare: IChatResponse | null;

const ChatArea: React.FC<TPropsChatArea> = ({ setOpenChat, openChat }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<IAllMessageById[] | []>([]);
  const [fetchMessageLoading, setFetchMessageLoading] = useState(false);
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const { selectedChat, setSelectedChat, notifications, setNotifications } =
    useChatStore((state) => state);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const { currentUser } = useUser();
  const { toast } = useToast();

  const fetchMessage = async () => {
    if (!selectedChat) return;

    try {
      setFetchMessageLoading(true);

      const messages = await ChatRepository.getAllMessageById(selectedChat._id);

      setMessages(messages);
      setFetchMessageLoading(false);

      socket.emit("joinChat", selectedChat._id, currentUser?.name);
    } catch (err) {
      toast({
        title: "Notifikasi Error",
        description: "Gagal membaca beberapa pesan",
      });
    }
  };

  const sendMessageHandler = async () => {
    if (!selectedChat) return;

    try {
      setSendMessageLoading(true);

      const data = await ChatRepository.sendMessage(
        selectedChat._id,
        inputMessage,
      );

      socket.emit("newMessage", data);

      setMessages([...messages, data]);
      setNotifications([...notifications, data]);

      setInputMessage("");
      setSendMessageLoading(false);
    } catch (err) {
      toast({
        title: "Notifikasi Error",
        description: "Gagal mengirimkan pesan",
      });
    }
  };

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    socket.emit("setup", currentUser);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("messageReceived", (newMessageReceived: IAllMessageById) => {
      // This condition check if the current selectedChat focus is not the same as previous selectedChat then..
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // set notifications with isRead false
        setNotifications([...notifications, newMessageReceived]);
      } else {
        setNotifications([...notifications, newMessageReceived]);
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

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
            <div
              className="h-[800px] py-2 flex flex-col gap-[44px] overflow-y-auto no-scrollbar"
              ref={chatContainerRef}
            >
              <LoadingState
                isLoading={fetchMessageLoading}
                loadingFallback={
                  <Skeleton className="w-full py-10 rounded-md bg-[#E6E9FE]" />
                }
              >
                <EmptyState
                  data={messages.length && !fetchMessageLoading}
                  customErrorTitle="Belum ada chat"
                  customErrorMessage="Mulai chat baru mu!"
                >
                  {messages.map((message, idx) => (
                    <React.Fragment key={idx}>
                      {message.sender.id === currentUser?.id ? (
                        <div className={`self-end ${idx === 0 && "mt-auto"}`}>
                          <Message
                            messageContent={message.content}
                            updatedAt={message.updatedAt}
                            isCurrentUserMessage
                          />
                        </div>
                      ) : (
                        <div className={`self-start ${idx === 0 && "mt-auto"}`}>
                          <Message
                            messageContent={message.content}
                            updatedAt={message.updatedAt}
                            isCurrentUserMessage={false}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </EmptyState>
              </LoadingState>
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
