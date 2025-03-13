import { enregistrerMentionsEtAnalyseMarginale } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IEvenementMention {
  jour: string | null;
  mois: string | null;
  annee: string | null;
  ville: string | null;
  arrondissement: string | null;
  departement: string | null;
  pays: string | null;
}

export interface IMentionEnregistree {
  idTypeMention: string;
  texteMention: string;
  numeroOrdre: number;
  evenement?: IEvenementMention;
  estSaisieAssistee?: boolean;
}

export interface IMajAnalyseMarginale {
  nom: string;
  prenoms: string[];
  secable: boolean;
  nomPartie1: string | null;
  nomPartie2: string | null;
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
      enregistrerMentionsEtAnalyseMarginale(params?.idActe, params?.mentions, params?.analyseMarginale)
        .then(reponse => {
          setResultat(reponse.body);
        })
        .catch(error => {
          logError({
            error,
            messageUtilisateur: "Impossible d'enregistrer les mentions."
          });
        });
    }
  }, [params]);

  return resultat;
};
