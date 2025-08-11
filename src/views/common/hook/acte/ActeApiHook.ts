import { getInformationsFicheActe } from "@api/appels/etatcivilApi";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { mapActe } from "../repertoires/MappingRepertoires";

export interface IActeApiHookParams {
  idActe?: string;
  recupereImagesEtTexte?: boolean;
  remplaceIdentiteTitulaireParIdentiteTitulaireAM?: boolean;
}

export interface IActeApiHookResultat {
  acte?: IFicheActe;
}

export function useInformationsActeApiHook(params?: IActeApiHookParams): IActeApiHookResultat | undefined {
  const [acteApiHookResultat, setActeApiHookResultat] = useState<IActeApiHookResultat>();

  useEffect(() => {
    if (params?.idActe) {
      getInformationsFicheActe(params.idActe, params.recupereImagesEtTexte, params.remplaceIdentiteTitulaireParIdentiteTitulaireAM)
        .then((result: any) => {
          const acte: IFicheActe = mapActe(result.body.data);
          setActeApiHookResultat({ acte });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les informations de l'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return acteApiHookResultat;
}
