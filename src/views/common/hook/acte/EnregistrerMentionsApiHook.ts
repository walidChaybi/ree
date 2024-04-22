import { enregistrerMentionsEtAnalyseMarginale } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IMentionEnregistree {
  idTypeMention: string;
  texteMention: string;
  numeroOrdre: number;
}

export interface IMajAnalyseMarginale {
  nom: string;
  prenoms: string[];
  nomPartie1?: string;
  nomPartie2?: string;
  motif: string;
}

export interface IEnregistrerMentionsEtAnalyseMarginaleParams {
  idActe: string;
  mentions: IMentionEnregistree[];
  analyseMarginale?: IMajAnalyseMarginale;
}

export const useEnregistrerMentionsEtAnalyseMarginaleApiHook = (
  params?: IEnregistrerMentionsEtAnalyseMarginaleParams
): string | undefined => {
  const [resultat, setResultat] = useState<string>();

  useEffect(() => {
    if (params) {
      enregistrerMentionsEtAnalyseMarginale(
        params?.idActe,
        params?.mentions,
        params?.analyseMarginale
      )
        .then(reponse => {
          setResultat(reponse.body);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: getLibelle(
              "Impossible d'enregistrer les mentions."
            )
          });
        });
    }
  }, [params]);

  return resultat;
};
