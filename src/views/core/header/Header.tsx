import { Tooltip } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { getLibelle } from "../../common/util/Utils";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import { BoutonDeconnexion } from "./BoutonDeconnexion";

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

      <BoutonDeconnexion />
    </header>
  );
};
