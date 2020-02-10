import React from "react";
import { Text } from "./Text";
import { Link } from "react-router-dom";
import { Button } from "reakit/Button";

export const BoutonAccueil: React.FC = () => {
  return (
    <Link to="/accueil">
      <Button>
        <Text messageId="boutons.accueil" />
      </Button>
    </Link>
  );
};
