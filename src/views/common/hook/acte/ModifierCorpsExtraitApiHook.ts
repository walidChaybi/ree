import { postCorpsTexte } from "@api/appels/etatcivilApi";
import { ETypeExtrait } from "@model/etatcivil/enum/ETypeExtrait";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IModifierCorpsExtraitParams {
  idActe: string;
  corpsTexteModifie: string;
  type: keyof typeof ETypeExtrait;
}

interface IModifierCorpsExtraitResultat {
  resultat: boolean;
}

export const useModifierCorpsExtrait = (params?: IModifierCorpsExtraitParams) => {
  const [resultat, setResultat] = useState<IModifierCorpsExtraitResultat>();

  useEffect(() => {
    if (params) {
      postCorpsTexte(params.idActe, params.corpsTexteModifie, params.type)
        .then(() => {
          setResultat({ resultat: true });
        })
        .catch(erreurs => {
          setResultat({ resultat: false });
          AfficherMessage.erreur("Impossible de mettre à jour le corps du texte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return resultat;
};
