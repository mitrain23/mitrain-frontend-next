"use client";

import LayoutTemplate from "@/src/utils/layout";
import React, { useState } from "react";
import ChatList from "@/src/infrastructure/ui/chat/chatList";
import ChatArea from "@/src/infrastructure/ui/chat/chatArea";

const Page = () => {
  const [openChat, setOpenChat] = useState(false);
  const [refetchChat, setRefetchChat] = useState(false);

  return (
    <LayoutTemplate>
      <div className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-[1fr,2fr] relative">
        <ChatList setOpenChat={setOpenChat} refetchChat={refetchChat} />
        <ChatArea
          setOpenChat={setOpenChat}
          openChat={openChat}
          setRefetchSelectedChat={setRefetchChat}
        />
      </div>
    </LayoutTemplate>
  );
};

export default Page;
