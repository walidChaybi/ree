import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@mui/material/Badge";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../accueil/scss/BoutonAccueil.scss";

interface BoutonAccueilProps {
  libelle: string;
  pageUrl: string;
  badge?: number;
  iconFA?: IconDefinition;
  disabled?: boolean;
  title: string;
  onClickHandler?: (event: React.MouseEvent, paramURL: string) => void;
}

export const BoutonAccueil: React.FC<BoutonAccueilProps> = ({
  libelle,
  pageUrl,
  badge = 0,
  iconFA,
  disabled = false,
  title,
  onClickHandler
}) => {
  const navigate = useNavigate();

  function onClickDefaultHandler(event: React.MouseEvent, paramURL: string) {
        if (!disabled) {
          if (onClickHandler) {
            onClickHandler(event, paramURL);
          }
          navigate(`${paramURL}`);
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
            title={disabled ? "" : title}
            data-testid="IconAccueil"
            aria-labelledby={title}
          />
        )}
        <BoutonDoubleSubmit disabled={disabled} title={title}>
          {libelle}
        </BoutonDoubleSubmit>
      </Badge>
    </div>
  );
};

export const BoutonAccueilEspaceDelivrance = WithHabilitation(
  BoutonAccueil,
  "BoutonAccueilEspaceDelivrance"
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
