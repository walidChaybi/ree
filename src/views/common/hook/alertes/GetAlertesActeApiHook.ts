import { getAlertesActe } from "@api/appels/etatcivilApi";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mapAlertesActe } from "./MappingAlertesActe";
export interface IGetAlertesActeApiHookParameters {
  idActe: string;
  isChecked: boolean;
}
export interface IGetAlertesActeApiHookResultat {
  idTypeRegistre: string;
  alertes: IAlerte[];
}

export function useGetAlertesActeApiHook(
  parameters?: IGetAlertesActeApiHookParameters
) {
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
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les alertes associées à l'acte",
            error
          });
        });
    }
  }, [parameters]);
  return resultat;
}
