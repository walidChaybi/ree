import { useEffect, useState } from "react";
import { getInformationsFicheActe } from "../../../../api/appels/etatcivilApi";
import { IFicheActe } from "../../../../model/etatcivil/acte/IFicheActe";
import { logError } from "../../util/LogManager";
import { mapActe } from "./MappingRepertoires";

export interface IActeApiHookParams {
  idActe?: string;
}

export interface IActeApiHookResultat {
  acte?: IFicheActe;
}

export function useInformationsActeApiHook(
  params?: IActeApiHookParams
): IActeApiHookResultat | undefined {
  const [acteApiHookResultat, setActeApiHookResultat] = useState<
    IActeApiHookResultat
  >();

  useEffect(() => {
    if (params?.idActe) {
      getInformationsFicheActe(params.idActe)
        .then((result: any) => {
          const acte: IFicheActe = mapActe(result.body.data);
          setActeApiHookResultat({ acte });
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations de l'acte",
            error
          });
        });
    }
  }, [params]);

  return acteApiHookResultat;
}
