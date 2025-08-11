import { IErreurTraitementApi } from "@api/IErreurTraitementApi";
import { getDonneesPourCompositionActeTexte } from "@api/appels/etatcivilApi";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IGetDonneesPourCompositionActeTexteParams {
  idActe: string;
}

interface IGetDonneesPourCompositionActeTexteResultat {
  // Le back renvoie un fichier JSON au format string.
  // C'est cette valeur qu'il faut renvoyer à composition-api.
  acteTexteJson: string;
  erreur?: IErreurTraitementApi;
}

const useGetDonneesPourCompositionActeTexteApiHook = (
  params?: IGetDonneesPourCompositionActeTexteParams
): IGetDonneesPourCompositionActeTexteResultat | undefined => {
  const [resultat, setResultat] = useState<IGetDonneesPourCompositionActeTexteResultat>();

  useEffect(() => {
    if (params) {
      getDonneesPourCompositionActeTexte(params.idActe)
        .then(reponse => {
          setResultat({
            acteTexteJson: reponse.body
          });
        })
        .catch(erreurs => {
          const premiereErreur: any | undefined = erreurs?.response?.body?.errors[ZERO];
          const erreur: IErreurTraitementApi = {
            code: premiereErreur?.code,
            message: premiereErreur?.message
          };
          if (erreur.code === CodeErreurFonctionnelle.FCT_ACTE_SANS_CORPS_TEXTE) {
            setResultat({ acteTexteJson: "", erreur });
          } else {
            AfficherMessage.erreur("Une erreur est survenue lors de la récupération de l'acte texte.", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          }
        });
    }
  }, [params]);

  return resultat;
};

export default useGetDonneesPourCompositionActeTexteApiHook;
