import React from "react";
import { Text, getText, MessageId } from "../Text";
import { useHistory } from "react-router-dom";
import { URL_CONTEXT_APP } from "../../../router/ReceUrls";

interface CategorieProps {
  url: string;
  messageId: MessageId;
  last: boolean;
}

export const Categorie: React.FC<CategorieProps> = ({
  url,
  messageId,
  last
}) => {
  const history = useHistory();
  const uuidRegex = new RegExp(getText("regex.pages.common.uuid"), "i");
  const onClickLink = () => {
    history.push(`${URL_CONTEXT_APP}${url}`);
  };

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
        <div className="LinkFilAriane" onClick={onClickLink}>
          <Text messageId={message} />
        </div>
      )}
    </>
  );
};
