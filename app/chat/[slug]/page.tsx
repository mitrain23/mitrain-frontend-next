"use client";

import { Textarea } from "@/src/components/ui/textarea";
import Message from "@/src/infrastructure/ui/chat/message";
import MessageHighlights from "@/src/infrastructure/ui/chat/messageHighlights";
import MessageTopBar from "@/src/infrastructure/ui/chat/messageTopBar";
import LayoutTemplate from "@/src/utils/layout";
import React, { useState } from "react";
import SendIcon from "@/public/svg/send.svg";
import { Button } from "@/src/components/ui/button";

const Page = () => {
  const [openChat, setOpenChat] = useState(false);

  // TODO: ngambil chatId
  const [chatId, setChatId] = useState("");

  return (
    <LayoutTemplate>
      <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-[1fr,2fr] relative">
        <div className="py-[34px] px-[28px] border-[1px] border-[#E7E7E7]">
          <h1 className="text-[#020831] font-semibold font-inter text-[30px] mb-[42px]">
            Chat
          </h1>
          {[...Array(4)].map((_, idx) => (
            <MessageHighlights
              selectChat={(id) => {
                setChatId(id);
                setOpenChat(true);
              }}
              key={idx}
            />
          ))}
        </div>
        <div
          className={`border-[1px] border-[#E7E7E7] pb-[36px] px-[24px] absolute md:static inset-0 bg-white transition-all ${
            openChat ? "translate-x-0" : "translate-x-[200%] md:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            <div>
              <MessageTopBar setOpenChat={setOpenChat} />
            </div>
            <div className="h-[800px] pt-[60px] flex flex-col gap-[44px] overflow-auto">
              <Message />
              <div className="self-end">
                <Message />
              </div>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <div className="mb-[16px]"></div>
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
                className="border border-[#D9D9D9] md:text-[16px] h-[60px] py-4 md:px-8 px-4 md:rounded-[40px] rounded-xl resize-none"
              />

              <Button
                size="icon"
                className="w-[64px] h-[64px] flex justify-center items-center rounded-full p-4 bg-[#0075FF]"
              >
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export default Page;
