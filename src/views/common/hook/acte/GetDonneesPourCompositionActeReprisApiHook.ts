import { getDonneesPourCompositionActeRepris } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IGetDonneesPourCompositionActeReprisParams {
  idActe: string;
}

interface IGetDonneesPourCompositionActeReprisResultat {
  // Le back renvoie un fichier JSON au format string.
  // C'est cette valeur qu'il faut renvoyer à composition-api.
  acteTexteJson: string;
}

const useGetDonneesPourCompositionActeReprisApiHook = (
  params?: IGetDonneesPourCompositionActeReprisParams
): IGetDonneesPourCompositionActeReprisResultat | undefined => {
  const [resultat, setResultat] =
    useState<IGetDonneesPourCompositionActeReprisResultat>();

  useEffect(() => {
    if (params) {
      getDonneesPourCompositionActeRepris(params.idActe)
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

export default useGetDonneesPourCompositionActeReprisApiHook;
