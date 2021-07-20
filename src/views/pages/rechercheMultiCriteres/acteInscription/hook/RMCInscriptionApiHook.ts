import { useEffect, useState } from "react";
import { rechercheMultiCriteresInscriptions } from "../../../../../api/appels/etatcivilApi";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import {
  mappingCriteres,
  mappingInscriptions,
  rechercherRepertoireAutorise
} from "./RMCActeInscriptionUtils";

export interface ICriteresRecherche {
  valeurs: IRMCActeInscription;
  range?: string;
}

export function useRMCInscriptionApiHook(criteres?: ICriteresRecherche) {
  const [dataRMCInscription, setDataRMCInscription] = useState<
    IResultatRMCInscription[]
  >();
  const [
    dataTableauRMCInscription,
    setDataTableauRMCInscription
  ] = useState<IParamsTableau>();

  useEffect(() => {
    async function fetchInscriptions() {
      try {
        if (criteres != null && criteres.valeurs != null) {
          const criteresRecherche = mappingCriteres(criteres.valeurs);
          if (rechercherRepertoireAutorise(criteresRecherche)) {
            const result = await rechercheMultiCriteresInscriptions(
              criteresRecherche,
              criteres.range
            );
            const inscriptions = mappingInscriptions(
              result?.body?.data?.repertoiresCiviles
            );
            setDataRMCInscription(inscriptions);
            setDataTableauRMCInscription(getParamsTableau(result));
          } else {
            setDataRMCInscription([]);
            setDataTableauRMCInscription({});
          }
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les inscriptions de la recherche multi-critères",
          error
        });
      }
    }
    fetchInscriptions();
  }, [criteres]);

  return {
    dataRMCInscription,
    dataTableauRMCInscription
  };
}
