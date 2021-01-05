/* istanbul ignore file */

import React from "react";
import { LienFiche } from "./fiche/LienFiche";

export const RcRcaPage: React.FC = () => {
  const identifiantRca = "8c9ea77f-55dc-494f-8e75-b136ac7ce63c";
  const categorieRca = "rca";
  const numeroRca = "4092";

  const identifiantRca2 = "8c9ea77f-55dc-494f-8e75-b136ac7ce63d";
  const categorieRca2 = "rca";
  const numeroRca2 = "4093";

  const identifiant = "76b62678-8b06-4442-ad5b-b9207627a6e3";
  const categorie = "rc";
  const numero = "1";

  const identifiant2 = "8244d136-729b-4fd3-b88a-fa1fe30a2214";
  const categorie2 = "rc";
  const numero2 = "2";

  const identifiant3 = "85df1d10-71b7-4336-9463-bb1c5760d1a0";
  const categorie3 = "rc";
  const numero3 = "3";

  const identifiant4 = "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918";
  const categorie4 = "rc";
  const numero4 = "4";

  const identifiant5 = "a3d1fb33-8b6a-40ac-8a6d-2b722ca5f71e";
  const categorie5 = "rc";
  const numero5 = "5";

  const identifiantPacs = "89c9d030-26c3-41d3-bdde-8b4dcc0420e0";
  const categoriePacs = "pacs";
  const numeroPacs = "123456";

  return (
    <div>
      <p>RCA</p>
      <LienFiche
        identifiant={identifiantRca}
        categorie={categorieRca}
        numero={numeroRca}
      />

      <LienFiche
        identifiant={identifiantRca2}
        categorie={categorieRca2}
        numero={numeroRca2}
      />

      <p>RC</p>
      <LienFiche
        identifiant={identifiant}
        categorie={categorie}
        numero={numero}
      />

      <LienFiche
        identifiant={identifiant2}
        categorie={categorie2}
        numero={numero2}
      />

      <LienFiche
        identifiant={identifiant3}
        categorie={categorie3}
        numero={numero3}
      />

      <LienFiche
        identifiant={identifiant4}
        categorie={categorie4}
        numero={numero4}
      />

      <LienFiche
        identifiant={identifiant5}
        categorie={categorie5}
        numero={numero5}
      />

      <p>PACS</p>

      <LienFiche
        identifiant={identifiantPacs}
        categorie={categoriePacs}
        numero={numeroPacs}
      />
    </div>
  );
};
