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
  const numero = "1";

  const identifiant2 = "8244d136-729b-4fd3-b88a-fa1fe30a2214";
  const categorie2 = "rc";
  const annee2 = "2020";
  const nom2 = "Michel";
  const numero2 = "2";

  const identifiant3 = "85df1d10-71b7-4336-9463-bb1c5760d1a0";
  const categorie3 = "rc";
  const annee3 = "2020";
  const nom3 = "";
  const numero3 = "3";

  const identifiant4 = "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918";
  const categorie4 = "rc";
  const annee4 = "2020";
  const nom4 = "";
  const numero4 = "4";

  const identifiant5 = "a3d1fb33-8b6a-40ac-8a6d-2b722ca5f71e";
  const categorie5 = "rc";
  const annee5 = "2020";
  const nom5 = "";
  const numero5 = "5";

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
        identifiant={identifiant2}
        categorie={categorie2}
        nom1={nom}
        nom2={nom2}
        annee={annee2}
        numero={numero2}
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

      <BoutonFiche
        identifiant={identifiant5}
        categorie={categorie5}
        nom1={nom5}
        annee={annee5}
        numero={numero5}
      />
    </div>
  );
};
