import { getMentions } from "@api/appels/etatcivilApi";
import { IMentionDto, Mention } from "@model/etatcivil/acte/mention/Mention";
import { useEffect, useState } from "react";
import { EStatutMention } from "../../../../../model/etatcivil/enum/EStatutMention";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export interface IMentionsParams {
  idActe: string;
  statutMention?: EStatutMention;
}

export interface IMentionsResultat {
  mentions?: Mention[];
}

export function useMentionsApiHook(params?: IMentionsParams) {
  const [mentions, setMentions] = useState<IMentionsResultat>();

  useEffect(() => {
    if (params) {
      getMentions(params.idActe, params.statutMention)
        .then(result => {
          setMentions({
            mentions: (result.body.data as IMentionDto[]).map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null)
          });
        })
        .catch(erreurs => {
          setMentions({ mentions: undefined });
          AfficherMessage.erreur("Impossible de récupérer les mentions pour cet acte", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params]);

  return mentions;
}
