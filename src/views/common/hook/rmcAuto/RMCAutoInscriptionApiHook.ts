import { rechercheMultiCriteresAutoInscription } from "@api/appels/etatcivilApi";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mappingInscriptions } from "../rmcActeInscription/RMCActeInscriptionUtils";
import { determinerCriteresRMCAuto } from "./RMCAutoActesInscriptionsUtils";

export function useRMCAutoInscriptionApiHook(
  requete?: IRequeteTableauDelivrance | TRequete,
  range?: string
) {
  const [dataRMCAutoInscription, setDataRMCAutoInscription] =
    useState<IResultatRMCInscription[]>();

  const [dataTableauRMCAutoInscription, setDataTableauRMCAutoInscription] =
    useState<IParamsTableau>();

  useEffect(() => {
    if (requete) {
      const criteresRequest = determinerCriteresRMCAuto(requete);
      rechercheMultiCriteresAutoInscription(criteresRequest, range)
        .then(result => {
          setDataRMCAutoInscription(
            mappingInscriptions(result?.body?.data?.repertoiresCiviles)
          );
          setDataTableauRMCAutoInscription(getParamsTableau(result));
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les inscriptions de la recherche multi-critères automatique",
            error
          });
        });
    }
  }, [requete, range]);

  return {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  };
}
