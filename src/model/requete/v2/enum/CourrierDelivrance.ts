/* istanbul ignore file */
import {
  COURRIER_DELIVRANCE,
  peupleCourrierDelivrance
} from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumNomemclature } from "../../../../views/common/util/enum/EnumNomenclature";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export const INFORMATION_DIVERSES_MANQUANTE =
  "Informations diverses manquantes (117)";
export const MANDAT_GENEALOGIQUE = "Mandat généalogiste manquant (18)";
export const JUSTIFICATIF_REPRESENTANT_MANQUANT =
  "Justificatif représentant légal manquant (19)";
export const ACTE_NON_TROUVE = "Acte non trouvé (115)";
export const ACTE_NON_TROUVE_ALGERIE = "Acte non trouvé Algérie (64)";
export const ACTE_NAISSANCE_NON_TROUVE_MARIAGE =
  "Acte de naissance non trouvé pour mariage (24)";
export const ATTESTATION_PENSION = "Attestation de pension de réversion";
export const PROPOSITION_TRANSCRIPTION = "Proposition de transcription d'acte";
export const DIVERS = "Divers (17)";
export const REFUS_DELIVRANCE_MARIAGE = "Refus délivrance mariage";
export const DELIVRANCE_ACTE_NON_ANTHENTIQUE =
  "Délivrance d'acte non authentique (118)";
export const DELIVRANCE_ACTE = "Délivrance d'acte (116)";
export const DELIVRANCE_ACTE_INCOMPLET = "Délivrance d'acte incomplet (50)";

export class CourrierDelivrance extends EnumNomemclature {
  public static async init() {
    await peupleCourrierDelivrance();
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: CourrierDelivrance) {
    EnumWithLibelle.addEnum(key, obj, CourrierDelivrance);
  }

  public static clean() {
    EnumWithLibelle.clean(CourrierDelivrance);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(CourrierDelivrance);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, CourrierDelivrance);
  }

  public static getOptionFromLibelle(libelle: string) {
    return {
      value: this.getCodeForLibelle(CourrierDelivrance, libelle),
      str: libelle
    };
  }

  public static estCourrierDelivrance(typeDocumentUUID: string): boolean {
    const doc = CourrierDelivrance.getEnumFor(typeDocumentUUID);
    // _libelle_court correspond à la catégorie
    return doc._categorie === COURRIER_DELIVRANCE;
  }

  public static getCourrierDelivrance(
    documentDemandeUUID: string
  ): CourrierDelivrance {
    return CourrierDelivrance.getEnumFor(documentDemandeUUID);
  }
}
