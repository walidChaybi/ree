import React from "react";
import { BoutonFiche } from "./fiche/BoutonFiche";

export const RcRcaPage: React.FC = () => {
  const identifiant = "76b62678-8b06-4442-ad5b-b9207627a6e3";
  const categorie = "rc";
  const annee = "2020";
  const nom = "Favaro";
  const numero = "213456789";

  const identifiant2 = "8244d136-729b-4fd3-b88a-fa1fe30a2214";
  const categorie2 = "rc";
  const annee2 = "1999";
  const nom2 = "Michel";
  const numero2 = "15987";

  return (
    <div>
      <BoutonFiche
        identifiant={identifiant}
        categorie={categorie}
        nom1={nom}
        annee={annee}
        numero={numero}
      />

      <BoutonFiche
        identifiant={identifiant2}
        categorie={categorie2}
        nom1={nom}
        nom2={nom2}
        annee={annee2}
        numero={numero2}
      />
    </div>
  );
};
