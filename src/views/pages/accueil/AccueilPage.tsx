import React from "react";
import { Text } from "../../common/widget/Text";
import { BoutonAccueil } from "./BoutonAccueil";
import "../accueil/sass/AccueilPage.scss";

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
      <BoutonAccueil
        texte="pages.accueil.boutons.requetes"
        pageUrl="mesrequetes"
        badge={nombreRequete}
      />
    </>
  );
};
