import { addAlerteActe } from "@api/appels/etatcivilApi";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { mapAlerteActe } from "./MappingAlertesActe";

export interface AddAlerteActeApiHookParameters {
  idActe: string;
  idTypeAlerte: string;
  complementDescription: string;
  provenanceRequete: string;
}

export function useAddAlerteActeApiHook(
  parameters?: AddAlerteActeApiHookParameters
) {
  const [alerte, setAlerte] = useState<IAlerte>();
  useEffect(() => {
    if (parameters) {
      addAlerteActe(parameters)
        .then((result: any) => {
          const alerteActe = mapAlerteActe(result?.body?.data);
          setAlerte(alerteActe);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Une erreur est survenue lors de l'ajout de l'alerte",
            error
          });
        });
    }
  }, [parameters]);
  return alerte;
}
