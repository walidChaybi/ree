/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../api/nomenclature/NomenclatureRequete";
import { EnumNomemclature } from "../../../views/common/util/enum/EnumNomenclature";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";
import { TypeRepertoire } from "../../etatcivil/enum/TypeRepertoire";

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
export const CODE_ATTESTATION_PACS = "ATTESTATION_PACS";
export const CODE_CERTIFICAT_INSCRIPTION_RC = "CERTIFICAT_INSCRIPTION_RC";
export const CODE_CERTIFICAT_INSCRIPTION_RCA = "CERTIFICAT_INSCRIPTION_RCA";

export const INFORMATION_DIVERSES_MANQUANTE = "CARN_EC_117";
export const MANDAT_GENEALOGIQUE = "CARN_EC_18";
export const JUSTIFICATIF_REPRESENTANT_MANQUANT = "CARN_EC_19";
export const ACTE_NON_TROUVE = "CARN_EC_115";
export const ACTE_NON_TROUVE_ALGERIE = "CARN_EC_64";
export const ACTE_NAISSANCE_NON_TROUVE_MARIAGE = "CARN_EC_24";
export const ATTESTATION_PENSION = "CARN_EC_APR";
export const PROPOSITION_TRANSCRIPTION = "CARN_EC_PTA";
export const DIVERS = "CARN_EC_17";
export const REFUS_DELIVRANCE_MARIAGE = "CARN_EC_RDM";
export const DELIVRANCE_ACTE_NON_ANTHENTIQUE = "CAD_ARCH_118";
export const DELIVRANCE_ACTE = "CAD_EC_116";
export const DELIVRANCE_ACTE_INCOMPLET = "CAD_EC_50";

export const COPIE_INTEGRALE = "COPIE_INTEGRALE";
export const COPIE_NON_SIGNEE = "COPIE_NON_SIGNEE";
export const DECISION_PROTECTION = "DECISION_PROTECTION";
export const EXTRAIT_AVEC_FILIATION = "EXTRAIT_AVEC_FILIATION";
export const EXTRAIT_PLURILINGUE = "EXTRAIT_PLURILINGUE";
export const CODE_EXTRAIT_SANS_FILIATION = "EXTRAIT_SANS_FILIATION";

const CodesExtraitCopieASigner = [
  COPIE_INTEGRALE,
  EXTRAIT_AVEC_FILIATION,
  EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
];

export const CodesExtraitCopie = [
  ...CodesExtraitCopieASigner,
  COPIE_NON_SIGNEE
];

const ORDRE_MAX = 999;

const COURRIER = "Courrier";
const ORDRE_DOCUMENTS_DELIVRANCE = {
  "Copie intégrale": 10,
  "Extrait avec filiation": 20,
  "Extrait avec filiation plurilingue": 30,
  "Extrait sans filiation": 40,
  "Copie non signée": 50,
  "Certificat de situation délivré": 60,
  CERTIFICAT_INSCRIPTION_RC: 70,
  CERTIFICAT_INSCRIPTION_RCA: 80,
  ATTESTATION_PACS: 100,
  "Certificat d'inscription": 110,
  Attestation: 120,
  COURRIER: 130
};

export class DocumentDelivrance extends EnumNomemclature {
  constructor(
    code: string,
    libelle: string,
    categorie: string,
    private readonly _texteLibre: boolean,
    private readonly _categorieDocumentDelivrance: string
  ) {
    super(code, libelle, categorie);
  }

  get texteLibre() {
    return this._texteLibre;
  }

  get categorieDocumentDelivrance() {
    return this._categorieDocumentDelivrance;
  }

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

  public static getEnumFor(str: string): DocumentDelivrance {
    return EnumWithLibelle.getEnumFor(str, DocumentDelivrance);
  }

  public static getKeyForCode(code: string) {
    return EnumNomemclature.getKeyForCode(DocumentDelivrance, code);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(DocumentDelivrance);
  }

