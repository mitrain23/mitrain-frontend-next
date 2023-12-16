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
  return (
    <div
      className={`max-w-[420px] rounded-md py-[16px] px-[18px] w-fit ${isCurrentUserMessage
          ? "bg-[#0066C9] text-white"
          : "border-2 border-[#E6E9FE]"
        }`}
    >
      <p>{messageContent}</p>
    </div>
  );
};

export default Message;
