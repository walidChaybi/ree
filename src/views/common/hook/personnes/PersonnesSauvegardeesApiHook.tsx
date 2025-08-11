import { getPersonnesSauvegardees } from "@api/appels/etatcivilApi";
import { useEffect, useState } from "react";
import {
  IPersonneSauvegardeeDto,
  PersonneSauvegardeeDto
} from "../../../../dto/etatcivil/personne/personnesSauvegardees/IPersonneSauvegardeeDto";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IPersonnesSauvegardeesParams {
  idPersonnes: string[];
}

export function usePersonnesSauvegardeesApiHook(params?: IPersonnesSauvegardeesParams): IPersonneSauvegardeeDto[] | undefined {
  const [resultat, setResultat] = useState<IPersonneSauvegardeeDto[]>();

  useEffect(() => {
    if (params && params.idPersonnes.length > 0) {
      getPersonnesSauvegardees(params.idPersonnes)
        .then((result: any) => {
          setResultat(result.body.map((data: any) => PersonneSauvegardeeDto.mapping(data)));
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les données des personnes sauvegardées.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    } else {
      setResultat([]);
    }
  }, [params]);

  return resultat;
}
