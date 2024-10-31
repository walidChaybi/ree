import {
  getPocopasOuvertsOuFermerParFamille,
  getPocopasParFamille
} from "@api/appels/etatcivilApi";
import messageManager from "@util/messageManager";
import { estRenseigne, getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export function useRecherchePocopa(
  debutPocopa: string,
  familleRegistre: string,
  nombreResultatsMax: number,
  estOuvert: boolean | undefined
) {
  const [pocopasState, setPocopasState] = useState<string[]>();

  useEffect(() => {
    const fetchPocopas = async () => {
      let pocopas: any;
      if (debutPocopa) {
        try {
          if (estRenseigne(estOuvert)) {
            pocopas = await getPocopasOuvertsOuFermerParFamille(
              debutPocopa,
              getValeurOuUndefined(familleRegistre),
              nombreResultatsMax,
              estOuvert
            );
          } else {
            pocopas = await getPocopasParFamille(
              debutPocopa,
              getValeurOuUndefined(familleRegistre),
              nombreResultatsMax
            );
          }
        } catch (error) {
          messageManager.showErrorAndClose("Une erreur est survenue lors de la récupération des pocopas");
        }
        setPocopasState(pocopas.body.data);
      } else {
        setPocopasState([]);
      }
    };

    fetchPocopas();
  }, [debutPocopa, familleRegistre, nombreResultatsMax, estOuvert]);

  return pocopasState;
}
