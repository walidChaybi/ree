import { rechercheMultiCriteresRequetes } from "@api/appels/requeteApi";
import { TRequeteTableau } from "@model/requete/IRequeteTableau";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { getParamsTableau, IParamsTableau } from "@util/GestionDesLiensApi";
import { logError } from "@util/LogManager";
import { mappingRequetesTableau } from "@util/RequetesUtils";
import { execute, getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";
import { mappingCriteresRequete } from "./RMCRequeteMapping";

export function useRMCRequeteApiHook(criteresRMCRequete?: ICriteresRMCRequete) {
  const [dataRMCRequete, setDataRMCRequete] = useState<TRequeteTableau[]>();
  const [dataTableauRMCRequete, setDataTableauRMCRequete] =
    useState<IParamsTableau>();

  useEffect(() => {
    if (criteresRMCRequete && criteresRMCRequete.valeurs) {
      const criteres = mappingCriteresRequete(criteresRMCRequete.valeurs);
      rechercheMultiCriteresRequetes(criteres, criteresRMCRequete.range)
        .then((result: any) => {
          const requetes = mappingRequetesTableau(
            result?.body?.data?.resultatsRecherche,
            true
          );
          setDataRMCRequete(requetes);
          setDataTableauRMCRequete(getParamsTableau(result));
          if (!result?.body) {
            // TODO: Temporaire, à modifier quand le back renverra le TimeoutException correctement.
            throw new Error(
              getLibelle(
                "La réponse du serveur est trop longue, veuillez affiner les critères de recherche."
              )
            );
          }
        })
        .catch((error: any) => {
          /* istanbul ignore next */
          logError({
            messageUtilisateur: getLibelle(
              "Impossible de récupérer les requetes de la recherche multi-critères"
            ),
            error
          });
          execute(criteresRMCRequete?.onErreur);
        });
    }
  }, [criteresRMCRequete]);

  return {
    dataRMCRequete,
    dataTableauRMCRequete
  };
}
