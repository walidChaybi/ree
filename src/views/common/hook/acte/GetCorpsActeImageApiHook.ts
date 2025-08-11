import { getCorpsActeImage } from "@api/appels/etatcivilApi";
import { IImageActe } from "@model/etatcivil/commun/IImageActe";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IGetCorpsActeImageParams {
  idActe: string;
}

interface IGetCorpsActeImageResultat {
  imageActe?: IImageActe;
  erreur?: string;
}

export const useGetCorpsActeImageApiHook = (params?: IGetCorpsActeImageParams) => {
  const [resultat, setResultat] = useState<IGetCorpsActeImageResultat>();

  useEffect(() => {
    if (params) {
      getCorpsActeImage(params.idActe)
        .then(reponse => {
          setResultat({
            imageActe: reponse.body.data
          });
        })
        .catch(erreurs => {
          const premiereErreur: any | undefined = erreurs?.response?.body?.errors[ZERO];
          if (premiereErreur?.code === CodeErreurFonctionnelle.FCT_AUCUN_ACTE_IMAGE) {
            setResultat({
              erreur: premiereErreur?.message
            });
          } else {
            AfficherMessage.erreur("Impossible d'obtenir les informations de l'acte image.", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          }
        });
    }
  }, [params]);

  return resultat;
};
