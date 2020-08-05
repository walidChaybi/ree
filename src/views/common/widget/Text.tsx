import React from "react";
const messages = require("../../../ressources/messages.json");
const errors = require("../../../ressources/errors.json");
const regex = require("../../../ressources/regex.json");
const referentiel = require("../../../ressources/referentiel.json");
const ressources = { ...messages, errors, regex, referentiel };

export type MessageId = string;

export interface ITextProps {
  messageId: MessageId;
  values?: string[];
}

export const Text: React.FC<ITextProps> = ({ messageId, values }) => {
  return <>{getText(messageId, values)}</>;
};

export function getText(
  messageId: string,
  values?: string[] | number[]
): string {
  const keys = messageId.split(".");
  let node: any = ressources;
  keys.forEach((element: string) => {
    node = node ? node[element] : undefined;
  });
  let message: string = node;
  if (values && node) {
    values.forEach((value: string | number, index: number) => {
      const valueToUse = typeof value === "number" ? value.toString() : value;
      message = message.replace(`$\{${index}}`, valueToUse);
    });
  }
  return message || `⚠ ${messageId}`;
}
