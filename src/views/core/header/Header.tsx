import { Droit } from "@model/agent/enum/Droit";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Tooltip } from "@mui/material";
import { URL_ACCUEIL } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle } from "@util/Utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { BoutonDeconnexion } from "./BoutonDeconnexion";
import { BoutonRechercheRmc } from "./BoutonRechercheRmc";

interface HeaderProps {
  onClick?: (event: React.MouseEvent, paramURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const version = `${process.env.VERSION}_${process.env.DATE_BUILD}`;

  function onClickLogo(event: React.MouseEvent) {
    if (onClick) {
      onClick(event, URL_ACCUEIL);
    }
    navigate(URL_ACCUEIL);
  }

  return (
    <header className="AppHeader">
      <div className="LogoHeader">
        <img
          src={logoReceBlanc}
          alt={getLibelle("Logo RECE")}
          onClick={event => onClickLogo(event)}
          data-testid="LogoHeader"
        />
      </div>

      <Tooltip title={`Version : ${version}`}>
        <h1>{getLibelle("Registre d'État Civil Électronique")}</h1>
      </Tooltip>

      <div className="coteDroit">
        {officierHabiliterPourLeDroit(Droit.CONSULTER) && (
          <>
            {gestionnaireFeatureFlag.estActif(
              FeatureFlag.FF_CONSULT_ACTE_RQT
            ) && <BoutonRechercheRmc />}
            <div className="traitVerticalConteneur">
              <div className="traitVertical" />
            </div>
          </>
        )}
        <BoutonDeconnexion />
      </div>
    </header>
  );
};
