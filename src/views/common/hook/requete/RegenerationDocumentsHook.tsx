import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "@model/requete/enum/Validation";
import {
  documentDejaCreer,
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { getDefaultValuesCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import { useEffect, useState } from "react";
import {
  IGenerationECParams,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";
import {
  IGenerationCourrierParams,
  useGenerationCourrierHook
} from "./GenerationCourrierHook";

export interface IRegenerationDocumentsParams {
  requete: IRequeteDelivrance;
  regenererCourrier: boolean;
  problemePlurilingue?: boolean;
  acte?: IFicheActe;
  callBack?: () => void;
}

export function useRegenerationDocumentsHook(
  params?: IRegenerationDocumentsParams
) {
  const [generationECParams, setGenerationECParams] =
    useState<IGenerationECParams>();

  const [documentsARegenerer, setDocumentsARegenerer] =
    useState<IDocumentReponse[]>();

  const [generationCourrierParams, setGenerationCourrierParams] =
    useState<IGenerationCourrierParams>();

  const resultatGenerationEC = useGenerationEC(generationECParams);

  const resultatGenerationCourrier = useGenerationCourrierHook(
    generationCourrierParams
  );

  // 1 - Regénérer tous les documents
  useEffect(() => {
    if (params) {
      const docsARegenerer = RequeteDelivrance.getExtraitsCopies(
        params.requete
      );
      ajouteCourrierSiDemande(params, docsARegenerer);
      if (docsARegenerer.length) {
        setDocumentsARegenerer([...docsARegenerer]);
      } else if (params.callBack) {
        params.callBack();
      }
    }
  }, [params]);

  // 2 - Regénérer un document
  useEffect(() => {
    if (documentsARegenerer?.length && params) {
      const document = documentsARegenerer[0];
      genereECOuCourrier(
        document,
        setGenerationECParams,
        params,
        setGenerationCourrierParams
      );
    } else if (documentsARegenerer?.length === 0 && params?.callBack) {
      params.callBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsARegenerer]);

  useEffect(() => {
    if (
      (resultatGenerationEC || resultatGenerationCourrier) &&
      documentsARegenerer
    ) {
      documentsARegenerer.shift();
      setDocumentsARegenerer([...documentsARegenerer]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC, resultatGenerationCourrier]);
}

function genereECOuCourrier(
  document: IDocumentReponse,
  setGenerationECParams: any,
  params: IRegenerationDocumentsParams,
  setGenerationCourrierParams: any
) {
  if (DocumentReponse.estExtraitCopie(document)) {
    genereEC(setGenerationECParams, document, params);
  } else {
    genereCourrier(setGenerationCourrierParams, document, params);
  }
}

function ajouteCourrierSiDemande(
  params: IRegenerationDocumentsParams,
  docsARegenerer: IDocumentReponse[]
) {
  if (params.regenererCourrier) {
    const courrier = RequeteDelivrance.getCourrier(params.requete);
    if (courrier) {
      docsARegenerer.push(courrier);
    }
  }
}

function genereCourrier(
  setGenerationCourrierParams: any,
  document: IDocumentReponse,
  params: IRegenerationDocumentsParams
) {
  setGenerationCourrierParams({
    mettreAJourStatut: false,
    requete: params.requete,
    optionsChoisies: document.optionsCourrier
      ? (document.optionsCourrier.map(option => ({
          code: option.code,
          texteOptionCourrier: option.texte,
          ordreEdition: option.numeroOrdreEdition
        })) as OptionsCourrier)
      : [],
    saisieCourrier: getDefaultValuesCourrier(params.requete),
    acte: params.acte
  });
}

function genereEC(
  setGenerationECParams: any,
  document: IDocumentReponse,
  params: IRegenerationDocumentsParams
) {
  setGenerationECParams({
    idActe: document.idActe,
    acte: params.acte,
    requete: params.requete,
    validation:
      params.problemePlurilingue === undefined
        ? document.validation
        : getValidation(document, params.problemePlurilingue),
    mentionsRetirees: document.mentionsRetirees
      ? document.mentionsRetirees?.map(el => el.idMention)
      : [],
    pasDAction: documentDejaCreer(
      params.requete.documentsReponses,
      params.requete.choixDelivrance
    ),
    choixDelivrance: DocumentDelivrance.getChoixDelivranceFromUUID(
      document.typeDocument
    )
  });
}

function getValidation(
  document: IDocumentReponse,
  problemePlurilingue: boolean
) {
  if (
    document.typeDocument ===
      DocumentDelivrance.getKeyForCode(CODE_EXTRAIT_PLURILINGUE) &&
    problemePlurilingue
  ) {
    return Validation.E;
  } else if (
    DocumentDelivrance.estExtraitAvecOuSansFilliation(document.typeDocument) &&
    document.validation === Validation.E
  ) {
    return Validation.N;
  }
  return document.validation ? document.validation : Validation.N;
}
