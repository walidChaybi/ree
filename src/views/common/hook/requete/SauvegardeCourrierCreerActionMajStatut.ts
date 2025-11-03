import { postSauvCourrierCreerActionMajStatutRequete } from "@api/appels/requeteApi";
import { ISauvegardeCourrier } from "@model/requete/ISauvegardeCourrier";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useSauvegarderCourrierCreerActionMajStatutRequete(
  statutRequete: StatutRequete,
  libelleAction?: string,
  requete?: ISauvegardeCourrier | undefined,
  requeteId?: string
) {
  const [uuidDocumentsReponse, setUuidDocumentsReponse] = useState<string | undefined>();
  useEffect(
    () => {
      if (requete && requeteId) {
        postSauvCourrierCreerActionMajStatutRequete(requeteId, statutRequete, requete, libelleAction)
          .then(result => {
            setUuidDocumentsReponse(result.body.data[0]);
          })
          .catch(erreurs => {
            AfficherMessage.erreur("Impossible de sauvegarder le courrier d'accompagnement", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requete]
  );

  return uuidDocumentsReponse;
}
