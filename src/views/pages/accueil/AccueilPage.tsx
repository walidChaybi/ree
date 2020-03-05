import React from "react";
import { Text } from "../../common/widget/Text";
import { BoutonAccueil } from "./BoutonAccueil";
import { useRequeteApi } from "../requete/RequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import "../accueil/sass/AccueilPage.scss";
import { faEnvelope, faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { faUser, faUsers, faSearch } from "@fortawesome/free-solid-svg-icons";
import logoRece from "../../../img/logo-rece.svg";

export const AccueilPage: React.FC = () => {
  // Mock de données
  const nom = "Garisson";
  const prenom = "Juliette";

  const { dataState = [], rowsNumberState = 0, errorState } = useRequeteApi({
    nomOec: nom,
    prenomOec: prenom,
    statut: StatutRequete.ASigner
  });

  return (
    <>
      <h2>
        <Text messageId={"pages.accueil.titre"} />
      </h2>
      <img src={logoRece} alt="logo RECE" />
      <div className="Titre">
        <Text messageId={"pages.accueil.bienvenue"} />
        {" " + nom + " " + prenom}
      </div>
      <div className="MenuAccueil">
        <BoutonAccueil
          messageId="pages.accueil.boutons.requetes"
          pageUrl="mesrequetes"
          badge={rowsNumberState}
          iconFA={faUser}
          titleId="pages.accueil.titles.requetes"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.service"
          pageUrl="requeteservice"
          iconFA={faUsers}
          titleId="pages.accueil.titles.service"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.messagerie"
          pageUrl="messagerie"
          iconFA={faEnvelope}
          disabled={true}
          titleId="pages.accueil.titles.messagerie"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.multicriteres"
          pageUrl="multicriteres"
          iconFA={faSearch}
          disabled={true}
          titleId="pages.accueil.titles.multicriteres"
        ></BoutonAccueil>
        <BoutonAccueil
          messageId="pages.accueil.boutons.saisie"
          pageUrl="saisierequete"
          iconFA={faKeyboard}
          disabled={true}
          titleId="pages.accueil.titles.saisie"
        ></BoutonAccueil>
      </div>
    </>
  );
};
