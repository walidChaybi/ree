import { enregistrerMentions } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { useEffect, useState } from "react";

export interface IMentionEnregistree {
  idTypeMention: string;
  texteMention: string;
  numeroOrdre: number;
}

export interface IEnregistrerMentionsParams {
  idActe: string;
  mentions: IMentionEnregistree[];
}

export const useEnregistrerMentionsApiHook = (
  params?: IEnregistrerMentionsParams
): string | undefined => {
  const [resultat, setResultat] = useState<string>();

  useEffect(() => {
    if (params) {
      enregistrerMentions(params?.idActe, params?.mentions)
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
