import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reakit/Button";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@material-ui/core/Badge";
import { getText } from "../../common/widget/Text";
import "../accueil/sass/BoutonAccueil.scss";

interface BoutonAccueilProps {
  texte: string;
  pageUrl: string;
  badge?: number;
  iconFA?: IconDefinition;
  disabled?: boolean;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  texte,
  pageUrl,
  badge = 0,
  iconFA,
  disabled = false
}) => {
  const history = useHistory();

  function onClickButton(paramURL: string) {
    if (!disabled) {
      history.push(`${paramURL}`);
    }
  }

  return (
    <div
      className="BoutonAccueil"
      onClick={() => onClickButton(pageUrl)}
      data-testid="BtnAccueil"
    >
      <Badge invisible={disabled || badge === 0} badgeContent={badge}>
        {iconFA && (
          <FontAwesomeIcon
            className={"IconeBouton" + (disabled ? " Disabled" : "")}
            icon={iconFA}
            title={disabled ? "Indisponible" : ""}
            data-testid="IconAccueil"
          />
        )}
        <Button disabled={disabled} title={disabled ? "Indisponible" : ""}>
          {getText(texte)}
        </Button>
      </Badge>
    </div>
  );
};
