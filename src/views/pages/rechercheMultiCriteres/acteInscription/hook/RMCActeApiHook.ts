import { useState, useEffect } from "react";
import { rechercheMultiCriteresActes } from "../../../../../api/appels/etatcivilApi";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import {
  getMaxRange,
  getMinRange,
  getRowsNumber,
  IDataTableau,
  parseLink
} from "../../../../common/util/GestionDesLiensApi";
import { logError } from "../../../../common/util/LogManager";
import {
  mappingActes,
  mappingCriteres,
  rechercherActeAutorise
} from "./RMCActeInscriptionUtils";
import { ICriteresRecherche } from "./RMCInscriptionApiHook";

export function useRMCActeApiHook(criteres?: ICriteresRecherche) {
  const [dataRMCActe, setDataRMCActe] = useState<IResultatRMCActe[]>();
  const [dataTableauRMCActe, setDataTableauRMCActe] = useState<IDataTableau>();
  useEffect(() => {
    if (criteres != null && criteres.valeurs != null) {
      const criteresRequest = mappingCriteres(criteres.valeurs);

      if (rechercherActeAutorise(criteresRequest)) {
        rechercheMultiCriteresActes(criteresRequest, criteres.range)
          .then((result: any) => {
            setDataRMCActe(mappingActes(result.body.data.registres));
            const { nextLink, prevLink } = parseLink(result.headers["link"]);
            setDataTableauRMCActe({
              previousDataLinkState: prevLink,
              nextDataLinkState: nextLink,
              rowsNumberState: getRowsNumber(result),
              minRangeState: getMinRange(result),
              maxRangeState: getMaxRange(result)
            });
          })
          .catch(error => {
            logError({
              messageUtilisateur:
                "Impossible de récupérer les actes de la recherche multi-critères",
              error
            });
          });
      } else {
        setDataRMCActe([]);
        setDataTableauRMCActe({});
      }
    }
  }, [criteres]);

  return {
    dataRMCActe,
    dataTableauRMCActe
  };
}
