import { useState, useEffect } from "react";
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
    if (criteres != null && criteres.valeurs != null) {
      const criteresRecherche = mappingCriteres(criteres.valeurs);

      if (rechercherRepertoireAutorise(criteresRecherche)) {
        // Recherche dans les inscriptions
        rechercheMultiCriteresInscriptions(criteresRecherche, criteres.range)
          .then((result: any) => {
            setDataRMCInscription(
              mappingInscriptions(result.body.data.repertoiresCiviles)
            );
            setDataTableauRMCInscription(getParamsTableau(result));
          })
          .catch(error => {
            logError({
              messageUtilisateur:
                "Impossible de récupérer les inscriptions de la recherche multi-critères",
              error
            });
          });
      } else {
        setDataRMCInscription([]);
        setDataTableauRMCInscription({});
      }
    }
  }, [criteres]);

  return {
    dataRMCInscription,
    dataTableauRMCInscription
  };
}
