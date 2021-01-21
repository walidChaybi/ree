/* istanbul ignore file */

import React from "react";
import { LienFiche } from "./fiche/LienFiche";
import { TypeFiche } from "../../model/etatcivil/TypeFiche";

export const ActePage: React.FC = () => {
  return (
    <>
      <p>Acte</p>
      <LienFiche
        identifiant={"b41079a5-9e8d-478c-b04c-c4c2ac67134f"}
        categorie={TypeFiche.ACTE}
        numero={"Acte de test 1"}
      />
      <LienFiche
        identifiant={"d8708d77-a359-4553-be72-1eb5f246d4da"}
        categorie={TypeFiche.ACTE}
        numero={"Acte de test 2"}
      />
    </>
  );
};
