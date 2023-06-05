import {
  IExtraitCopieComposition,
  NOM_DOCUMENT_COPIE_ARCHIVE,
  NOM_DOCUMENT_COPIE_INTEGRALE,
  NOM_DOCUMENT_EC_AVEC_FILIATION,
  NOM_DOCUMENT_EC_PLURILINGUE,
  NOM_DOCUMENT_EC_SANS_FILIATION
} from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { IExtraitPlurilingueComposition } from "@model/composition/extraitCopie/plurilingue/IExtraitPlurilingueComposition";
import { ICorpsExtraitRectification } from "@model/etatcivil/acte/ICorpsExtraitRectification";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { tousRenseignes } from "@util/Utils";
import { IExtraitCopieApiHookResultat } from "../../composition/CompositionExtraitCopieHook";
import { ICreerCourrierECParams } from "../../requete/creerCourrierECHook";
import { creationCompositionCopieActeImage } from "./creationComposition/creationCompositionCopieActeImage";
import { creationCompositionExtraitCopieActeTexte } from "./creationComposition/creationCompositionExtraitCopieActeTexte";
import { creationCompositionExtraitPlurilingue } from "./creationComposition/creationCompositionExtraitPlurilingue";
import { IGenerationECParams } from "./generationECHook";

export function nonNull(acte?: IFicheActe, params?: IGenerationECParams) {
  return params && acte;
}

export function estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  return (
    ChoixDelivrance.estAvecOuSansFiliation(choixDelivrance) ||
    (ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance) &&
      FicheActe.estActeTexte(acte))
  );
}

export function estDemandeExtraitPlurilingue(choixDelivrance: ChoixDelivrance) {
  return ChoixDelivrance.estPlurilingue(choixDelivrance);
}

export function estDemandeCopieActeImage(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  return (
    ChoixDelivrance.estCopieIntegraleOuArchive(choixDelivrance) &&
    FicheActe.estActeImage(acte)
  );
}

export function getNomDocument(choixDelivrance: ChoixDelivrance) {
  let nomDocument = "";
  switch (choixDelivrance) {
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
      nomDocument = NOM_DOCUMENT_EC_SANS_FILIATION;
      break;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
      nomDocument = NOM_DOCUMENT_EC_AVEC_FILIATION;
      break;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      nomDocument = NOM_DOCUMENT_EC_PLURILINGUE;
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      nomDocument = NOM_DOCUMENT_COPIE_INTEGRALE;
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      nomDocument = NOM_DOCUMENT_COPIE_ARCHIVE;
      break;
    // FIXME A Complèter
    default:
      break;
  }
  return nomDocument;
}

export function creationComposition(
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  validation: Validation,
  mentionsRetirees: string[],
  choixDelivrance: ChoixDelivrance,
  ctv: string
): IExtraitCopieComposition | IExtraitPlurilingueComposition | undefined {
  let composition;

  if (
    estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(acte, choixDelivrance)
  ) {
    composition = creationCompositionExtraitCopieActeTexte(
      acte,
      requete,
      validation,
      mentionsRetirees,
      choixDelivrance,
      ctv
    );
  } else if (estDemandeExtraitPlurilingue(choixDelivrance)) {
    composition = creationCompositionExtraitPlurilingue(
      acte,
      validation,
      requete.sousType,
      mentionsRetirees,
      ctv
    );
  } else if (estDemandeCopieActeImage(acte, choixDelivrance)) {
    composition = creationCompositionCopieActeImage(
      acte,
      requete,
      choixDelivrance,
      Validation.O,
      ctv
    );
  }
  return composition;
}

export const getValidationEC = (
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance,
  validation = Validation.O
) => {
  switch (choixDelivrance) {
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
      return getValidationExtrait(acte, choixDelivrance, validation);
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      return getValidationExtraitPlurilingue(acte, validation);
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      if (!acte.corpsImage && !acte.corpsTexte) {
        return Validation.E;
      }
      break;
  }

  return validation;
};

