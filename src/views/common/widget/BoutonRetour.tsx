import React from "react";
import { Text } from "./Text";
import { Link } from "react-router-dom";
import { Button } from "reakit/Button";

interface BoutonRetourProps {
  url?: string;
  messageId?: string;
}
export const BoutonRetour: React.FC<BoutonRetourProps> = ({
  url = "/accueil",
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
