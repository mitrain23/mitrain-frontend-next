import React from "react";

type TProps = {
  messageContent: string;
  updatedAt: string;
  isCurrentUserMessage: boolean;
};

const Message: React.FC<TProps> = ({
  messageContent,
  updatedAt,
  isCurrentUserMessage,
}) => {
  // TODO: word break issue on mobile
  return (
    <div
      className={`rounded-md py-[16px] px-[18px] ${isCurrentUserMessage
          ? "bg-[#0066C9] text-white"
          : "border-2 border-[#E6E9FE]"
        }`}
    >
      <p className="break-all">{messageContent}</p>
    </div>
  );
};

export default Message;
