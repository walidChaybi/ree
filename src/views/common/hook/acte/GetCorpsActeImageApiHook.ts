import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getCorpsActeImage } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getLibelle, ZERO } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IGetCorpsActeImageParams {
  idActe: string;
}

export interface IGetCorpsActeImageResultat {
  contenuBlob?: Blob;
  erreur?: string;
}

export const useGetCorpsActeImageApiHook = (params?: IGetCorpsActeImageParams) => {
  const [resultat, setResultat] = useState<IGetCorpsActeImageResultat>();

  useEffect(() => {
    if (params) {
      getCorpsActeImage(params.idActe)
        .then(reponse => {
          setResultat(
            reponse.body.size === ZERO
              ? {
                  erreur: getLibelle(
                    "La visualisation de l'acte image n'est pas disponible"
                  )
                }
              : {
                  contenuBlob: reponse.body
                }
          );
        })
        .catch(error => {
          if (error?.response.status === HTTP_NOT_FOUND) {
            setResultat({
              erreur: getLibelle(
                "La visualisation de l'acte image n'est pas disponible"
              )
            });
          } else {
            logError({
              error,
              messageUtilisateur: getLibelle(
                "Impossible d'obtenir les informations de l'acte image."
              )
            });
          }
        });
    }
  }, [params]);

  return resultat;
};
