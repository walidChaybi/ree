import { getTitulairesActe } from "@api/appels/etatcivilApi";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface GetTitulairesActeHookParameters {
  idActe: string;
  isChecked: boolean;
}

export function useGetTitulairesActeApiHook(parameters?: GetTitulairesActeHookParameters) {
  const [titulaires, setTitulaires] = useState<ITitulaireActe[]>();
  useEffect(() => {
    if (parameters?.idActe && parameters?.isChecked) {
      getTitulairesActe(parameters?.idActe)
        .then((result: any) => {
          setTitulaires(result?.body?.data);
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les titulaires associés à l'acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [parameters]);
  return titulaires;
}
