import { useEffect, useState } from "react";
import { postSauvCourrierCreerActionMajStatutRequete } from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { ISauvegardeCourrier } from "../../../../model/requete/ISauvegardeCourrier";
import { logError } from "../../util/LogManager";

export function useSauvegarderCourrierCreerActionMajStatutRequete(
  statutRequete: StatutRequete,
  libelleAction?: string,
  requete?: ISauvegardeCourrier | undefined,
  requeteId?: string
) {
  const [uuidDocumentsReponse, setUuidDocumentsReponse] =
    useState<string[] | undefined>();
  useEffect(
    () => {
      if (requete && requeteId) {
        postSauvCourrierCreerActionMajStatutRequete(
          requeteId,
          statutRequete,
          requete,
          libelleAction
        )
          .then(result => {
            setUuidDocumentsReponse(result.body.data);
          })
          .catch(error => {
            logError({
              error,
              messageUtilisateur:
                "Impossible de sauvegarder le courrier d'accompagnement"
            });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [requete]
  );

  return uuidDocumentsReponse;
}
