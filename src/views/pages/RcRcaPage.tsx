import React from "react";
import { BoutonFiche } from "./fiche/BoutonFiche";

export const RcRcaPage: React.FC = () => {
  const identifiantRca = "8c9ea77f-55dc-494f-8e75-b136ac7ce63c";
  const categorieRca = "rca";
  const anneeRca = "2019";
  const nomRca = "Fleck";
  const nomRca2 = "Quinzel";
  const numeroRca = "4092";

  const identifiant = "76b62678-8b06-4442-ad5b-b9207627a6e3";
  const categorie = "rc";
  const annee = "2020";
  const nom = "Favaro";
  const numero = "213456789";

  const identifiant3 = "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918";
  const categorie3 = "rc";
  const annee3 = "2019";
  const nom3 = "";
  const numero3 = "213456789";

  const identifiant4 = "a3d1fb33-8b6a-40ac-8a6d-2b722ca5f71e";
  const categorie4 = "rc";
  const annee4 = "2019";
  const nom4 = "";
  const numero4 = "213456789";

  return (
    <div>
      <BoutonFiche
        identifiant={identifiantRca}
        categorie={categorieRca}
        nom1={nomRca}
        nom2={nomRca2}
        annee={anneeRca}
        numero={numeroRca}
      />

      <BoutonFiche
        identifiant={identifiant}
        categorie={categorie}
        nom1={nom}
        annee={annee}
        numero={numero}
      />

      <BoutonFiche
        identifiant={identifiant3}
        categorie={categorie3}
        nom1={nom3}
        annee={annee3}
        numero={numero3}
      />

      <BoutonFiche
        identifiant={identifiant4}
        categorie={categorie4}
        nom1={nom4}
        annee={annee4}
        numero={numero4}
      />
    </div>
  );
};
