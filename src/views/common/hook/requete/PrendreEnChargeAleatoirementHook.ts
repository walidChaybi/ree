import { useEffect, useState } from "react";
import { HTTP_NOT_FOUND } from "../../../../api/ApiManager";
import { getRequeteAleatoire } from "../../../../api/appels/requeteApi";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import {
  IRequeteTableauDelivrance,
  mappingUneRequeteTableauDelivrance
} from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  IRequeteTableauInformation,
  mappingUneRequeteTableauInformation
} from "../../../../model/requete/IRequeteTableauInformation";
import { logError } from "../../util/LogManager";

export interface IRequeteAleatoireResultat {
  requeteDelivrance?: IRequeteTableauDelivrance;
  requeteInformation?: IRequeteTableauInformation;
}

export function useGetRequeteAleatoire(
  type: TypeRequete,
  prendreEnCharge: boolean
) {
  const [requeteAleatoireResultat, setRequeteAleatoireResultat] = useState<
    IRequeteAleatoireResultat | undefined
  >();
  useEffect(() => {
    async function fetchRequeteAleatoire() {
      try {
        if (prendreEnCharge) {
          if (type === TypeRequete.DELIVRANCE) {
            const resultat = await getRequeteAleatoire(
              TypeRequete.DELIVRANCE.nom
            );
            const requeteResultatMappee = mappingUneRequeteTableauDelivrance(
              resultat.body.data,
              false
            );
            setRequeteAleatoireResultat({
              requeteDelivrance: requeteResultatMappee
            });
          } else if (type === TypeRequete.INFORMATION) {
            const resultat = await getRequeteAleatoire(
              TypeRequete.INFORMATION.nom
            );
            const requeteResultatMappee = mappingUneRequeteTableauInformation(
              resultat.body.data,
              false
            );
            setRequeteAleatoireResultat({
              requeteInformation: requeteResultatMappee
            });
          }
        }
      } catch (error) {
        gereErreur(error, setRequeteAleatoireResultat);
      }
    }

    fetchRequeteAleatoire();
  }, [type, prendreEnCharge]);

  return requeteAleatoireResultat;
}

export function gereErreur(error: any, setRequeteAleatoireResultat: any) {
  if (error.response && error.response.status === HTTP_NOT_FOUND) {
    setRequeteAleatoireResultat({ requete: undefined });
  } else {
    logError({
      messageUtilisateur:
        "Impossible de prendre en charge aléatoirement une requête",
      error
    });
  }
}
