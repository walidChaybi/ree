import {
  IExtraitCopieComposition,
  NOM_DOCUMENT_COPIE_ARCHIVE,
  NOM_DOCUMENT_COPIE_INTEGRALE,
  NOM_DOCUMENT_EC_AVEC_FILIATION,
  NOM_DOCUMENT_EC_PLURILINGUE,
  NOM_DOCUMENT_EC_SANS_FILIATION
} from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { IExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/IExtraitPlurilingueComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { RectificationCorpsExtrait } from "@model/etatcivil/acte/RectificationCorpsExtrait";
import { IImage } from "@model/etatcivil/acte/imageActe/IImage";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IExtraitCopieApiHookResultat } from "../../composition/CompositionExtraitCopieHook";
import { ICreerCourrierECParams } from "../../requete/creerCourrierECHook";
import { creationCompositionCopieActeImage } from "./creationComposition/creationCompositionCopieActeImage";
import { creationCompositionExtraitCopieActeTexte } from "./creationComposition/creationCompositionExtraitCopieActeTexte";
import { creationCompositionExtraitPlurilingue } from "./creationComposition/creationCompositionExtraitPlurilingue";
import { IGenerationECParams } from "./generationECHook";

function estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(acte: FicheActe, choixDelivrance: ChoixDelivrance) {
  return (
    ChoixDelivrance.estAvecOuSansFiliation(choixDelivrance) ||
    (ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance) && acte.type === "TEXTE")
  );
}

function estDemandeExtraitPlurilingue(choixDelivrance: ChoixDelivrance) {
  return ChoixDelivrance.estPlurilingue(choixDelivrance);
}

function estDemandeCopieActeImage(acte: FicheActe, choixDelivrance: ChoixDelivrance) {
  return ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance) && acte.type === "IMAGE";
}

export const getNomDocument = (choixDelivrance: ChoixDelivrance): string => {
  switch (choixDelivrance) {
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
      return NOM_DOCUMENT_EC_SANS_FILIATION;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
      return NOM_DOCUMENT_EC_AVEC_FILIATION;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      return NOM_DOCUMENT_EC_PLURILINGUE;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      return NOM_DOCUMENT_COPIE_INTEGRALE;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      return NOM_DOCUMENT_COPIE_ARCHIVE;
    // FIXME A Complèter
    default:
      return "";
  }
};

function creationComposition(
  acte: FicheActe,
  requete: IRequeteDelivrance,
  validation: EValidation,
  mentionsRetirees: string[],
  choixDelivrance: ChoixDelivrance,
  ctv: string,
  images: IImage[]
): IExtraitCopieComposition | IExtraitPlurilingueComposition | undefined {
  let composition;

  if (estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(acte, choixDelivrance)) {
    composition = creationCompositionExtraitCopieActeTexte(acte, requete, validation, mentionsRetirees, choixDelivrance, ctv);
  } else if (estDemandeExtraitPlurilingue(choixDelivrance)) {
    composition = creationCompositionExtraitPlurilingue(acte, validation, requete.sousType, mentionsRetirees, ctv);
  } else if (estDemandeCopieActeImage(acte, choixDelivrance)) {
    composition = creationCompositionCopieActeImage(acte, requete, choixDelivrance, EValidation.O, ctv, images);
  }
  return composition;
}

const getValidationEC = (acte: FicheActe, choixDelivrance: ChoixDelivrance, images: IImage[], validation = EValidation.O) => {
  switch (choixDelivrance) {
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
      return getValidationExtrait(acte, choixDelivrance, validation);
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      return getValidationExtraitPlurilingue(acte, validation);
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      if (images.length === 0 && !acte.corpsTexte) {
        return EValidation.E;
      }
      break;
  }

  return validation;
};

function getValidationExtrait(acte: FicheActe, choixDelivrance: ChoixDelivrance, validation: EValidation) {
  // Pour un choix de délivrance d'extrait avec ou sans filiation d'un acte de mariage ou de naissance
  // Si l'acte ne comporte pas de corps d'extrait modifié correspondant au choix de delivrance
  // ou que les noms et prenoms de l'analyse marginales sont absents
  // ou que le genre est d'un des titulaires est inconnu
  // ou que l'année ou le lieux de l'évenement ne sont absents
  if (
    !aRectificationCorpsExtraitCorrespondantAuChoixDelivrance(acte.rectificationsCorpsExtrait, choixDelivrance) &&
    (acte.titulaireAnalyseMarginaleLaPlusRecenteANomEtPrenomAbsent() ||
      acte.titulaires.find(titulaire => titulaire.sexe === "INCONNU") ||
      acte.aDonneesLieuOuAnneeEvenementAbsentes())
  ) {
    return EValidation.E;
  }
  return validation;
}

function getValidationExtraitPlurilingue(acte: FicheActe, validation: EValidation) {
  switch (acte.nature) {
    case "MARIAGE":
    case "NAISSANCE":
    case "DECES":
      if (acte.estIncomplet() || acte.estEnErreur()) {
        return EValidation.E;
      }
      break;
    default:
      return validation;
  }

  if (validation === EValidation.E) {
    return EValidation.N;
  }

  return validation;
}

const aRectificationCorpsExtraitCorrespondantAuChoixDelivrance = (
  rectificationsCorpsExtrait: RectificationCorpsExtrait[],
  choixDelivrance: ChoixDelivrance
): boolean =>
  Boolean(
    rectificationsCorpsExtrait.find(
      rectification =>
        (choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION && rectification.type === "EXTRAIT_AVEC_FILIATION") ||
        (choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION && rectification.type === "EXTRAIT_SANS_FILIATION")
    )
  );

export function creationEC(
  acte: FicheActe | undefined,
  params: IGenerationECParams | undefined,
  setValidation: any,
  setExtraitCopieApiHookParams: any,
  images: IImage[],
  ctv?: string
) {
  if (acte && params) {
    // Verification des données pour la génération d'extrait mariage/naissance
    // En cas de validation en erreur alors un extrait en erreur sera généré
    const validationControle = getValidationEC(acte, params.choixDelivrance, images ?? [], params.validation);

    const composition = creationComposition(
      acte,
      params.requete,
      validationControle,
      params.mentionsRetirees,
      params.choixDelivrance,
      ctv ?? "",
      images
    );

    setValidation(validationControle);
    setExtraitCopieApiHookParams({
      // @ts-ignore NonNull
      choixDelivrance: params.choixDelivrance,
      extraitCopieComposition: composition
    });
  }
}

export function creationECSansCTV(
  acte: FicheActe | undefined,
  params: IGenerationECParams | undefined,
  setValidation: any,
  setExtraitCopieApiHookParams: any,
  images: IImage[]
) {
  creationEC(acte, params, setValidation, setExtraitCopieApiHookParams, images, "");
}

export function toutesLesDonneesSontPresentes(
  uuidDocumentReponse: string | undefined,
  uuidDocumentReponseSansAction: string | undefined,
  extraitCopieApiHookResultat?: IExtraitCopieApiHookResultat
) {
  return (uuidDocumentReponse || uuidDocumentReponseSansAction) && extraitCopieApiHookResultat?.donneesComposition;
}

export function estPresentIdActeEtChoixDelivrance(params?: IGenerationECParams | ICreerCourrierECParams): boolean {
  return Boolean(params?.idActe && params?.requete?.choixDelivrance);
}

export function estDocumentAvecCTV(typeDocument: string | null, sousTypeDelivrance?: SousTypeDelivrance) {
  return DocumentDelivrance.estExtraitCopieAsigner(typeDocument) && SousTypeDelivrance.estSousTypeSignable(sousTypeDelivrance);
}
