import React from "react";
import Image from "next/image";

const MessageHighlights = () => {
  return (
    <div className="flex flex-row py-[22px] gap-[24px] cursor-pointer">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <circle cx="31" cy="31" r="31" fill="#E6E6E6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h1 className="font-satoshi text-[#020831] text-[22px] font-bold">
          Jason White
        </h1>
        <div className="flex flex-row gap-[18px]">
          <p className="w-[300px] truncate text-[#425379] font-inter text-[16px]">
            Hello Mr. Jason, I would like to set an appointment with you at
            Wednesday 15th this month, is that fine for you?
          </p>
          <div className="bg-[#E75252] rounded-full px-[8px] py-[2px] text-white font-bold text-[14px]">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHighlights;
