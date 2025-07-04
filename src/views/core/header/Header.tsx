import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { URL_ACCUEIL } from "@router/ReceUrls";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import MenuUtilisateur from "../../../composants/miseEnPage/enTete/MenuUtilisateur";
import logoReceBlanc from "../../../img/logo-rece-blanc.svg";
import { BoutonRechercheRmc } from "./BoutonRechercheRmc";

interface HeaderProps {
  onClick?: (event: React.MouseEvent, paramURL: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { utilisateurConnecte } = useContext(RECEContextData);

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

      <h1>{"Registre d'État Civil Électronique"}</h1>

      <div className="coteDroit">
        {utilisateurConnecte.estHabilitePour({ leDroit: Droit.CONSULTER }) && (
          <>
            <BoutonRechercheRmc />
            <div className="traitVerticalConteneur">
              <div className="traitVertical" />
            </div>
          </>
        )}

        <MenuUtilisateur />
      </div>
    </header>
  );
};
