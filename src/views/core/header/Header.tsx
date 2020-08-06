import React from "react";
import { Text, getText } from "../../common/widget/Text";
import { useHistory } from "react-router-dom";
import { contextApp, AccueilUrl } from "../../router/UrlManager";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { BoutonDeconnexion } from "./BoutonDeconnexion";
import officierMock from "../../../api/mock/officier.json";
import { IUtilisateurSSOApi } from "../LoginHook";

interface HeaderProps {
  officier: IUtilisateurSSOApi;
  onClick?: (event: React.MouseEvent, paramURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const history = useHistory();

  function onClickLogo(event: React.MouseEvent) {
    if (onClick) {
      onClick(event, contextApp + AccueilUrl);
    }
    history.push(contextApp + AccueilUrl);
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
      <h1>
        <Text messageId={"header"} />
      </h1>
      <BoutonDeconnexion nom={officierMock.nom} prenom={officierMock.prenom} />
    </header>
  );
};
