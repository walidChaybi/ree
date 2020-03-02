import React from "react";
import { getText } from "../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import "../accueil/sass/BoutonAccueil.scss";

interface BoutonAccueilProps {
  texte: string;
  pageUrl: string;
  badge?: number;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  texte,
  pageUrl,
  badge
}) => {
  const history = useHistory();

  function onClickButton(paramURL: string) {
    history.push(`${paramURL}`);
  }

  return (
    <>
      <Badge className="BadgeAccueil" badgeContent={badge} color="secondary">
        <Button
          className="BoutonAccueil"
          onClick={() => onClickButton(pageUrl)}
        >
          {getText(texte)}
        </Button>
      </Badge>
    </>
  );
};
