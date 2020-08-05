import React from "react";
import { Text, getText, MessageId } from "../Text";
import { contextApp } from "../../../router/UrlManager";

interface CategorieProps {
  url: string;
  messageId: MessageId;
  last: boolean;
}

export const Categorie: React.FC<CategorieProps> = ({
  url,
  messageId,
  last,
}) => {
  const uuidRegex = new RegExp(getText("regex.pages.common.uuid"), "i");

  if (last && uuidRegex.test(messageId)) {
    messageId = "apercurequete";
  }
  const message = `fildariane.${messageId}`;
  return (
    <>
      {last ? (
        <div className="TextFilAriane">
          <Text messageId={message} />
        </div>
      ) : (
        <a className="LinkFilAriane" href={`${contextApp}${url}`}>
          <Text messageId={message} />
        </a>
      )}
    </>
  );
};
