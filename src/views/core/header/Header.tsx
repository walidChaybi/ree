import { RECEContextData } from "@core/contexts/RECEContext";
import { officierHabiliterPourLeDroit } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import Tooltip from "@mui/material/Tooltip";
import { URL_ACCUEIL } from "@router/ReceUrls";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { BoutonDeconnexion } from "./BoutonDeconnexion";
import { BoutonRechercheRmc } from "./BoutonRechercheRmc";

interface HeaderProps {
  onClick?: (event: React.MouseEvent, paramURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);
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
          alt="Logo RECE"
          onClick={event => onClickLogo(event)}
          data-testid="LogoHeader"
        />
      </div>

      <Tooltip title={`Version : ${version}`}>
        <h1>{"Registre d'État Civil Électronique"}</h1>
      </Tooltip>

      <div className="coteDroit">
        {officierHabiliterPourLeDroit(utilisateurConnecte, Droit.CONSULTER) && (
          <>
            <BoutonRechercheRmc />
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
