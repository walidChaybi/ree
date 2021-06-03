/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

const COURRIER_NON_DELIVRANCE_ATTESTATION_PACS =
  "COURRIER_NON_DELIVRANCE_ATTESTATION_PACS";
const CATEGORIE_DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
const CERTIFICAT_SITUATION_PREFIX = "CERTIFICAT_SITUATION";
/**
 * Attention:
 *  _nom = code
 *  _libelle_court = catégorie
 *  _libelle = libellé :)
 *
 *  FIXME développer un "EnumNomenclature(code, categorie, libelle)"" pour plus de cohérence
 *
 */
export class DocumentDelivrance extends EnumWithComplete {
  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: DocumentDelivrance) {
    EnumWithLibelle.addEnum(key, obj, DocumentDelivrance);
  }

  public static clean() {
    EnumWithLibelle.clean(DocumentDelivrance);
  }

  public static contientEnums() {
    return EnumWithLibelle.contientEnums(DocumentDelivrance);
  }

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, DocumentDelivrance);
  }

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await peupleDocumentDelivrance();
    return EnumWithLibelle.getAllLibellesAsOptions(DocumentDelivrance);
  }

  public static async getAllCertificatSituationAsOptions(): Promise<Options> {
    const options = await DocumentDelivrance.getAllEnumsAsOptions();
    return options.filter(opt =>
      DocumentDelivrance.getEnumFor(opt.value)._nom.startsWith(
        CERTIFICAT_SITUATION_PREFIX
      )
    );
  }

  public static async getCourrierNonDelivranceAttestationPacsUUID(): Promise<
    string
  > {
    await peupleDocumentDelivrance();
    const uuid = EnumWithComplete.getKeyForNom(
      DocumentDelivrance,
      COURRIER_NON_DELIVRANCE_ATTESTATION_PACS
    );
    return uuid ? uuid : "";
  }

  public static estDocumentDelivrance(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumFor(typeDocumentUUID);
    // _libelle_court correspond à la catégorie
    return doc._libelleCourt === CATEGORIE_DOCUMENT_DELIVRANCE;
  }
}
