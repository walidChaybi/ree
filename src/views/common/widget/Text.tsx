import React from "react";
import messages from "../../../ressources/messages.json";
import errors from "../../../ressources/errors.json";
import success from "../../../ressources/success.json";
import referentiel from "../../../ressources/referentiel.json";

const ressources = { ...messages, errors, referentiel, success };

export type MessageId = string;

export interface ITextProps {
  messageId: MessageId;
  values?: string[];
  noWarning?: boolean;
}

export const Text: React.FC<ITextProps> = ({
  messageId,
  values,
  noWarning
}) => {
  return <>{getText(messageId, values, noWarning)}</>;
};

export function getText(
  messageId: string,
  values?: string[] | number[],
  noWarning = false
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

  return message || (noWarning ? messageId : `⚠ ${messageId}`);
}

export function getLibelle(msg: string) {
  return msg;
}
