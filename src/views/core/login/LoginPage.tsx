import React from "react";
import { Text } from "../../common/widget/Text";

interface LoginProps {
  messageLogin: string;
}

export const LoginPage: React.FC<LoginProps> = ({ messageLogin }) => {
  return (
    <>
      <div className="PageLogin">
        <Text messageId={messageLogin} />
      </div>
    </>
  );
};
