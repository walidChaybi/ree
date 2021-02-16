import React from "react";
import { Text, MessageId } from "../Text";
import { useHistory } from "react-router-dom";
import { URL_CONTEXT_APP } from "../../../router/ReceUrls";
import { UUID } from "../../../../ressources/Regex";

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
  const onClickLink = () => {
    history.push(`${URL_CONTEXT_APP}${url}`);
  };

  if (last && UUID.test(messageId)) {
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
