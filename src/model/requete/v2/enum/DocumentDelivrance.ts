/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";
import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

const CARN_PAC_01 = "CARN_PAC_01";
const CATEGORIE_DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
const CERTIFICAT_SITUATION_PREFIX = "CERTIFICAT_SITUATION";

export const CODE_CERTIFICAT_SITUATION_PACS = "CERTIFICAT_SITUATION_PACS";
export const CODE_CERTIFICAT_SITUATION_PACS_RC = "CERTIFICAT_SITUATION_PACS_RC";
export const CODE_CERTIFICAT_SITUATION_PACS_RCA =
  "CERTIFICAT_SITUATION_PACS_RCA";
export const CODE_CERTIFICAT_SITUATION_PACS_RC_RCA =
  "CERTIFICAT_SITUATION_PACS_RC_RCA";
export const CODE_CERTIFICAT_SITUATION_RC = "CERTIFICAT_SITUATION_RC";
export const CODE_CERTIFICAT_SITUATION_RCA = "CERTIFICAT_SITUATION_RCA";
export const CODE_CERTIFICAT_SITUATION_RC_RCA = "CERTIFICAT_SITUATION_RC_RCA";

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
  /**
   *
   * Méthode contrôlant que le document demandé est en accord avec un résultat de la RMC
   *
   * @param codeDocumentDemande
   * @param categorieInscription
   */
  private static controleDocumentDelivranceSelonTypeRepertoire(
    codeDocumentDemande: string,
    categorieInscription: string
  ): boolean {
    /* Switch / Case */
    const switchCase: any = {
      [CODE_CERTIFICAT_SITUATION_PACS]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type,
      [CODE_CERTIFICAT_SITUATION_PACS_RC]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type ||
        TypeRepertoire.RC.libelle === type,
      [CODE_CERTIFICAT_SITUATION_PACS_RCA]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type ||
        TypeRepertoire.RCA.libelle === type,
      [CODE_CERTIFICAT_SITUATION_PACS_RC_RCA]: (): boolean => true,
      [CODE_CERTIFICAT_SITUATION_RC]: (type: string): boolean =>
        TypeRepertoire.RC.libelle === type,
      [CODE_CERTIFICAT_SITUATION_RC_RCA]: (type: string): boolean =>
        TypeRepertoire.RC.libelle === type ||
        TypeRepertoire.RCA.libelle === type,
      [CODE_CERTIFICAT_SITUATION_RCA]: (type: string): boolean =>
        TypeRepertoire.RCA.libelle === type
    };
    return codeDocumentDemande && switchCase[codeDocumentDemande]
      ? switchCase[codeDocumentDemande](categorieInscription)
      : false;
  }

  public static async init() {
    await peupleDocumentDelivrance();
  }

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

  public static getKeyForNom(nom: string) {
    return EnumWithComplete.getKeyForNom(DocumentDelivrance, nom);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(DocumentDelivrance);
  }

  public static getAllCertificatSituationAsOptions(): Options {
    const options = DocumentDelivrance.getAllEnumsAsOptions();
    return options.filter(opt =>
      DocumentDelivrance.getEnumFor(opt.value)._nom.startsWith(
        CERTIFICAT_SITUATION_PREFIX
      )
    );
  }

  public static getCourrierNonDelivranceAttestationPacsUUID(): string {
    const uuid = EnumWithComplete.getKeyForNom(DocumentDelivrance, CARN_PAC_01);
    return uuid ? uuid : "";
  }

  public static getUuidFromDocument(document: DocumentDelivrance): string {
    const uuid = EnumWithComplete.getKeyForNom(
      DocumentDelivrance,
      document.nom
    );
    return uuid ? uuid : "";
  }

  public static estDocumentDelivrance(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumFor(typeDocumentUUID);
    // _libelle_court correspond à la catégorie
    return doc._libelleCourt === CATEGORIE_DOCUMENT_DELIVRANCE;
  }

  public static estDocumentDelivranceValide(
    categorieInscription: string,
    documentDemande: DocumentDelivrance
  ): boolean {
    const codeDocumentDemande: string = documentDemande?.nom;
    const categorie: string = categorieInscription?.toUpperCase();
    return DocumentDelivrance.controleDocumentDelivranceSelonTypeRepertoire(
      codeDocumentDemande,
      categorie
    );
  }

  public static getDocumentDelivrance(
    documentDemandeUUID: string
  ): DocumentDelivrance {
    return DocumentDelivrance.getEnumFor(documentDemandeUUID);
  }
}
