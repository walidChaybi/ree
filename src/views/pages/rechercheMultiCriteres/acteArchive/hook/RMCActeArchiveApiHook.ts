import { useState, useEffect } from "react";
import { rechercheMultiCriteresActes } from "../../../../../api/appels/etatcivilApi";
import { IRMCActeArchive } from "../../../../../model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import {
  getParamsTableau,
  IParamsTableau
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import { mappingActes, mappingCriteres } from "./RMCActeArchiveUtils";

export interface ICriteresRecherche {
  valeurs: IRMCActeArchive;
  range?: string;
}

export function useRMCActeArchiveApiHook(criteres?: ICriteresRecherche) {
  const [dataRMCActe, setDataRMCActe] = useState<IResultatRMCActe[]>();
  const [
    dataTableauRMCActe,
    setDataTableauRMCActe
  ] = useState<IParamsTableau>();
  useEffect(() => {
    if (criteres != null && criteres.valeurs != null) {
      const criteresRequest = mappingCriteres(criteres.valeurs);

      rechercheMultiCriteresActes(criteresRequest, criteres.range)
        .then((result: any) => {
          setDataRMCActe(mappingActes(result.body.data.registres));
          setDataTableauRMCActe(getParamsTableau(result));
        })
        .catch(error => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les actes de la recherche multi-critères",
            error
          });
        });
    }
  }, [criteres]);

  return {
    dataRMCActe,
    dataTableauRMCActe
  };
}
