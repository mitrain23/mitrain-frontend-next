import React from "react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";

const MessageHighlights = () => {
  return (
    <div className="flex flex-row py-[22px] gap-[24px] cursor-pointer">
      <div>
        <Avatar className="md:w-[62px] md:h-[62px]">
          <AvatarImage />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col overflow-hidden relative">
        <h1 className="font-satoshi text-[#020831] md:text-[22px] text-lg font-bold">
          Jason White
        </h1>
        <div className="flex items-center">
          <p className="md:w-[300px] whitespace-wrap break-all truncate text-[#425379] font-inter md:text-[16px]">
            Hello Mr. Jason, I would like to set an appointment with you at
            Wednesday 15th this month, is that fine for you?
          </p>
          <Badge className="bg-[#E75252] hover:bg-[#E75252] rounded-full md:text-[14px] absolute top-0 right-2 md:static">
            1
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MessageHighlights;
