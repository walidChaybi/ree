import React from "react";
import { Text, getText } from "../Text";
import { Link } from "react-router-dom";
import { getAppUrl } from "../../../router/UrlManager";

interface CategorieProps {
  url: string;
  messageId: string;
  last: boolean;
}

export const Categorie: React.FC<CategorieProps> = ({
  url,
  messageId,
  last
}) => {
  const uuidRegex = new RegExp(getText("regex.pages.common.uuid"), "i");

  if (last && uuidRegex.test(messageId)) {
    messageId = "apercurequete";
  }
  return (
    <>
      {last ? (
        <div className="TextFilAriane">
          <Text messageId={"fildariane." + messageId} />
        </div>
      ) : (
        <Link className="LinkFilAriane" to={getAppUrl(url)}>
          <Text messageId={"fildariane." + messageId} />
        </Link>
      )}
    </>
  );
};
