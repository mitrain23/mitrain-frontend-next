"use client";

import { Textarea } from "@/src/components/ui/textarea";
import Message from "@/src/infrastructure/ui/chat/message";
import MessageHighlights from "@/src/infrastructure/ui/chat/messageHighlights";
import MessageTopBar from "@/src/infrastructure/ui/chat/messageTopBar";
import LayoutTemplate from "@/src/utils/layout";
import React from "react";
import SendIcon from "@/public/svg/send.svg";
import { Button } from "@/src/components/ui/button";

const Page = () => {
  return (
    <LayoutTemplate>
      <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <div className="py-[34px] px-[28px] border-[1px] border-[#E7E7E7]">
          <h1 className="text-[#020831] font-semibold font-inter text-[30px] mb-[42px]">
            Chat
          </h1>
          <MessageHighlights />
          <MessageHighlights />
          <MessageHighlights />
          <MessageHighlights />
          <MessageHighlights />
          <MessageHighlights />
          <MessageHighlights />
        </div>
        <div className="border-[1px] border-[#E7E7E7] pb-[36px] px-[24px]">
          <div className="flex flex-col h-full">
            <div>
              <MessageTopBar />
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
                className="border border-[#D9D9D9] md:text-[16px] md:py-[14px] py-4 md:px-8 px-6 rounded-[40px] resize-none h-[20px]"
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
