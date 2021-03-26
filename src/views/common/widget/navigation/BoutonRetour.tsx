import React from "react";
import { Text, MessageId } from "../Text";
import { Link } from "react-router-dom";
import { RetourContext } from "../../../core/body/Body";

interface BoutonRetourProps {
  messageId?: MessageId;
  message?: string;
}
export const BoutonRetour: React.FC<BoutonRetourProps> = ({
  messageId = "boutons.accueil",
  message
}) => {
  return (
    <RetourContext.Consumer>
      {retourUrl => (
        <Link to={retourUrl} className="Bouton BoutonRetour" role="button">
          {message ? <>{message}</> : <Text messageId={messageId} />}
        </Link>
      )}
    </RetourContext.Consumer>
  );
};
