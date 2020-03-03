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
  disabled: boolean;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  texte,
  pageUrl,
  badge,
  iconFA,
  disabled
}) => {
  badge = badge != null ? badge : 0;
  const history = useHistory();

  function onClickButton(paramURL: string) {
    if (!disabled) {
      history.push(`${paramURL}`);
    }
  }

  return (
    <div className="BoutonAccueil" onClick={() => onClickButton(pageUrl)}>
      <Badge
        invisible={(disabled && badge >= 0) || badge === 0}
        badgeContent={badge}
      >
        {iconFA && (
          <FontAwesomeIcon
            className={"IconeBouton" + (disabled ? " Disabled" : "")}
            icon={iconFA}
          />
        )}
        <Button disabled={disabled}>{getText(texte)}</Button>
      </Badge>
    </div>
  );
};
