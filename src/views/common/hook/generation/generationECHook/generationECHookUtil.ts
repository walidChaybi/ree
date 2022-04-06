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
import { TypeExtrait } from "../../../../../model/etatcivil/enum/TypeExtrait";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import {
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION,
  DocumentDelivrance
} from "../../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { SNP, SPC } from "../../../../common/util/Utils";
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
  choixDelivrance: ChoixDelivrance,
  sousTypeRequete: SousTypeDelivrance,
  validation: Validation
): IExtraitCopieComposition | undefined {
  let composition;
  if (
    estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(acte, choixDelivrance)
  ) {
    composition = creationCompositionExtraitCopieActeTexte(
      acte,
      choixDelivrance,
      sousTypeRequete,
      validation
    );
  } else if (estDemandeExtraitPlurilingue(choixDelivrance)) {
    composition = creationCompositionExtraitPlurilingue(acte);
  } else if (estDemandeCopieActeImage(acte, choixDelivrance)) {
    composition = creationCompositionCopieActeImage(
      acte,
      choixDelivrance,
      sousTypeRequete,
      validation
    );
  }

  return composition;
}

export const controlerDonneesGenerationExtraitMariageOuNaissance = function (
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
    estDelivranceExtraitAvecOuSansFiliationActeNaissanceOuMariage(
      acte,
      choixDelivrance
    ) &&
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
};

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
    return titulaires?.find(titulaire => titulaire.sexe === "INCONNU");
  }
  return true;
};

export const aNomEtPrenomTitulaireAbsentsAnalyseMarginale = function (
  analysesMarginales?: IAnalyseMarginale[]
) {
  const analyseMarginale =
    AnalyseMarginale.getLaBonneAnalyseMarginale(analysesMarginales);
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