function getValidationExtrait(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance,
  validation: Validation
) {
  // Pour un choix de délivrance d'extrait avec ou sans filiation d'un acte de mariage ou de naissance
  // Si l'acte ne comporte pas de corps d'extrait modifier correspondant au choix de delivrance
  // ou que les noms et prenoms de l'analyse marginales sont absents
  // ou que le genre est d'un des titulaires est inconnu
  // ou que l'année ou le lieux de l'évenement ne sont absents
  if (
    aPasCorpsExtraitRectificationCorrespondant(
      acte.corpsExtraitRectifications,
      choixDelivrance
    ) &&
    (FicheActe.aNomEtPrenomTitulaireAbsentsAnalyseMarginale(acte) ||
      FicheActe.aGenreTitulaireInconnu(acte) ||
      FicheActe.aDonneesLieuOuAnneeEvenementAbsentes(acte))
  ) {
    return Validation.E;
  }
  return validation;
}

export function getValidationExtraitPlurilingue(
  acte: IFicheActe,
  validation: Validation
) {
  switch (acte.nature) {
    case NatureActe.MARIAGE:
    case NatureActe.NAISSANCE:
    case NatureActe.DECES:
      if (FicheActe.estIncomplet(acte) || FicheActe.estEnErreur(acte)) {
        return Validation.E;
      }
      break;
    default:
      return validation;
  }

  if (validation === Validation.E) {
    return Validation.N;
  }

  return validation;
}

export const estDelivranceExtraitAvecOuSansFiliationActeNaissanceOuMariage =
  function (acte: IFicheActe, choixDelivrance: ChoixDelivrance) {
    return (
      (acte.nature === NatureActe.NAISSANCE ||
        acte.nature === NatureActe.MARIAGE) &&
      (choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION ||
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION)
    );
  };

export const aPasCorpsExtraitRectificationCorrespondant = function (
  corpsExtraitRectifications: ICorpsExtraitRectification[],
  choixDelivrance: ChoixDelivrance
) {
  return (
    corpsExtraitRectifications.filter(el => {
      if (
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      ) {
        return el.type === TypeExtrait.EXTRAIT_AVEC_FILIATION;
      } else if (
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
      ) {
        return el.type === TypeExtrait.EXTRAIT_SANS_FILIATION;
      }
      return false;
    }).length === 0
  );
};

export function creationEC(
  acte: IFicheActe | undefined,
  params: IGenerationECParams | undefined,
  setValidation: any,
  setExtraitCopieApiHookParams: any,
  ctv?: string
) {
  if (nonNull(acte, params)) {
    // Verification des données pour la génération d'extrait mariage/naissance
    // En cas de validation en erreur alors un extrait en erreur sera généré
    const validationControle = getValidationEC(
      // @ts-ignore NonNull
      acte,
      // @ts-ignore NonNull
      params.choixDelivrance,
      // @ts-ignore NonNull
      params.validation,
      // @ts-ignore NonNull
      params.requete
    );

    const composition = creationComposition(
      // @ts-ignore NonNull
      acte,
      // @ts-ignore NonNull
      params.requete,
      validationControle,
      // @ts-ignore NonNull
      params.mentionsRetirees,
      // @ts-ignore NonNull
      params.choixDelivrance,
      ctv
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
  acte: IFicheActe | undefined,
  params: IGenerationECParams | undefined,
  setValidation: any,
  setExtraitCopieApiHookParams: any
) {
  creationEC(acte, params, setValidation, setExtraitCopieApiHookParams, "");
}

export function toutesLesDonneesSontPresentes(
  uuidDocumentReponse: string | undefined,
  uuidDocumentReponseSansAction: string | undefined,
  extraitCopieApiHookResultat?: IExtraitCopieApiHookResultat
) {
  return (
    (uuidDocumentReponse || uuidDocumentReponseSansAction) &&
    extraitCopieApiHookResultat &&
    extraitCopieApiHookResultat.donneesComposition
  );
}

export function estPresentIdActeEtChoixDelivrance(
  params?: IGenerationECParams | ICreerCourrierECParams
): boolean {
  return tousRenseignes(params?.idActe, params?.requete?.choixDelivrance);
}

export function estPresentActeEtChoixDelivrance(
  params?: IGenerationECParams
): boolean {
  return tousRenseignes(params?.acte, params?.choixDelivrance);
}

export function estDocumentAvecCTV(
  typeDocument?: string,
  sousTypeDelivrance?: SousTypeDelivrance
) {
  return (
    DocumentDelivrance.estExtraitCopieAsigner(typeDocument) &&
    SousTypeDelivrance.estSousTypeSignable(sousTypeDelivrance)
  );
}
