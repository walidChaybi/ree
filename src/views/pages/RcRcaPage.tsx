import React from "react";
import { BoutonFiche } from "./fiche/BoutonFiche";

export const RcRcaPage: React.FC = () => {
  const identifiant = "7566e16c-2b0e-11eb-adc1-0242ac120002";
  const categorie = "rc";
  const annee = "2018";
  const nom = "Favaro";
  const numero = "56533";

  const identifiant2 = "135e4dfe-9757-4d5d-8715-359c6e73289b";
  const categorie2 = "rca";
  const annee2 = "2015";
  const nom2 = "Michel";
  const numero2 = "15987";

  return (
    <div>
      <BoutonFiche
        identifiant={identifiant}
        categorie={categorie}
        nom={nom}
        annee={annee}
        numero={numero}
      />

      <BoutonFiche
        identifiant={identifiant2}
        categorie={categorie2}
        nom={nom2}
        annee={annee2}
        numero={numero2}
      />
    </div>
  );
};
