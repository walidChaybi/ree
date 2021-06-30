/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../../api/nomenclature/NomenclatureRequete";
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";
import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

const COURRIER_NON_DELIVRANCE_ATTESTATION_PACS =
  "COURRIER_NON_DELIVRANCE_ATTESTATION_PACS";
const CATEGORIE_DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
const CERTIFICAT_SITUATION_PREFIX = "CERTIFICAT_SITUATION";

const CERTIFICAT_SITUATION_PACS = "CERTIFICAT_SITUATION_PACS";
const CERTIFICAT_SITUATION_PACS_RC = "CERTIFICAT_SITUATION_PACS_RC";
const CERTIFICAT_SITUATION_PACS_RCA = "CERTIFICAT_SITUATION_PACS_RCA";
const CERTIFICAT_SITUATION_PACS_RC_RCA = "CERTIFICAT_SITUATION_PACS_RC_RCA";
const CERTIFICAT_SITUATION_RC = "CERTIFICAT_SITUATION_RC";
const CERTIFICAT_SITUATION_RC_RCA = "CERTIFICAT_SITUATION_RC_RCA";
const CERTIFICAT_SITUATION_RCA = "CERTIFICAT_SITUATION_RCA";

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
      [CERTIFICAT_SITUATION_PACS]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type,
      [CERTIFICAT_SITUATION_PACS_RC]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type ||
        TypeRepertoire.RC.libelle === type,
      [CERTIFICAT_SITUATION_PACS_RCA]: (type: string): boolean =>
        TypeRepertoire.PACS.libelle === type ||
        TypeRepertoire.RCA.libelle === type,
      [CERTIFICAT_SITUATION_PACS_RC_RCA]: (): boolean => true,
      [CERTIFICAT_SITUATION_RC]: (type: string): boolean =>
        TypeRepertoire.RC.libelle === type,
      [CERTIFICAT_SITUATION_RC_RCA]: (type: string): boolean =>
        TypeRepertoire.RC.libelle === type ||
        TypeRepertoire.RCA.libelle === type,
      [CERTIFICAT_SITUATION_RCA]: (type: string): boolean =>
        TypeRepertoire.RCA.libelle === type
    };
    return switchCase[codeDocumentDemande]
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

  public static async getAllEnumsAsOptions(): Promise<Options> {
    await DocumentDelivrance.init();
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

  public static async getCourrierNonDelivranceAttestationPacsUUID(): Promise<string> {
    await DocumentDelivrance.init();
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
}
