import { postMentions } from "@api/appels/etatcivilApi";
import { ITexteMention } from "@model/etatcivil/acte/mention/ITexteMention";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export interface IMiseAJourMentionsParams {
  idActe: string;
  mentions?: IMentionMiseAJourDto[];
}

export interface IMentionMiseAJourDto {
  id?: string;
  numeroOrdreExtrait: number;
  textes: ITexteMention;

  typeMention: {
    idTypeMention?: string;
    idNatureMention?: string;
  };
}

export interface IMiseAJourMentionsResultat {
  resultat?: boolean;
}

export function useMiseAJourMentionsApiHook(params?: IMiseAJourMentionsParams) {
  const [fini, setFini] = useState<IMiseAJourMentionsResultat>();

  useEffect(() => {
    if (!params?.mentions?.length) return;

    postMentions(params.idActe, params.mentions)
      .then(_ => {
        setFini({ resultat: true });
      })
      .catch(erreurs => {
        setFini({ resultat: false });
        AfficherMessage.erreur("Impossible de mettre à jour les mentions de cet acte ", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
          fermetureAuto: true
        });
      });
  }, [params]);

  return fini;
}
