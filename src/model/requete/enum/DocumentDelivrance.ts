/* istanbul ignore file */
import { peupleDocumentDelivrance } from "../../../api/nomenclature/NomenclatureRequete";
import { EnumNomemclature } from "../../../views/common/util/enum/EnumNomenclature";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { FeatureFlag } from "../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { Options } from "../../../views/common/util/Type";
import { getValeurOuVide } from "../../../views/common/util/Utils";
import { TypeRepertoire } from "../../etatcivil/enum/TypeRepertoire";
import { ChoixDelivrance } from "./ChoixDelivrance";
import {
  CODE_ATTESTATION_PACS,
  CODE_CERTIFICAT_INSCRIPTION_RC,
  CODE_CERTIFICAT_INSCRIPTION_RCA,
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA,
  CODE_COPIE_INTEGRALE,
  CODE_COPIE_NON_SIGNEE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
} from "./DocumentDelivranceConstante";

const CARN_PAC_01 = "CARN_PAC_01";
const CATEGORIE_DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
const CERTIFICAT_SITUATION_PREFIX = "CERTIFICAT_SITUATION";

const CodesExtraitCopieASigner = [
  CODE_COPIE_INTEGRALE,
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_PLURILINGUE,
  CODE_EXTRAIT_SANS_FILIATION
];

export const CodesExtraitCopie = [
  ...CodesExtraitCopieASigner,
  CODE_COPIE_NON_SIGNEE
];

const ORDRE_MAX = 999;

export const COURRIER = "Courrier";
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

  public static getEnumForUUID(key: string): DocumentDelivrance {
    return EnumWithLibelle.getEnumFor(key, DocumentDelivrance);
  }

  public static getEnumForCode(code: string): DocumentDelivrance {
    return DocumentDelivrance.getEnumForUUID(
      DocumentDelivrance.getKeyForCode(code)
    );
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
      DocumentDelivrance.getEnumForUUID(opt.value).code.startsWith(
        CERTIFICAT_SITUATION_PREFIX
      )
    );
  }

  public static getCopieIntegraleUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_COPIE_INTEGRALE
    );
    return getValeurOuVide(uuid);
  }

  public static typeDocumentCorrespondACode(
    typeDocument: string,
    code: string
  ) {
    return (
      DocumentDelivrance.getEnumForUUID(typeDocument).code ===
      DocumentDelivrance.getEnumForCode(code).code
    );
  }

  public static getCourrierNonDelivranceAttestationPacsUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CARN_PAC_01
    );
    return getValeurOuVide(uuid);
  }

  public static getAttestationPacsUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_ATTESTATION_PACS
    );
    return getValeurOuVide(uuid);
  }

  public static getCertificatInscriptionRcUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_CERTIFICAT_INSCRIPTION_RC
    );
    return getValeurOuVide(uuid);
  }

  public static getCertificatInscriptionRcaUUID(): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      CODE_CERTIFICAT_INSCRIPTION_RCA
    );
    return getValeurOuVide(uuid);
  }

  public static getUuidFromDocument(document: DocumentDelivrance): string {
    const uuid = EnumNomemclature.getKeyForCode(
      DocumentDelivrance,
      document.code
    );
    return getValeurOuVide(uuid);
  }

  public static getUuidFromCode(code: string): string {
    const uuid = EnumNomemclature.getKeyForCode(DocumentDelivrance, code);
    return getValeurOuVide(uuid);
  }

  public static getChoixDelivranceFromUUID(uuid: string) {
    switch (uuid) {
      case DocumentDelivrance.getUuidFromCode(CODE_COPIE_INTEGRALE):
        return ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
      case DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_AVEC_FILIATION):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
      case DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_SANS_FILIATION):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
      case DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_PLURILINGUE):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE;
      case DocumentDelivrance.getUuidFromCode(CODE_COPIE_NON_SIGNEE):
        return ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
      default:
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
    }
  }

  public static estDocumentDelivrance(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumForUUID(typeDocumentUUID);
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

  public static getCodeForKey(key: string): string {
    return DocumentDelivrance.getCodeForLibelle(
      DocumentDelivrance,
      DocumentDelivrance.getEnumForUUID(key).libelle
    );
  }

  public static estExtraitAvecOuSansFilliation(key?: string): boolean {
    const code = key ? DocumentDelivrance.getCodeForKey(key) : undefined;
    return (
      code === CODE_EXTRAIT_SANS_FILIATION ||
      code === CODE_EXTRAIT_AVEC_FILIATION
    );
  }

  public static estExtraitPlurilingue(key?: string): boolean {
    const code = key ? DocumentDelivrance.getCodeForKey(key) : undefined;
    return code === CODE_EXTRAIT_PLURILINGUE;
  }

  public static estCopieIntegrale(uuid?: string): boolean {
    return uuid
      ? DocumentDelivrance.getDocumentDelivrance(uuid).code ===
          CODE_COPIE_INTEGRALE
      : false;
  }

  public static estExtraitCopieAsigner(code: string): boolean {
    return CodesExtraitCopieASigner.includes(code);
  }

  public static estAttestationPacs(uuid?: string): boolean {
    return uuid
      ? DocumentDelivrance.getDocumentDelivrance(uuid).code ===
          CODE_ATTESTATION_PACS
      : false;
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
    return DocumentDelivrance.getEnumForUUID(documentDemandeUUID);
  }

  public static getOptionFromCode(code: string) {
    const key = this.getKeyForCode(code);
    return {
      value: this.getKeyForCode(code),
      str: this.getEnumForUUID(key).libelle
    };
  }

  public static estCourrierDelivranceEC(typeDocumentUUID: string): boolean {
    const doc = DocumentDelivrance.getEnumForUUID(typeDocumentUUID);
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
        DocumentDelivrance.getEnumForUUID(opt.value)
          .categorieDocumentDelivrance === "Certificat de situation demandé"
    );
  }

  public static getAllCertificatSituationDemandeEtAttestationAsOptions(): Options {
    const options = DocumentDelivrance.getAllEnumsAsOptions();
    return options.filter(
      opt =>
        DocumentDelivrance.getEnumForUUID(opt.value)
          .categorieDocumentDelivrance === "Certificat de situation demandé" ||
        (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
          DocumentDelivrance.getEnumForUUID(opt.value)
            .categorieDocumentDelivrance === "Attestation")
    );
  }

  public static getNumeroOrdre(uuidTypeDocument: string) {
    let ordre;
    const documentDelivrance =
      DocumentDelivrance.getEnumForUUID(uuidTypeDocument);

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
