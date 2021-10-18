import { useEffect, useState } from "react";
import { postSauvCourrierCreerActionMajStatutRequete } from "../../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { ISauvegardeCourrier } from "../../../../../model/requete/v2/ISauvegardeCourrier";
import { logError } from "../../../util/LogManager";

export function useSauvegarderCourrierCreerActionMajStatutRequete(
  libelleAction: string,
  statutRequete: StatutRequete,
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
          libelleAction,
          statutRequete,
          requete
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
