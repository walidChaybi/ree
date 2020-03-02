import React from "react";
import { getText } from "../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import "../accueil/sass/BoutonAccueil.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface BoutonAccueilProps {
  texte: string;
  pageUrl: string;
  badge?: number;
  iconFA?: IconDefinition;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  texte,
  pageUrl,
  badge,
  iconFA
}) => {
  const history = useHistory();

  function onClickButton(paramURL: string) {
    history.push(`${paramURL}`);
  }

  return (
    <>
      <Badge className="BadgeBouton" badgeContent={badge}>
        {iconFA && <FontAwesomeIcon className="IconeBouton" icon={iconFA} />}

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
