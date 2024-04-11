import { modifierStatutRequeteMiseAJour } from "@api/appels/requeteApi";
import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IModifierStatutRequeteApresSignature } from "@model/requete/IModifierStatutRequeteApresSignature";
import { logError } from "@util/LogManager";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IModifierStatutRequeteMiseAJourParams {
  idRequete: string;
  statutRequete: StatutRequete;
}

export const useModifierStatutRequeteMiseAJourApiHook = (
  params?: IModifierStatutRequeteMiseAJourParams
): IModifierStatutRequeteApresSignature | undefined => {
  const [resultat, setResultat] =
    useState<IModifierStatutRequeteApresSignature>();

  useEffect(() => {
    if (params) {
      modifierStatutRequeteMiseAJour(params.idRequete, params.statutRequete)
        .then(reponse => {
          setResultat({ codeReponse: reponse.status });
        })
        .catch(error => {
          const premiereErreur: any | undefined = JSON.parse(error.message)
            ?.errors[ZERO];
          const erreur: IErreurTraitementApi = {
            code: premiereErreur?.code,
            message: premiereErreur?.message
          };
          setResultat({ codeReponse: error.status, erreur });
          logError({
            messageUtilisateur:
              "Impossible de mettre à jour le statut de la requête",
            error
          });
        });
    }
  }, [params]);

  return resultat;
};
