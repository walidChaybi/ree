/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React from "react";
import { getLibelle } from "../../common/widget/Text";
import { BoutonRetour } from "../../common/widget/navigation/BoutonRetour";

export const ApercuRequeteTraitementPage: React.FC = () => {
  return (
    <>
      <title>{getLibelle("Aperçu du traitement de la requête")}</title>
      <h1>{getLibelle("Aperçu du traitement de la requête")}</h1>
      <BoutonRetour message={getLibelle("<< Retour")} />
    </>
  );
};
