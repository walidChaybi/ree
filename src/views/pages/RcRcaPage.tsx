/* istanbul ignore file */

import React from "react";
import { LienFiche } from "./fiche/LienFiche";
import { TypeFiche } from "../../model/etatcivil/TypeFiche";

export const RcRcaPage: React.FC = () => {
  const identifiantRca = "8c9ea77f-55dc-494f-8e75-b136ac7ce63c";
  const categorieRca = TypeFiche.RCA;
  const numeroRca = "4092";

  const identifiantRca2 = "8c9ea77f-55dc-494f-8e75-b136ac7ce63d";
  const categorieRca2 = TypeFiche.RCA;
  const numeroRca2 = "4093";

  const identifiantRca3 = "8c9ea77f-55dc-494f-8e75-b136ac7ce63e";
  const categorieRca3 = TypeFiche.RCA;
  const numeroRca3 = "4094";

  const identifiant = "76b62678-8b06-4442-ad5b-b9207627a6e3";
  const categorie = TypeFiche.RC;
  const numero = "1";

  const identifiant2 = "8244d136-729b-4fd3-b88a-fa1fe30a2214";
  const categorie2 = TypeFiche.RC;
  const numero2 = "2";

  const identifiant3 = "85df1d10-71b7-4336-9463-bb1c5760d1a0";
  const categorie3 = TypeFiche.RC;
  const numero3 = "3";

  const identifiant4 = "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918";
  const categorie4 = TypeFiche.RC;
  const numero4 = "4";

  const identifiant5 = "a3d1fb33-8b6a-40ac-8a6d-2b722ca5f71e";
  const categorie5 = TypeFiche.RC;
  const numero5 = "5";

  const identifiantPacs = "89c9d030-26c3-41d3-bdde-8b4dcc0420e0";
  const categoriePacs = TypeFiche.PACS;
  const numeroPacs = "123456";

  const identifiantPacs2 = "89c9d030-26c3-41d3-bdde-8b4dcc0420e1";
  const categoriePacs2 = TypeFiche.PACS;
  const numeroPacs2 = "123457";

  const identifiantPacs3 = "89c9d030-26c3-41d3-bdde-8b4dcc0420e2";
  const categoriePacs3 = TypeFiche.PACS;
  const numeroPacs3 = "123457";

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

      <LienFiche
        identifiant={identifiantRca3}
        categorie={categorieRca3}
        numero={numeroRca3}
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
      <LienFiche
        identifiant={identifiantPacs2}
        categorie={categoriePacs2}
        numero={numeroPacs2}
      />
      <LienFiche
        identifiant={identifiantPacs3}
        categorie={categoriePacs3}
        numero={numeroPacs3}
      />
    </div>
  );
};
