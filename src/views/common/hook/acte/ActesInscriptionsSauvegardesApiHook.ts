import { getActesInscriptionsSauvegardes } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import {
  ActeInscriptionSauvegardeDto,
  IActeInscriptionSauvegardeDto
} from "../../../../dto/etatcivil/acte/actesInscriptionsSauvegardes/IActeInscriptionSauvegardeDto";

export function useActesInscriptionsSauvegardesApiHook(
  params?: IActeInscriptionSauvegardeDto[]
): IActeInscriptionSauvegardeDto[] | undefined {
  const [resultat, setResultat] = useState<IActeInscriptionSauvegardeDto[]>();

  useEffect(() => {
    if (params) {
      if (params?.length) {
        getActesInscriptionsSauvegardes(params)
          .then((result: any) => {
            setResultat(
              result.body.data.map((data: any) =>
                ActeInscriptionSauvegardeDto.mapResultatGetActesInscriptionsSauvegardes(
                  data
                )
              )
            );
          })
          .catch((error: any) => {
            logError({
              messageUtilisateur:
                "Impossible de récupérer les données des actes ou inscriptions sauvegardés.",
              error
            });
          });
      } else {
        setResultat([]);
      }
    }
  }, [params]);

  return resultat;
}
