import { addAlerteActe } from "@api/appels/etatcivilApi";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";
import { mapAlerteActe } from "./MappingAlertesActe";

export interface AddAlerteActeApiHookParameters {
  idActe: string;
  idTypeAlerte: string;
  complementDescription: string;
}

export function useAddAlerteActeApiHook(parameters?: AddAlerteActeApiHookParameters) {
  const [alerte, setAlerte] = useState<IAlerte>();
  useEffect(() => {
    if (parameters) {
      addAlerteActe(parameters)
        .then((result: any) => {
          const alerteActe = mapAlerteActe(result?.body?.data);
          setAlerte(alerteActe);
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Une erreur est survenue lors de l'ajout de l'alerte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [parameters]);
  return alerte;
}
