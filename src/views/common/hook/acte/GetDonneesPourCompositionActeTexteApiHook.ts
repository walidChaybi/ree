import { getDonneesPourCompositionActeTexte } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IGetDonneesPourCompositionActeTexteParams {
  idActe: string;
}

interface IGetDonneesPourCompositionActeTexteResultat {
  // Le back renvoie un fichier JSON au format string.
  // C'est cette valeur qu'il faut renvoyer à composition-api.
  acteTexteJson: string;
}

const useGetDonneesPourCompositionActeTexteApiHook = (
  params?: IGetDonneesPourCompositionActeTexteParams
): IGetDonneesPourCompositionActeTexteResultat | undefined => {
  const [resultat, setResultat] =
    useState<IGetDonneesPourCompositionActeTexteResultat>();

  useEffect(() => {
    if (params) {
      getDonneesPourCompositionActeTexte(params.idActe)
        .then(reponse => {
          setResultat({
            acteTexteJson: reponse.body
          });
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur:
              "Une erreur est survenue lors de la récupération de l'acte texte."
          });
        });
    }
  }, [params]);

  return resultat;
};

export default useGetDonneesPourCompositionActeTexteApiHook;
