import { getActesInscriptionsSauvegardes } from "@api/appels/etatcivilApi";
import { useEffect, useState } from "react";
import {
  ActeInscriptionSauvegardeDto,
  IActeInscriptionSauvegardeDto
} from "../../../../dto/etatcivil/acte/actesInscriptionsSauvegardes/IActeInscriptionSauvegardeDto";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export function useActesInscriptionsSauvegardesApiHook(
  params?: IActeInscriptionSauvegardeDto[]
): IActeInscriptionSauvegardeDto[] | undefined {
  const [resultat, setResultat] = useState<IActeInscriptionSauvegardeDto[]>();

  useEffect(() => {
    if (params) {
      if (params?.length) {
        getActesInscriptionsSauvegardes(params)
          .then((result: any) => {
            setResultat(result.body.data.map((data: any) => ActeInscriptionSauvegardeDto.mapResultatGetActesInscriptionsSauvegardes(data)));
          })
          .catch((erreurs: any) => {
            AfficherMessage.erreur("Impossible de récupérer les données des actes ou inscriptions sauvegardés.", {
              erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
              fermetureAuto: true
            });
          });
      } else {
        setResultat([]);
      }
    }
  }, [params]);

  return resultat;
}
