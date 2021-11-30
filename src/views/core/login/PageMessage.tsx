import React from "react";
import { getValeurOuVide } from "../../common/util/Utils";
import { Text } from "../../common/widget/Text";

interface MessageProps {
  message?: string;
}

export const PageMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <>
      <div className="PageLogin">
        <Text messageId={getValeurOuVide(message)} />
      </div>
    </>
  );
};
