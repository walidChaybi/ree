import React from "react";

interface MessageErreurConnexionProps {
  message: string;
}

const MessageErreurConnexion: React.FC<MessageErreurConnexionProps> = ({ message }) => (
  <div className="m-20 text-2xl text-bleu-sombre">{message}</div>
);

export default MessageErreurConnexion;
