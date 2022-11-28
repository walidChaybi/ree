import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { Validation } from "@model/requete/enum/Validation";
import {
  documentDejaCreer,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { useEffect, useState } from "react";
import {
  IGenerationECParams,
  useGenerationEC
} from "../generation/generationECHook/generationECHook";

export interface IRegenerationDocumentsParams {
  requete: IRequeteDelivrance;
  regenererCourrier: boolean;
  problemePlurilingue?: boolean;
  callBack?: () => void;
}

export function useRegenerationDocumentsHook(
  params?: IRegenerationDocumentsParams
) {
  const [generationECParams, setGenerationECParams] =
    useState<IGenerationECParams>();

  const [documentsARegenerer, setDocumentsARegenerer] =
    useState<IDocumentReponse[]>();

  const resultatGenerationEC = useGenerationEC(generationECParams);

  // 1 - Regénérer tous les documents
  useEffect(() => {
    if (params) {
      const docsARegenerer = RequeteDelivrance.getExtraitsCopies(
        params.requete
      );
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
      genereEC(setGenerationECParams, document, params);
    } else if (documentsARegenerer?.length === 0 && params?.callBack) {
      params.callBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsARegenerer]);

  useEffect(() => {
    if (resultatGenerationEC && documentsARegenerer) {
      documentsARegenerer.shift();
      setDocumentsARegenerer([...documentsARegenerer]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatGenerationEC]);
}

function genereEC(
  setGenerationECParams: any,
  document: IDocumentReponse,
  params: IRegenerationDocumentsParams
) {
  setGenerationECParams({
    idActe: document.idActe,
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
