import React from "react";

interface MessageProps {
  message?: string;
}

export const PageMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <>
      <div className="PageLogin">{message}</div>
    </>
  );
};
