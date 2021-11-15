import React from "react";
import { Text } from "../../common/widget/Text";

interface MessageProps {
  message: string;
}

export const PageMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <>
      <div className="PageLogin">
        <Text messageId={message} />
      </div>
    </>
  );
};
