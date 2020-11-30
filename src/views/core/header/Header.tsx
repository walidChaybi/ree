import React from "react";
import { Text, getText } from "../../common/widget/Text";
import { useHistory } from "react-router-dom";
import { URL_ACCUEIL } from "../../router/ReceUrls";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { BoutonDeconnexion } from "./BoutonDeconnexion";
import { Tooltip } from "@material-ui/core";

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
      <img
        className="LogoHeader"
        src={logoReceBlanc}
        alt={getText("altLogoRece")}
        onClick={event => onClickLogo(event)}
        data-testid="LogoHeader"
      />
      <Tooltip title={`Version de dévelopement numéro: ${version}`}>
        <h1>
          <Text messageId={"header"} />
        </h1>
      </Tooltip>

      <BoutonDeconnexion />
    </header>
  );
};
