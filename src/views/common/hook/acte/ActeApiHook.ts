import { getInformationsFicheActe } from "@api/appels/etatcivilApi";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mapActe } from "../repertoires/MappingRepertoires";

export interface IActeApiHookParams {
  idActe?: string;
  recupereImagesEtTexte?: boolean;
  isConsultation?: boolean;
  remplaceIdentiteTitulaireParIdentiteTitulaireAM?: boolean;
}

export interface IActeApiHookResultat {
  acte?: IFicheActe;
}

export function useInformationsActeApiHook(
  params?: IActeApiHookParams
): IActeApiHookResultat | undefined {
  const [acteApiHookResultat, setActeApiHookResultat] =
    useState<IActeApiHookResultat>();

  useEffect(() => {
    if (params?.idActe) {
      getInformationsFicheActe(
        params.idActe,
        params.recupereImagesEtTexte,
        params.isConsultation,
        params.remplaceIdentiteTitulaireParIdentiteTitulaireAM
      )
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
