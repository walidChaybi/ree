import { useEffect, useState } from "react";
import { getImagesDeLActe } from "../../../../api/appels/etatcivilApi";
import { logError } from "../../util/LogManager";

export interface IGetImagesDeLActeParams {
  idActe?: string;
}

export interface IGetImagesDeLActeResultat {
  imagesBase64: string[];
}

export function useGetImagesDeLActe(
  params?: IGetImagesDeLActeParams
): IGetImagesDeLActeResultat | undefined {
  const [resultat, setResultat] = useState<IGetImagesDeLActeResultat>();

  useEffect(() => {
    if (params?.idActe) {
      getImagesDeLActe(params.idActe)
        .then((result: any) => {
          setResultat({ imagesBase64: result.body.data });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible de récupérer les images de l'acte",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
