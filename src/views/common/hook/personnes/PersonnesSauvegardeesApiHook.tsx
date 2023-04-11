import { getPersonnesSauvegardees } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import {
  IPersonneSauvegardeeDto,
  PersonneSauvegardeeDto
} from "../../../../dto/etatcivil/personne/personnesSauvegardees/IPersonneSauvegardeeDto";

export interface IPersonnesSauvegardeesParams {
  idPersonnes: string[];
}

export function usePersonnesSauvegardeesApiHook(
  params?: IPersonnesSauvegardeesParams
): IPersonneSauvegardeeDto[] {
  const [resultat, setResultat] = useState<IPersonneSauvegardeeDto[]>([]);

  useEffect(() => {
    if (params) {
      getPersonnesSauvegardees(params.idPersonnes)
        .then((result: any) => {
          setResultat(
            result.body.map((data: any) => PersonneSauvegardeeDto.mapping(data))
          );
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les données des personnes sauvegardées.",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
