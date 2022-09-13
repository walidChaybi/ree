import { postCorpsTexte } from "@api/appels/etatcivilApi";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export interface IModifierCorpsExtraitParams {
  idActe: string;
  corpsTexteModifie: string;
  type: TypeExtrait;
}

export interface IModifierCorpsExtraitResultat {
  resultat: boolean;
}

export function useModifierCorpsExtrait(params?: IModifierCorpsExtraitParams) {
  const [resultat, setResultat] = useState<IModifierCorpsExtraitResultat>();

  useEffect(() => {
    if (params) {
      postCorpsTexte(params.idActe, params.corpsTexteModifie, params.type)
        .then(result => {
          setResultat({ resultat: true });
        })
        .catch(error => {
          /* istanbul ignore next */
          setResultat({ resultat: false });
          logError({
            messageUtilisateur: "Impossible de mettre à jour le corps du texte",
            error
          });
        });
    }
  }, [params]);

  return resultat;
}
