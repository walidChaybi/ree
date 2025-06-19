import { getCorpsActeImage } from "@api/appels/etatcivilApi";
import { IImageActe } from "@model/etatcivil/commun/IImageActe";
import { CodeErreurFonctionnelle } from "@model/requete/CodeErreurFonctionnelle";
import { logError } from "@util/LogManager";
import { ZERO } from "@util/Utils";
import { useEffect, useState } from "react";

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
        .catch(error => {
          const premiereErreur: any | undefined = error?.response?.body?.errors[ZERO];
          if (premiereErreur?.code === CodeErreurFonctionnelle.FCT_AUCUN_ACTE_IMAGE) {
            setResultat({
              erreur: premiereErreur?.message
            });
          } else {
            logError({
              error,
              messageUtilisateur: "Impossible d'obtenir les informations de l'acte image."
            });
          }
        });
    }
  }, [params]);

  return resultat;
};
