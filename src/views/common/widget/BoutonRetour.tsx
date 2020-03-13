import React from "react";
import { Text, MessageId } from "./Text";
import { Link } from "react-router-dom";
import { Button } from "reakit/Button";
import { getAppUrl, AppUrls } from "../../router/UrlManager";

interface BoutonRetourProps {
  url?: string;
  messageId?: MessageId;
}
export const BoutonRetour: React.FC<BoutonRetourProps> = ({
  url = getAppUrl(AppUrls.AccueilUrl),
  messageId = "boutons.accueil"
}) => {
  return (
    <Link to={url} className="BoutonRetour">
      <Button>
        <Text messageId={messageId} />
      </Button>
    </Link>
  );
};
