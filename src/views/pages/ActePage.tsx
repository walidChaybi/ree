/* istanbul ignore file */

import React from "react";
import { LienFiche } from "./fiche/LienFiche";
import { TypeFiche } from "../../model/etatcivil/TypeFiche";

export const ActePage: React.FC = () => {
  return (
    <>
      <p>Acte</p>
      <div>
        <LienFiche
          identifiant={"b41079a5-9e8d-478c-b04c-c4c2ac67134f"}
          categorie={TypeFiche.ACTE}
          numero={"Acte de test 1"}
        />
      </div>
      <div>
        <LienFiche
          identifiant={"d8708d77-a359-4553-be72-1eb5f246d4da"}
          categorie={TypeFiche.ACTE}
          numero={"Acte de test 2"}
        />
      </div>
      <div>
        <LienFiche
          identifiant={"923a10fb-0b15-452d-83c0-d24c76d1de8d"}
          categorie={TypeFiche.ACTE}
          numero={"Acte de test 3"}
        />
      </div>
      <div>
        <LienFiche
          identifiant={"0bce8edd-0183-495b-939d-0b3cf6918792"}
          categorie={TypeFiche.ACTE}
          numero={"Acte de test 4"}
        />
      </div>
    </>
  );
};
