import { useEffect, useState } from "react";
import { IMention } from "../../../../../model/etatcivil/acte/mention/IMention";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import {
  IMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectue
} from "../../../../pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { getValeurOuVide } from "../../../util/Utils";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../generation/generationECHook/generationECHook";
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
  mentionsApi: IMentionsResultat;
  mentions: IMentionAffichage[];
  idActe: string;
  document: IDocumentReponse;
  requete: IRequeteDelivrance;
}

export function useSauvegarderMentions(params?: SauvegarderMentionsParam) {
  const [mentionsAEnvoyerParams, setMentionsAEnvoyerParams] =
    useState<IMiseAJourMentionsParams>();
  const [documentMajParams, setDocumentMajParams] =
    useState<IMiseAJourDocumentMentionParams>();
  const [resultat, setResultat] = useState<string>();
  const [generationEC, setGenerationEC] = useState<IGenerationECParams>();
  const [mentionsRetireesSaved, setMentionsRetireesSaved] =
    useState<string[]>();

  const mentionsMisAJour = useMiseAJourMentionsApiHook(mentionsAEnvoyerParams);
  const documentEstMisAJour =
    useMiseAJourDocumentMentionApiHook(documentMajParams);
  const nouveauDoc = useGenerationEC(generationEC);

  // 1 - Sauvegarder les mentions dans etatcivil-api
  useEffect(() => {
    if (params?.mentionsApi.mentions) {
      sauvegarderEnFonctionTypeDocument(
        params.mentionsApi.mentions,
        params.mentions,
        params.document,
        setMentionsAEnvoyerParams,
        setDocumentMajParams,
        setMentionsRetireesSaved,
        params.idActe
      );
    }
  }, [params]);

  // 2 - Générer le document et changer le statut de la requête
  useEffect(() => {
    if (
      mentionsMisAJour &&
      params &&
      params.document.validation &&
      params.requete.choixDelivrance
    ) {
      setGenerationEC({
        idActe: params.idActe,
        requete: params.requete,
        choixDelivrance: params.requete.choixDelivrance,
        validation: params.document.validation,
        pasDeStockageDocument: false,
        mentionsRetirees: params.document.mentionsRetirees
          ? params.document.mentionsRetirees.map(el => el.idMention)
          : []
      });
    }
  }, [mentionsMisAJour, params]);

  // 3 - Sauvegarder les mentions retirées et valider le document dans requete-api
  useEffect(() => {
    if (
      nouveauDoc &&
      nouveauDoc.resultGenerationUnDocument?.idDocumentReponse &&
      params &&
      mentionsRetireesSaved
    ) {
      setDocumentMajParams({
        idDocument: nouveauDoc.resultGenerationUnDocument?.idDocumentReponse,
        mentionsRetirees: mentionsRetireesSaved
      });
    }
  }, [nouveauDoc, mentionsRetireesSaved, params]);

  useEffect(() => {
    if (
      mentionsMisAJour?.resultat &&
      nouveauDoc &&
      documentEstMisAJour?.resultat
    ) {
      setResultat(nouveauDoc.resultGenerationUnDocument?.idDocumentReponse);
    } else if (documentEstMisAJour?.resultat) {
      setResultat(params?.document.id);
    }
  }, [
    mentionsMisAJour,
    documentEstMisAJour,
    mentionsAEnvoyerParams,
    nouveauDoc,
    params
  ]);

  return resultat;
}

function sauvegarderEnFonctionTypeDocument(
  mentionsApi: IMention[],
  mentions: IMentionAffichage[],
  document: IDocumentReponse,
  setMentionsAEnvoyerParams: any,
  setDocumentMajParams: any,
  setMentionsRetireesSaved: any,
  idActe?: string
) {
  const { mentionsAEnvoyer, mentionsRetirees } = mappingVersMentionsApi(
    mentionsApi,
    mentions
  );
  setMentionsRetireesSaved(mentionsRetirees);
  if (modificationEffectue(mentions, mentionsApi, document)) {
    if (!DocumentDelivrance.typeDocumentEstCopie(document?.typeDocument)) {
      setMentionsAEnvoyerParams({
        idActe: getValeurOuVide(idActe),
        mentions: mentionsAEnvoyer
      });
    }else {
      setDocumentMajParams({
        idDocument: document?.id,
        mentionsRetirees
      });
    }
  } else {
    setDocumentMajParams({
      idDocument: document?.id,
      mentionsRetirees
    });
  }
}
