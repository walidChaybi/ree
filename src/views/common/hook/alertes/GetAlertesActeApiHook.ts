import { getAlertesActe } from "@api/appels/etatcivilApi";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { mapAlertesActe } from "./MappingAlertesActe";
export interface IGetAlertesActeApiHookParameters {
  idActe: string;
  isChecked: boolean;
}
interface IGetAlertesActeApiHookResultat {
  idTypeRegistre: string;
  alertes: IAlerte[];
}

export const useGetAlertesActeApiHook = (parameters?: IGetAlertesActeApiHookParameters) => {
  const [resultat, setResultat] = useState<IGetAlertesActeApiHookResultat>();
  useEffect(() => {
    if (parameters?.idActe && parameters?.isChecked) {
      getAlertesActe(parameters?.idActe)
        .then((result: any) => {
          setResultat({
            alertes: mapAlertesActe(result?.body?.data.alertes),
            idTypeRegistre: result?.body?.data.idTypeRegistre
          });
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les alertes associées à l'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [parameters]);
  return resultat;
};
