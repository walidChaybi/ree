import { getTitulairesActe } from "@api/appels/etatcivilApi";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface GetTitulairesActeHookParameters {
  idActe: string;
  isChecked: boolean;
}

export function useGetTitulairesActeApiHook(
  parameters?: GetTitulairesActeHookParameters
) {
  const [titulaires, setTitulaires] = useState<ITitulaireActe[]>();
  useEffect(() => {
    if (parameters?.idActe && parameters?.isChecked) {
      getTitulairesActe(parameters?.idActe)
        .then((result: any) => {
          setTitulaires(result?.body?.data);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les titulaires associés à l'acte",
            error
          });
        });
    }
  }, [parameters]);
  return titulaires;
}
