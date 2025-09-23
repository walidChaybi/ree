import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IMentionAffichage, mappingVersMentionsApi, modificationEffectuee } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { IDocumentReponse, documentDejaCree } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { useEffect, useState } from "react";
import { IGenerationECParams, useGenerationEC } from "../../generation/generationECHook/generationECHook";
import { IMentionsResultat } from "./MentionsApiHook";
import { IMiseAJourDocumentMentionParams, useMiseAJourDocumentMentionApiHook } from "./MiseAJourDocumentMentionApiHook";
import { IMiseAJourMentionsParams, useMiseAJourMentionsApiHook } from "./MiseAJourMentionsApiHook";

export interface SauvegarderMentionsParam {
  mentionsApi: IMentionsResultat;
  mentions: IMentionAffichage[];
  acte: FicheActe;
  document: IDocumentReponse;
  requete: IRequeteDelivrance;
}

interface IResultatSauvegarderMentions {
  mentionsRetirees: string[];
  idDoc: string;
}

export function useSauvegarderMentions(params?: SauvegarderMentionsParam) {
  const [mentionsAEnvoyerParams, setMentionsAEnvoyerParams] = useState<IMiseAJourMentionsParams>();
  const [documentMajParams, setDocumentMajParams] = useState<IMiseAJourDocumentMentionParams>();
  const [resultat, setResultat] = useState<IResultatSauvegarderMentions>();
  const [generationEC, setGenerationEC] = useState<IGenerationECParams>();
  const [mentionsRetireesSaved, setMentionsRetireesSaved] = useState<string[]>();

  // Maj mentions dans etatcivil-api
  const resultatMiseAjourMentions = useMiseAJourMentionsApiHook(mentionsAEnvoyerParams);

  // Maj des mentions retirées dans requete-api
  const resultatMajDocReponseAvecMentionRetirees = useMiseAJourDocumentMentionApiHook(documentMajParams);

  // Génération du document réponse dans requete-api
  const resultatGenerationEC = useGenerationEC(generationEC);

  // 1 - Sauvegarder les mentions dans etatcivil-api
  useEffect(() => {
    if (!params) return;

    sauvegarderEnFonctionTypeDocument(params, setMentionsAEnvoyerParams, setDocumentMajParams, setMentionsRetireesSaved, setGenerationEC);
  }, [params]);

  // 2 - Générer le document et changer le statut de la requête si des mentions ont été modifiées
  useEffect(() => {
    if (resultatMiseAjourMentions && params?.document.validation && params.requete.choixDelivrance && mentionsRetireesSaved) {
      setGenerationEC({
        idActe: params.acte.id,
        requete: params.requete,
        pasDAction: documentDejaCree(params.requete.documentsReponses, params.requete.choixDelivrance),
        mentionsRetirees: mentionsRetireesSaved,
        choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(params.document.typeDocument)
      });
    }
  }, [resultatMiseAjourMentions, params, mentionsRetireesSaved]);

  // Maj du résultat retourné par le hook
  useEffect(() => {
    if (!params || !mentionsRetireesSaved || !(resultatMajDocReponseAvecMentionRetirees || resultatGenerationEC)) return;

    const idDoc = resultatGenerationEC?.resultGenerationUnDocument?.idDocumentReponse ?? params.document.id;

    setResultat({
      idDoc,
      mentionsRetirees: mentionsRetireesSaved
    });
  }, [resultatMajDocReponseAvecMentionRetirees, resultatGenerationEC]);

  return resultat;
}

function sauvegarderEnFonctionTypeDocument(
  params: SauvegarderMentionsParam,
  setMentionsAEnvoyerParams: any,
  setDocumentMajParams: any,
  setMentionsRetireesSaved: any,
  setGenerationEC: any
) {
  if (params.mentionsApi?.mentions && params.acte.id) {
    const { mentionsAEnvoyer, mentionsRetirees } = mappingVersMentionsApi(
      params.mentionsApi.mentions,
      params.mentions,
      params.document.typeDocument
    );
    setMentionsRetireesSaved(mentionsRetirees);
    if (modificationEffectuee(params.mentions, params.mentionsApi.mentions, params.document, params.acte.nature)) {
      if (!DocumentDelivrance.estCopieIntegrale(params.document?.typeDocument)) {
        setMentionsAEnvoyerParams({
          idActe: params.acte.id,
          mentions: mentionsAEnvoyer
        });
      } else {
        setGenerationEC({
          idActe: params.acte.id,
          requete: params.requete,
          validation: EValidation.O,
          pasDAction: documentDejaCree(params.requete.documentsReponses, params.requete.choixDelivrance),
          mentionsRetirees,
          choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(params.document.typeDocument)
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
