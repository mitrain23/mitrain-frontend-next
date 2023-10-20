import Message from "@/src/infrastructure/ui/chat/message";
import MessageHighlights from "@/src/infrastructure/ui/chat/messageHighlights";
import MessageTopBar from "@/src/infrastructure/ui/chat/messageTopBar";
import LayoutTemplate from "@/src/utils/layout";
import React from "react";

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

            <div className="input-chat mx-auto z-10 flex items-center gap-[24px]">
              <div className="w-[800px] h-fit border-[1px] border-[#D9D9D9] rounded-[36px] px-[36px] py-[24px] flex items-center  ">
                <textarea
                  placeholder="Write a message"
                  className="w-full h-[20px] outline-none overflow-auto"
                />
              </div>

              <div className="w-[72px] h-[72px] rounded-full bg-[#0075FF] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <mask
                    id="mask0_49_229"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="32"
                    height="32"
                  >
                    <rect width="32" height="32" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_49_229)">
                    <path
                      d="M26.4 17.2333L5.86667 25.8999C5.42222 26.0777 5 26.0388 4.6 25.7833C4.2 25.5277 4 25.1555 4 24.6666V7.33327C4 6.84439 4.2 6.47216 4.6 6.21661C5 5.96105 5.42222 5.92216 5.86667 6.09994L26.4 14.7666C26.9556 15.0111 27.2333 15.4222 27.2333 15.9999C27.2333 16.5777 26.9556 16.9888 26.4 17.2333ZM6.66667 22.6666L22.4667 15.9999L6.66667 9.33327V13.9999L14.6667 15.9999L6.66667 17.9999V22.6666Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export default Page;
