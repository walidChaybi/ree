import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getRequetePlusAncienne } from "@api/appels/requeteApi";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { mappingUneRequeteTableauCreation } from "@pages/requeteCreation/hook/DonneesRequeteCreationApiHook";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IRequetePlusAncienneResultat {
  requete: TRequeteTableau;
}

export function useGetRequetePlusAncienne(
  type: TypeRequete,
  prendreEnCharge: boolean
) {
  const [requetePlusAncienneResultat, setRequetePlusAncienneResultat] =
    useState<IRequetePlusAncienneResultat | undefined>();

  useEffect(() => {
    async function fetchRequetePlusAncienne() {
      try {
        if (prendreEnCharge && type === TypeRequete.CREATION) {
          const resultatCreation = await getRequetePlusAncienne(
            TypeRequete.CREATION.nom
          );
          const requeteResultatCreationMappee =
            mappingUneRequeteTableauCreation(resultatCreation.body.data, false);
          setRequetePlusAncienneResultat({
            requete: requeteResultatCreationMappee
          });
        }
      } catch (error) {
        /* istanbul ignore next */
        gererErreur(error, setRequetePlusAncienneResultat);
      }
    }

    fetchRequetePlusAncienne();
  }, [type, prendreEnCharge]);

  return requetePlusAncienneResultat;
}

/* istanbul ignore next */
export function gererErreur(error: any, setRequetePlusAncienneResultat: any) {
  if (error.response && error.response.status === HTTP_NOT_FOUND) {
    setRequetePlusAncienneResultat({ requete: undefined });
  } else {
    logError({
      messageUtilisateur:
        "Impossible de prendre en charge la requête la plus ancienne",
      error
    });
  }
}
