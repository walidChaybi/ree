import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
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
import { logInfoDansLaConsole } from "@util/Console";
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
  valeursCourrierParDefaut: SaisieCourrier;
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

  // TODO log à supprimer quand la Mantis 97940 sera résolue
  logInfoDansLaConsole(
    "Debug UAT2 courrier : useRegenerationDocumentsHook",
    generationCourrierParams
  );
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
      ? (document.optionsCourrier.map(optionCourrier => ({
          id: optionCourrier.code,
          texteOptionCourrier: optionCourrier.texte,
          ordreEdition: optionCourrier.numeroOrdreEdition
        })) as OptionsCourrier)
      : [],
    saisieCourrier: params.valeursCourrierParDefaut,
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
