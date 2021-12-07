import { useEffect, useState } from "react";
import { getAlertesActe } from "../../../../api/appels/etatcivilApi";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { logError } from "../../util/LogManager";
import { mapAlertesActe } from "./MappingAlertesActe";

export interface GetAlertesActeApiHookParameters {
  idActe: string;
  isChecked: boolean;
}

export function useGetAlertesActeApiHook(
  parameters?: GetAlertesActeApiHookParameters
) {
  const [alertes, setAlertes] = useState<IAlerte[]>();
  useEffect(() => {
    if (parameters?.idActe && parameters?.isChecked) {
      getAlertesActe(parameters?.idActe)
        .then((result: any) => {
          setAlertes(mapAlertesActe(result?.body?.data));
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
  return alertes;
}
