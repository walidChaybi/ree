import {
  IExtraitCopieComposition,
  NOM_DOCUMENT_EC_AVEC_FILIATION,
  NOM_DOCUMENT_EC_SANS_FILIATION
} from "../../../../../model/composition/extraitCopie/IExtraitCopieComposition";
import {
  FicheActe,
  IFicheActe
} from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import {
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_SANS_FILIATION,
  DocumentDelivrance
} from "../../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/enum/StatutRequete";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { creationCompositionExtraitCopieActeTexte } from "./creationComposition/creationCompositionExtraitCopieActeTexte";
import { IGenerationECParams } from "./generationECHook";

export function nonNull(acte?: IFicheActe, params?: IGenerationECParams) {
  return params && acte;
}

export function estDemandeExtraitAvecOuSansFiliationOuCopieActeTexte(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  return (
    ChoixDelivrance.estChoixDelivranceAvecOuSansFiliation(choixDelivrance) ||
    (ChoixDelivrance.estChoixDelivranceCopie(choixDelivrance) &&
      FicheActe.estActeTexte(acte))
  );
}

export function estDemandeExtraitPlurilingue(choixDelivrance: ChoixDelivrance) {
  return ChoixDelivrance.estChoixDelivrancePlurilingue(choixDelivrance);
}

export function estDemandeCopieActeImage(
  acte: IFicheActe,
  choixDelivrance: ChoixDelivrance
) {
  return (
    ChoixDelivrance.estChoixDelivranceCopie(choixDelivrance) &&
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
    // FIXME A Complèter
    default:
      break;
  }
  return nomDocument;
}

export function getStatutRequete(choixDelivrance: ChoixDelivrance) {
  return choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE
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
    composition = {
      nature_acte: "TODO",
      type_document: "TODO"
    } as IExtraitCopieComposition;
  } else if (estDemandeCopieActeImage(acte, choixDelivrance)) {
    composition = {
      nature_acte: "TODO2",
      type_document: "TODO2",
      corps_image: ["image"]
    } as IExtraitCopieComposition;
  }

  return composition;
}
