import { getPocopas } from "@api/appels/etatcivilApi";
import messageManager from "@util/messageManager";
import { getLibelle, getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export function useRecherchePocopa(
  debutPocopa: string,
  familleRegistre: string,
  nombreResultatsMax: number
) {
  const [pocopasState, setPocopasState] = useState<string[]>();

  useEffect(() => {
    if (debutPocopa) {
      getPocopas(
        debutPocopa,
        getValeurOuUndefined(familleRegistre),
        nombreResultatsMax
      )
        .then((result: any) => {
          setPocopasState(result.body.data);
        })
        .catch((error: any) => {
          messageManager.showErrorAndClose(
            getLibelle(
              "Une erreur est survenue lors de la récupération des pocopas"
            )
          );
        });
    } else {
      setPocopasState([]);
    }
  }, [debutPocopa, familleRegistre, nombreResultatsMax]);

  return pocopasState;
}
