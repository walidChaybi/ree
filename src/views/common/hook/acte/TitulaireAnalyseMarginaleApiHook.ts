import { getTitulaireAnalyseMarginalByIdActe } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IAnalyseMarginaleResultat {
  idActe: string;
  nom: string;
  prenoms: string[];
}

export function useTitulaireAnalyseMarginaleApiHook(
  identifiantsActes: string[]
): IAnalyseMarginaleResultat[] {
  const [resultat, setResultat] = useState<IAnalyseMarginaleResultat[]>([]);

  useEffect(() => {
    if (identifiantsActes.length > 0) {
      getTitulaireAnalyseMarginalByIdActe(identifiantsActes)
        .then(res => {
          setResultat(
            res.body.data.map((data: any) => mapAnalyseMarginale(data))
          );
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur:
              "Impossible de récupérer les informations d'état civil du titulaire.",
            error
          });
        });
    }
  }, [identifiantsActes]);

  return resultat;
}

const mapAnalyseMarginale = (data: any): IAnalyseMarginaleResultat => {
  return {
    idActe: getValeurOuUndefined(data.idActe),
    nom: getValeurOuUndefined(data.nom),
    prenoms: getValeurOuUndefined(data.prenoms)
  };
};
