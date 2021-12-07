import { useEffect, useState } from "react";
import { getPocopas } from "../../../../../../api/appels/etatcivilApi";
import messageManager from "../../../../../common/util/messageManager";
import {
  getLibelle,
  valeurOuUndefined
} from "../../../../../common/util/Utils";

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
        valeurOuUndefined(familleRegistre),
        nombreResultatsMax
      )
        .then((result: any) => {
          setPocopasState(result.body.data);
        })
        .catch((error: any) => {
          messageManager.showErrorAndClose(
            getLibelle(
              "Une erreur est survenu lors de la récupération des pocopas"
            )
          );
        });
    } else {
      setPocopasState([]);
    }
  }, [debutPocopa, familleRegistre, nombreResultatsMax]);

  return pocopasState;
}
