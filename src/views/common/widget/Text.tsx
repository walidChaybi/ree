import React from "react";
import messages from "../../../ressources/messages.json";
import errors from "../../../ressources/errors.json";
import success from "../../../ressources/success.json";
import regex from "../../../ressources/regex.json";
import referentiel from "../../../ressources/referentiel.json";

const ressources = { ...messages, errors, regex, referentiel, success };

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
