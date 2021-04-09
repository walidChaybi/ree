/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React from "react";
import { getLibelle } from "../../common/widget/Text";
import { useHistory } from "react-router-dom";
import { URL_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID } from "../../router/ReceUrls";
import { BoutonRetour } from "../../common/widget/navigation/BoutonRetour";
import { getUrlWithParam } from "../../common/util/route/routeUtil";

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      <h1>{getLibelle("Aperçu de la requête en prise en charge")}</h1>
      <button
        onClick={() => {
          history.push(
            getUrlWithParam(
              URL_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID,
              "123"
            )
          );
        }}
      >
        Traitement...
      </button>
      <BoutonRetour message={getLibelle("<< Retour")} />
    </>
  );
};
