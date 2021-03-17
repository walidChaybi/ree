import React from "react";
import { Text, MessageId } from "../Text";
import { Link } from "react-router-dom";
import { RetourContext } from "../../../core/body/Body";

interface BoutonRetourProps {
  messageId?: MessageId;
}
export const BoutonRetour: React.FC<BoutonRetourProps> = ({
  messageId = "boutons.accueil"
}) => {
  return (
    <RetourContext.Consumer>
      {retourUrl => (
        <Link to={retourUrl} className="Bouton BoutonRetour" role="button">
          <Text messageId={messageId} />
        </Link>
      )}
    </RetourContext.Consumer>
  );
};
