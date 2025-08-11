import { postCorpsTexte } from "@api/appels/etatcivilApi";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../utils/AfficherMessage";

export interface IModifierCorpsExtraitParams {
  idActe: string;
  corpsTexteModifie: string;
  type: TypeExtrait;
}

interface IModifierCorpsExtraitResultat {
  resultat: boolean;
}

export function useModifierCorpsExtrait(params?: IModifierCorpsExtraitParams) {
  const [resultat, setResultat] = useState<IModifierCorpsExtraitResultat>();

  useEffect(() => {
    if (params) {
      postCorpsTexte(params.idActe, params.corpsTexteModifie, params.type)
        .then(() => {
          setResultat({ resultat: true });
        })
        .catch(erreurs => {
          /* istanbul ignore next */
          setResultat({ resultat: false });
          AfficherMessage.erreur("Impossible de mettre à jour le corps du texte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return resultat;
}
