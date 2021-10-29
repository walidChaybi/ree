import { useEffect, useState } from "react";
import { rechercheMultiCriteresAutoInscription } from "../../../../../api/appels/etatcivilApi";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingInscriptions } from "../../acteInscription/hook/RMCActeInscriptionUtils";
import { determinerCriteresRMCAuto } from "./RMCAutoActesInscriptionsUtils";

export function useRMCAutoInscriptionApiHook(
  requete?: IRequeteTableauDelivrance | IRequeteDelivrance,
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
