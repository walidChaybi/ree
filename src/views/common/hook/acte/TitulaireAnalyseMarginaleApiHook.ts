import { getTitulaireAnalyseMarginalByIdActe } from "@api/appels/etatcivilApi";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IAnalyseMarginaleResultat {
  idActe: string;
  nom: string;
  prenoms: string[];
}

export function useTitulaireAnalyseMarginaleApiHook(identifiantsActes: string[]): IAnalyseMarginaleResultat[] {
  const [resultat, setResultat] = useState<IAnalyseMarginaleResultat[]>([]);

  useEffect(() => {
    if (identifiantsActes.length > 0) {
      getTitulaireAnalyseMarginalByIdActe(identifiantsActes)
        .then(res => {
          setResultat(res.body.data.map((data: any) => mapAnalyseMarginale(data)));
        })
        .catch((erreurs: any) => {
          AfficherMessage.erreur("Impossible de récupérer les informations d'état civil du titulaire.", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
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
