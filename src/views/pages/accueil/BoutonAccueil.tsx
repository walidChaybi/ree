import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@material-ui/core/Badge";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reakit/Button";
import WithHabilitation from "../../common/util/habilitation/WithHabilitation";
import { getText } from "../../common/widget/Text";
import "../accueil/scss/BoutonAccueil.scss";

interface BoutonAccueilProps {
  messageId: string;
  pageUrl: string;
  badge?: number;
  iconFA?: IconDefinition;
  disabled?: boolean;
  titleId: string;
  onClickHandler?: (event: React.MouseEvent, paramURL: string) => void;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  messageId,
  pageUrl,
  badge = 0,
  iconFA,
  disabled = false,
  titleId,
  onClickHandler
}) => {
  const history = useHistory();

  function onClickDefaultHandler(event: React.MouseEvent, paramURL: string) {
    if (!disabled) {
      if (onClickHandler) {
        onClickHandler(event, paramURL);
      }
      history.push(`${paramURL}`);
    }
  }

  return (
    <div
      className="BoutonAccueil"
      onClick={event => onClickDefaultHandler(event, pageUrl)}
      data-testid="BtnAccueil"
    >
      <Badge invisible={disabled || badge === 0} badgeContent={badge}>
        {iconFA && (
          <FontAwesomeIcon
            className={"IconeBouton" + (disabled ? " Disabled" : "")}
            icon={iconFA}
            title={disabled ? "" : getText(titleId)}
            data-testid="IconAccueil"
            aria-labelledby={getText(titleId)}
          />
        )}
        <Button disabled={disabled} title={getText(titleId)}>
          {getText(messageId)}
        </Button>
      </Badge>
    </div>
  );
};

export const BoutonAccueilEspaceDelivrance = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilEspaceDelivrance"
);
export const BoutonAccueilEspaceDelivranceV2 = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilEspaceDelivranceV2"
);
export const BoutonAccueilEspaceMiseAjour = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilEspaceMiseAjour"
);
export const BoutonAccueilEspaceCreation = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilEspaceCreation"
);
export const BoutonAccueilCommunication = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilCommunication"
);
export const BoutonAccueilRechercheRequete = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilRechercheRequete"
);
export const BoutonAccueilRechercheActeOuInscription = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilRechercheActeOuInscription"
);
export const BoutonAccueilRechercheActe = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilRechercheActe"
);
export const BoutonAccueilTableau = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilTableau"
);
