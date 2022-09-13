import { getNbrTitulairesActe } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface GetNbrTitulairesActeHookParameters {
  idActe: string;
  isChecked: boolean;
}

export function useGetNbrTitulairesActeApiHook(
  parameters?: GetNbrTitulairesActeHookParameters
) {
  const [nbrTitulaires, setNbrTitulaires] = useState<number>();
  useEffect(() => {
    if (parameters?.idActe && parameters?.isChecked) {
      getNbrTitulairesActe(parameters?.idActe)
        .then((result: any) => {
          setNbrTitulaires(result?.body?.data);
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer le nombre de titulaire associé à l'acte",
            error
          });
        });
    }
  }, [parameters]);
  return nbrTitulaires;
}
