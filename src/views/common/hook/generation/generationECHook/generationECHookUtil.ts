import {
  IExtraitCopieComposition,
  NOM_DOCUMENT_COPIE_ARCHIVE,
  NOM_DOCUMENT_COPIE_INTEGRALE,
  NOM_DOCUMENT_EC_AVEC_FILIATION,
  NOM_DOCUMENT_EC_PLURILINGUE,
  NOM_DOCUMENT_EC_SANS_FILIATION
} from "../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import {
  AnalyseMarginale,
  IAnalyseMarginale
} from "../../../../../model/etatcivil/acte/IAnalyseMarginale";
import { ICorpsExtraitRectification } from "../../../../../model/etatcivil/acte/ICorpsExtraitRectification";
import {
  FicheActe,
  IFicheActe
} from "../../../../../model/etatcivil/acte/IFicheActe";
import { ITitulaireActe } from "../../../../../model/etatcivil/acte/ITitulaireActe";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { TypeExtrait } from "../../../../../model/etatcivil/enum/TypeExtrait";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "../../../../../model/requete/enum/DocumentDelivranceConstante";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import {
  SNP,
  SPC,
  tousNonNullsNonZeroEtNonVides
} from "../../../../common/util/Utils";
import { IExtraitCopieApiHookResultat } from "../../composition/CompositionExtraitCopieHook";
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

export function estDemandeCopieArchiveActeTexte(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  return (
    ChoixDelivrance.estCopieArchive(choixDelivrance) &&
    FicheActe.estActeTexte(acte)
  );
}

export function getTypeDocument(choixDelivrance: ChoixDelivrance) {
  let uuidTypeDocument = "";
  switch (choixDelivrance) {
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
      uuidTypeDocument = DocumentDelivrance.getKeyForCode(
        CODE_EXTRAIT_SANS_FILIATION
      );
      break;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
      uuidTypeDocument = DocumentDelivrance.getKeyForCode(
        CODE_EXTRAIT_AVEC_FILIATION
      );
      break;
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      uuidTypeDocument = DocumentDelivrance.getKeyForCode(
        CODE_EXTRAIT_PLURILINGUE
      );
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      uuidTypeDocument = DocumentDelivrance.getKeyForCode(CODE_COPIE_INTEGRALE);
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      uuidTypeDocument = DocumentDelivrance.getKeyForCode(
        CODE_COPIE_NON_SIGNEE
      );
      break;
    // FIXME A Complèter
    default:
      break;
  }
  return uuidTypeDocument;
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

export function getStatutRequete(
  choixDelivrance: ChoixDelivrance,
  sousType: SousTypeDelivrance
) {
  return ChoixDelivrance.estCopieArchive(choixDelivrance) ||
    SousTypeDelivrance.estPlanete(sousType)
    ? StatutRequete.A_VALIDER
    : StatutRequete.A_SIGNER;
}

export function creationComposition(
  acte: IFicheActe,
  requete: IRequeteDelivrance,
  validation: Validation,
  mentionsRetirees: string[],
  choixDelivrance: ChoixDelivrance
): IExtraitCopieComposition | undefined {
  let composition;
  if (
    estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(acte, choixDelivrance)
  ) {
    composition = creationCompositionExtraitCopieActeTexte(
      acte,
      requete,
      validation,
      mentionsRetirees
    );
  } else if (estDemandeExtraitPlurilingue(choixDelivrance)) {
    composition = creationCompositionExtraitPlurilingue(acte);
  } else if (estDemandeCopieActeImage(acte, choixDelivrance)) {
    composition = creationCompositionCopieActeImage(
      acte,
      requete,
      Validation.O
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
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
      if (!acte.corpsTexte && !acte.corpsImage) {
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
    (aNomEtPrenomTitulaireAbsentsAnalyseMarginale(acte.analyseMarginales) ||
      aGenreTitulaireInconnu(acte.titulaires) ||
      aDonneesLieuOuAnneeEvenementAbsentes(acte))
  ) {
    return Validation.E;
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

export const aDonneesLieuOuAnneeEvenementAbsentes = function (
  acte: IFicheActe
) {
  return (
    !acte.evenement?.annee ||
    (!acte.evenement?.lieuReprise &&
      !acte.evenement?.ville &&
      !acte.evenement?.region &&
      !acte.evenement?.pays)
  );
};

export const aGenreTitulaireInconnu = function (titulaires?: ITitulaireActe[]) {
  if (titulaires) {
    return titulaires?.find(titulaire => titulaire.sexe === Sexe.INCONNU);
  }
  return true;
};

export const aNomEtPrenomTitulaireAbsentsAnalyseMarginale = function (
  analysesMarginales?: IAnalyseMarginale[]
) {
  const analyseMarginale =
    AnalyseMarginale.getAnalyseMarginaleLaPlusRecente(analysesMarginales);
  if (analyseMarginale) {
    return analyseMarginale.titulaires?.find(
      titulaire =>
        (!titulaire.nom && titulaire.prenoms?.length === 0) ||
        (titulaire.nom === SNP && titulaire.prenoms?.[0] === SPC)
    );
  }
  return true;
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
  setExtraitCopieApiHookParams: any
) {
  if (nonNull(acte, params)) {
    const choixDelivrance = params?.choixDelivrance
      ? params.choixDelivrance
      : params?.requete.choixDelivrance;
    let composition;

    // Verification des données pour la génération d'extrait mariage/naissance
    // En cas de validation en erreur alors un extrait en erreur sera généré
    const validationControle = getValidationEC(
      // @ts-ignore NonNull
      acte,
      // @ts-ignore NonNull
      params.requete.choixDelivrance,
      // @ts-ignore NonNull
      params.validation
    );

    composition = creationComposition(
      // @ts-ignore NonNull
      acte,
      // @ts-ignore NonNull
      params.requete,
      validationControle,
      // @ts-ignore NonNull
      params.mentionsRetirees,
      // @ts-ignore NonNull
      choixDelivrance
    );
    setValidation(validationControle);
    setExtraitCopieApiHookParams({
      // @ts-ignore NonNull
      choixDelivrance: params.choixDelivrance,
      extraitCopieComposition: composition
    });
  }
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
  params?: IGenerationECParams
): boolean {
  return tousNonNullsNonZeroEtNonVides(
    params?.idActe,
    params?.requete?.choixDelivrance
  );
}

export function estPresentActeEtChoixDelivrance(
  params?: IGenerationECParams
): boolean {
  return tousNonNullsNonZeroEtNonVides(params?.acte, params?.choixDelivrance);
}
