import { useEffect, useState } from "react";
import { getAlertesActe } from "../../../../../../api/appels/etatcivilApi";
import { IAlerte } from "../../../../../../model/etatcivil/fiche/IAlerte";
import { mapAlertesActeFromApi } from "../../../../../common/util/AlertesActeUtils";
import { logError } from "../../../../../common/util/LogManager";

export interface AlertesActeApiHookParameters {
  isChecked: boolean;
  idActe: string;
  registre: string;
  alertes: Map<string, IAlerte[]>;
}

export function useAlertesActeApiHook(
  parameters?: AlertesActeApiHookParameters
) {
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  useEffect(() => {
    async function fetchAlertesActe() {
      try {
        if (parameters) {
          const alertesMap = new Map(parameters.alertes);
          if (parameters.isChecked) {
            const result = await getAlertesActe(parameters.idActe);
            const alertesActe = mapAlertesActeFromApi(
              result?.body?.data,
              parameters.idActe,
              parameters.registre
            );
            alertesMap.set(parameters.idActe, alertesActe);
          } else {
            alertesMap.delete(parameters.idActe);
          }
          setAlertes(alertesMap);
        }
      } catch (error) {
        logError({
          messageUtilisateur:
            "Impossible de récupérer les alertes associées à l'acte",
          error
        });
      }
    }
    fetchAlertesActe();
  }, [parameters]);

  return alertes;
}
