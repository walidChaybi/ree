import { useEffect, useState } from "react";
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

export interface IResultatSauvegarderMentions {
  mentionsRetirees: string[];
  idDoc: string;
}

export function useSauvegarderMentions(params?: SauvegarderMentionsParam) {
  const [mentionsAEnvoyerParams, setMentionsAEnvoyerParams] =
    useState<IMiseAJourMentionsParams>();
  const [documentMajParams, setDocumentMajParams] =
    useState<IMiseAJourDocumentMentionParams>();
  const [resultat, setResultat] = useState<IResultatSauvegarderMentions>();
  const [generationEC, setGenerationEC] = useState<IGenerationECParams>();
  const [mentionsRetireesSaved, setMentionsRetireesSaved] =
    useState<string[]>();

  const mentionsMisAJour = useMiseAJourMentionsApiHook(mentionsAEnvoyerParams);
  const documentEstMisAJour =
    useMiseAJourDocumentMentionApiHook(documentMajParams);
  const nouveauDoc = useGenerationEC(generationEC);

  // 1 - Sauvegarder les mentions dans etatcivil-api
  useEffect(() => {
    if (params) {
      sauvegarderEnFonctionTypeDocument(
        params,
        setMentionsAEnvoyerParams,
        setDocumentMajParams,
        setMentionsRetireesSaved,
        setGenerationEC
      );
    }
  }, [params]);

  // 2 - Générer le document et changer le statut de la requête
  useEffect(() => {
    if (
      mentionsMisAJour &&
      params &&
      params.document.validation &&
      params.requete.choixDelivrance &&
      mentionsRetireesSaved
    ) {
      setGenerationEC({
        idActe: params.idActe,
        requete: params.requete,
        validation: params.document.validation,
        pasDeStockageDocument: false,
        mentionsRetirees: mentionsRetireesSaved
      });
    }
  }, [mentionsMisAJour, params, mentionsRetireesSaved]);

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
      nouveauDoc?.resultGenerationUnDocument?.idDocumentReponse &&
      documentEstMisAJour?.resultat &&
      mentionsRetireesSaved
    ) {
      setResultat({
        idDoc: nouveauDoc.resultGenerationUnDocument?.idDocumentReponse,
        mentionsRetirees: mentionsRetireesSaved
      });
    } else if (
      documentEstMisAJour?.resultat &&
      params?.document &&
      mentionsRetireesSaved
    ) {
      setResultat({
        idDoc: params.document.id,
        mentionsRetirees: mentionsRetireesSaved
      });
    }
  }, [
    documentEstMisAJour,
    mentionsAEnvoyerParams,
    nouveauDoc,
    params,
    mentionsRetireesSaved
  ]);

  return resultat;
}

function sauvegarderEnFonctionTypeDocument(
  params: SauvegarderMentionsParam,
  setMentionsAEnvoyerParams: any,
  setDocumentMajParams: any,
  setMentionsRetireesSaved: any,
  setGenerationEC: any
) {
  if (params.mentionsApi.mentions && params.idActe) {
    const { mentionsAEnvoyer, mentionsRetirees } = mappingVersMentionsApi(
      params.mentionsApi.mentions,
      params.mentions
    );
    setMentionsRetireesSaved(mentionsRetirees);
    if (
      modificationEffectue(
        params.mentions,
        params.mentionsApi.mentions,
        params.document
      )
    ) {
      if (
        !DocumentDelivrance.typeDocumentEstCopieIntegrale(
          params.document?.typeDocument
        )
      ) {
        setMentionsAEnvoyerParams({
          idActe: getValeurOuVide(params.idActe),
          mentions: mentionsAEnvoyer
        });
      } else {
        setGenerationEC({
          idActe: params.idActe,
          requete: params.requete,
          choixDelivrance: params.requete.choixDelivrance,
          validation: params.document.validation,
          pasDeStockageDocument: false,
          mentionsRetirees
        });
      }
    } else {
      setDocumentMajParams({
        idDocument: params.document?.id,
        mentionsRetirees
      });
    }
  }
}
