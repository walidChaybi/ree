import { useEffect, useState } from "react";
import { IMention } from "../../../../../model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import {
  IMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectue
} from "../../../../pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { getValeurOuVide } from "../../../util/Utils";
import { IMentionsResultat } from "./MentionsApiHook";
import {
  IMiseAJourDocumentMentionParams,
  useMiseAJourDocumentMentionApiHook
} from "./MiseAJourDocumentMentionApiHook";
import {
  IMiseAJourMentionsParams,
  useMiseAJourMentionsApiHook
} from "./MiseAJourMentionsApiHook";

export interface SauvegarderMentionsParam {
  mentionsApi?: IMentionsResultat;
  mentions?: IMentionAffichage[];
  idActe?: string;
  document?: IDocumentReponse;
}

export function useSauvegarderMentions(param?: SauvegarderMentionsParam) {
  const [mentionsAEnvoyerParams, setMentionsAEnvoyerParams] =
    useState<IMiseAJourMentionsParams>();
  const [documentMajParams, setDocumentMajParams] =
    useState<IMiseAJourDocumentMentionParams>();
  const [resultat, setResultat] = useState<boolean>(false);

  const mentionsMisAJour = useMiseAJourMentionsApiHook(mentionsAEnvoyerParams);
  const documentEstMisAJour =
    useMiseAJourDocumentMentionApiHook(documentMajParams);

  useEffect(() => {
    if (
      param &&
      param.mentionsApi &&
      param.mentionsApi.mentions &&
      param.mentions &&
      param.document
    ) {
      sauvegarderEnFonctionTypeDocument(
        param.mentionsApi.mentions,
        param.mentions,
        param.document,
        setMentionsAEnvoyerParams,
        setDocumentMajParams,
        param.idActe
      );
    }
  }, [param]);

  useEffect(() => {
    if (
      mentionsAEnvoyerParams &&
      mentionsMisAJour?.resultat &&
      documentEstMisAJour?.resultat
    ) {
      setResultat(true);
    } else if (documentEstMisAJour?.resultat) {
      setResultat(true);
    }
  }, [mentionsMisAJour, documentEstMisAJour, mentionsAEnvoyerParams]);

  return resultat;
}

function sauvegarderEnFonctionTypeDocument(
  mentionsApi: IMention[],
  mentions: IMentionAffichage[],
  document: IDocumentReponse,
  setMentionsAEnvoyerParams: any,
  setDocumentMajParams: any,
  idActe?: string
) {
  const { mentionsAEnvoyer, mentionsRetirees } = mappingVersMentionsApi(
    mentionsApi,
    mentions
  );
  if (modificationEffectue(mentions, mentionsApi, document)) {
    if (!DocumentDelivrance.typeDocumentEstCopie(document?.typeDocument)) {
      setMentionsAEnvoyerParams({
        idActe: getValeurOuVide(idActe),
        mentions: mentionsAEnvoyer
      });
    }
    setDocumentMajParams({
      idDocument: document?.id,
      mentionsRetirees
    });
  } else {
    setDocumentMajParams({
      idDocument: document?.id
    });
  }
}