  public static getAllCertificatSituationAsOptions(): Options {
    const options = DocumentDelivrance.getAllEnumsAsOptions();

    return options.filter(opt =>
      DocumentDelivrance.getEnumFor(opt.value).code.startsWith(
        CERTIFICAT_SITUATION_PREFIX
      )
    );
  }

  public static getCourrierNonDelivranceAttestationPacsUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CARN_PAC_01
    );
    return uuid ? uuid : "";
  }

  public static getAttestationPacsUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_ATTESTATION_PACS
    );
    return uuid ? uuid : "";
  }

  public static getCertificatInscriptionRcUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_CERTIFICAT_INSCRIPTION_RC
    );
    return uuid ? uuid : "";
  }

  public static getCertificatInscriptionRcaUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_CERTIFICAT_INSCRIPTION_RCA
    );
    return uuid ? uuid : "";
  }

  public static getUuidFromDocument(document: DocumentDelivrance): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      document.code
    );
    return uuid ? uuid : "";
  }

  public static estDocumentDelivrance(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumFor(typeDocumentUUID);
    // _libelle_court correspond à la catégorie
    return doc.categorie === CATEGORIE_DOCUMENT_DELIVRANCE;
  }

  public static estDocumentDelivranceValide(
    categorieInscription: string,
    documentDemande: DocumentDelivrance
  ): boolean {
    const codeDocumentDemande: string = documentDemande?.code;
    const categorie: string = categorieInscription?.toUpperCase();
    return DocumentDelivrance.controleDocumentDelivranceSelonTypeRepertoire(
      codeDocumentDemande,
      categorie
    );
  }

  public static estExtraitCopie(code: string): boolean {
    return CodesExtraitCopie.includes(code);
  }

  public static estExtraitCopieAsigner(code: string): boolean {
    return CodesExtraitCopieASigner.includes(code);
  }

  public static getCodesAsOptions(codes: string[]) {
    const res = [];
    for (const document of codes) {
      res.push(this.getOptionFromCode(document));
    }
    return res;
  }

  public static getDocumentDelivrance(
    documentDemandeUUID: string
  ): DocumentDelivrance {
    return DocumentDelivrance.getEnumFor(documentDemandeUUID);
  }

  public static getOptionFromCode(code: string) {
    const key = this.getKeyForCode(code);
    return {
      value: this.getKeyForCode(code),
      str: this.getEnumFor(key).libelle
    };
  }

  public static estCourrierDelivranceEC(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumFor(typeDocumentUUID);
    return (
      doc.categorieDocumentDelivrance != null &&
      doc.categorieDocumentDelivrance.startsWith("Courrier") &&
      doc.categorieDocumentDelivrance.includes("délivrance E/C")
    );
  }

  public static getAllCertificatSituationDemandeAsOptions(): Options {
    const options = DocumentDelivrance.getAllEnumsAsOptions();
    return options.filter(
      opt =>
        DocumentDelivrance.getEnumFor(opt.value).categorieDocumentDelivrance ===
        "Certificat de situation demandé"
    );
  }

  public static getNumeroOrdre(uuidTypeDocument: string) {
    let ordre;
    const documentDelivrance = DocumentDelivrance.getEnumFor(uuidTypeDocument);

    if (DocumentDelivrance.estCourrierDAccompagnement(documentDelivrance)) {
      //@ts-ignore
      ordre = ORDRE_DOCUMENTS_DELIVRANCE[COURRIER];
    } else {
      // Recherche spécifique par code
      //@ts-ignore
      ordre = ORDRE_DOCUMENTS_DELIVRANCE[documentDelivrance.code];
      if (!ordre) {
        // Puis recherche plus générale par categorieDocumentDelivrance
        ordre =
          //@ts-ignore{
          ORDRE_DOCUMENTS_DELIVRANCE[
            documentDelivrance.categorieDocumentDelivrance
          ];
      }
    }

    return ordre ? ordre : ORDRE_MAX;
  }

  public static estCourrierDAccompagnement(
    documentDelivrance: DocumentDelivrance
  ) {
    return (
      documentDelivrance.categorieDocumentDelivrance &&
      documentDelivrance.categorieDocumentDelivrance.startsWith(COURRIER)
    );
  }
}
