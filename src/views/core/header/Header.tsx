import { Tooltip } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { officierHabiliterPourLeDroit } from "../../../model/agent/IOfficier";
import { Droit } from "../../../model/Droit";
import { FeatureFlag } from "../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../common/util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle } from "../../common/util/Utils";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import { BoutonDeconnexion } from "./BoutonDeconnexion";
import { BoutonRechercheRmc } from "./BoutonRechercheRmc";

interface HeaderProps {
  onClick?: (event: React.MouseEvent, paramURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const history = useHistory();
  const version = "[AIV]{version}_{date}[/AIV]";

  function onClickLogo(event: React.MouseEvent) {
    if (onClick) {
      onClick(event, URL_ACCUEIL);
    }
    history.push(URL_ACCUEIL);
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
