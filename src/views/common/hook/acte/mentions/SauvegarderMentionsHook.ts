import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import {
  documentDejaCreer,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  IMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectue
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { getValeurOuVide, tousRenseignes } from "@util/Utils";
import { useEffect, useState } from "react";
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
  acte: IFicheActe;
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

  // Maj mentions dans etatcivil-api
  const resultatMiseAjourMentions = useMiseAJourMentionsApiHook(
    mentionsAEnvoyerParams
  );

  // Maj des mentions retirées dans requete-api
  const resultatMajDocReponseAvecMentionRetirees =
    useMiseAJourDocumentMentionApiHook(documentMajParams);

  // Génération du document réponse dans requete-api
  const resultatGenerationEC = useGenerationEC(generationEC);

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

  // 2 - Générer le document et changer le statut de la requête si des mentions ont été modifiées
  useEffect(() => {
    if (
      resultatMiseAjourMentions &&
      params &&
      params.document.validation &&
      params.requete.choixDelivrance &&
      mentionsRetireesSaved
    ) {
      setGenerationEC({
        idActe: params.acte.id,
        requete: params.requete,
        pasDAction: documentDejaCreer(
          params.requete.documentsReponses,
          params.requete.choixDelivrance
        ),
        mentionsRetirees: mentionsRetireesSaved,
        choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(
          params.document.typeDocument
        )
      });
    }
  }, [resultatMiseAjourMentions, params, mentionsRetireesSaved]);

  // Maj du résultat retourné par le hook
  useEffect(() => {
    if (
      tousRenseignes(
        params,
        mentionsRetireesSaved,
        resultatMajDocReponseAvecMentionRetirees || resultatGenerationEC
      )
    ) {
      // @ts-ignore params non null
      let idDoc = params.document.id;
      if (resultatGenerationEC?.resultGenerationUnDocument?.idDocumentReponse) {
        idDoc =
          resultatGenerationEC.resultGenerationUnDocument?.idDocumentReponse;
      }

      setResultat({
        idDoc,
        // @ts-ignore mentionsRetirees non null
        mentionsRetirees: mentionsRetireesSaved
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (
      modificationEffectue(
        params.mentions,
        params.mentionsApi.mentions,
        params.document,
        params.acte.nature
      )
    ) {
      if (
        !DocumentDelivrance.estCopieIntegrale(params.document?.typeDocument)
      ) {
        setMentionsAEnvoyerParams({
          idActe: getValeurOuVide(params.acte.id),
          mentions: mentionsAEnvoyer
        });
      } else {
        setGenerationEC({
          idActe: params.acte.id,
          requete: params.requete,
          validation: Validation.O,
          pasDAction: documentDejaCreer(
            params.requete.documentsReponses,
            params.requete.choixDelivrance
          ),
          mentionsRetirees,
          choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(
            params.document.typeDocument
          )
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
