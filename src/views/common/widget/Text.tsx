import React from "react";
const messages = require("../../../ressources/messages.json");
const errors = require("../../../ressources/errors.json");
const regex = require("../../../ressources/regex.json");
const ressources = { ...messages, errors, regex };

export interface ITextProps {
  messageId: string;
  values?: string[];
}

export const Text: React.FC<ITextProps> = ({ messageId, values }) => {
  return <>{getText(messageId, values)}</>;
};

export function getText(messageId: string, values?: string[]): string {
  const keys = messageId.split(".");
  let node: any = ressources;
  keys.forEach((element: string) => {
    node = node ? node[element] : undefined;
  });
  let message: string = node;
  if (values && node) {
    values.forEach((value, index) => {
      message = message.replace("${" + index + "}", value);
    });
  }
  return message || `⚠ ${messageId}`;
}
