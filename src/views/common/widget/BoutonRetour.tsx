import React from "react";
import { Text, MessageId } from "./Text";
import { Link } from "react-router-dom";
import { Button } from "reakit/Button";
import { AppUrls } from "../../router/UrlManager";

interface BoutonRetourProps {
  url?: string;
  messageId?: MessageId;
}
export const BoutonRetour: React.FC<BoutonRetourProps> = ({
  url = AppUrls.ctxAccueilUrl,
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
