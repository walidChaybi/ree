import React from "react";
import { Text } from "../../common/widget/Text";
import { BoutonAccueil } from "./BoutonAccueil";
import "../accueil/sass/AccueilPage.scss";
import { faEnvelope, faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { faUser, faUsers, faSearch } from "@fortawesome/free-solid-svg-icons";

export const AccueilPage: React.FC = () => {
  // Mock de données
  const nomPrenom = "Louise COURCELLE";
  const nombreRequete = 3;

  return (
    <>
      <h2>
        <Text messageId={"pages.accueil.titre"} />
      </h2>
      <div className="Titre">
        <Text messageId={"pages.accueil.bienvenue"} />
        {" " + nomPrenom}
      </div>
      <div className="MenuAccueil">
        <BoutonAccueil
          texte="pages.accueil.boutons.requetes"
          pageUrl="mesrequetes"
          badge={nombreRequete}
          iconFA={faUser}
        ></BoutonAccueil>
        <BoutonAccueil
          texte="pages.accueil.boutons.service"
          pageUrl="requeteservice"
          iconFA={faUsers}
        ></BoutonAccueil>
        <BoutonAccueil
          texte="pages.accueil.boutons.messagerie"
          pageUrl="messagerie"
          iconFA={faEnvelope}
        ></BoutonAccueil>
        <BoutonAccueil
          texte="pages.accueil.boutons.multicriteres"
          pageUrl="multicriteres"
          iconFA={faSearch}
        ></BoutonAccueil>
        <BoutonAccueil
          texte="pages.accueil.boutons.saisie"
          pageUrl="saisierequete"
          iconFA={faKeyboard}
        ></BoutonAccueil>
      </div>
    </>
  );
};
