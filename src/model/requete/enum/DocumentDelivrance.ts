/* v8 ignore start */
import { ETypeRcRcaPacs } from "@model/etatcivil/enum/ETypeRcRcaPacs";
import { Option } from "@util/Type";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { ChoixDelivrance } from "./ChoixDelivrance";

const CATEGORIE_DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";

export enum ECodeDocumentDelivrance {
  CODE_CERTIFICAT_SITUATION_PACS = "CERTIFICAT_SITUATION_PACS",
  CODE_CERTIFICAT_SITUATION_PACS_RC = "CERTIFICAT_SITUATION_PACS_RC",
  CODE_CERTIFICAT_SITUATION_PACS_RCA = "CERTIFICAT_SITUATION_PACS_RCA",
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA = "CERTIFICAT_SITUATION_PACS_RC_RCA",
  CODE_CERTIFICAT_SITUATION_RC = "CERTIFICAT_SITUATION_RC",
  CODE_CERTIFICAT_SITUATION_RCA = "CERTIFICAT_SITUATION_RCA",
  CODE_CERTIFICAT_SITUATION_RC_RCA = "CERTIFICAT_SITUATION_RC_RCA",
  CODE_ATTESTATION_PACS = "ATTESTATION_PACS",
  CODE_CERTIFICAT_INSCRIPTION_RC = "CERTIFICAT_INSCRIPTION_RC",
  CODE_CERTIFICAT_INSCRIPTION_RCA = "CERTIFICAT_INSCRIPTION_RCA",
  INFORMATION_DIVERSES_MANQUANTE = "CARN_EC_117",
  MANDAT_GENEALOGIQUE = "CARN_EC_18",
  JUSTIFICATIF_REPRESENTANT_MANQUANT = "CARN_EC_19",
  ACTE_NON_TROUVE = "CARN_EC_115",
  ACTE_NON_TROUVE_ALGERIE = "CARN_EC_64",
  ACTE_NAISSANCE_NON_TROUVE_MARIAGE = "CARN_EC_24",
  ATTESTATION_PENSION = "CARN_EC_APR",
  PROPOSITION_TRANSCRIPTION = "CARN_EC_PTA",
  DIVERS = "CARN_EC_17",
  REFUS_DELIVRANCE_MARIAGE = "CARN_EC_RDM",
  DELIVRANCE_ACTE_NON_ANTHENTIQUE = "CAD_ARCH_118",
  DELIVRANCE_ACTE = "CAD_EC_116",
  DELIVRANCE_ACTE_INCOMPLET = "CAD_EC_50",
  CODE_COPIE_INTEGRALE = "COPIE_INTEGRALE",
  CODE_COPIE_NON_SIGNEE = "COPIE_NON_SIGNEE",
  CODE_DECISION_PROTECTION = "DECISION_PROTECTION",
  CODE_EXTRAIT_AVEC_FILIATION = "EXTRAIT_AVEC_FILIATION",
  CODE_EXTRAIT_PLURILINGUE = "EXTRAIT_PLURILINGUE",
  CODE_EXTRAIT_SANS_FILIATION = "EXTRAIT_SANS_FILIATION",
  COURRIER = "Courrier"
}

const CodesExtraitCopieASigner = [
  ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE,
  ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION,
  ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE,
  ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION
];

const CodesRC = [
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_INSCRIPTION_RC,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC,
  ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC_RCA
];

export const CodesExtraitCopie = [...CodesExtraitCopieASigner, ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE];

const ORDRE_MAX = 999;

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

export interface IDocumentDelivrance {
  id: string;
  categorie: string;
  code: string;
  libelle: string;
  categorieDocumentDelivrance: string;
  texteLibre: boolean;
  correspondanceDila: boolean;
}

export class DocumentDelivrance {
  private static liste: IDocumentDelivrance[] | null = null;

  public static init(documentDelivrance: IDocumentDelivrance[]) {
    if (DocumentDelivrance.liste !== null) {
      return;
    }

    DocumentDelivrance.liste = documentDelivrance;
  }

  /**
   *
   * Méthode contrôlant que le document demandé est en accord avec un résultat de la RMC
   *
   * @param codeDocumentDemande
   * @param categorieInscription
   */
  private static controleDocumentDelivranceSelonTypeRepertoire(codeDocumentDemande: string, categorieInscription: string): boolean {
    switch (codeDocumentDemande) {
      case ECodeDocumentDelivrance.CODE_ATTESTATION_PACS:
        return ETypeRcRcaPacs.PACS === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS:
        return ETypeRcRcaPacs.PACS === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC:
        return ETypeRcRcaPacs.PACS === categorieInscription || ETypeRcRcaPacs.RC === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RCA:
        return ETypeRcRcaPacs.PACS === categorieInscription || ETypeRcRcaPacs.RCA === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC_RCA:
        return true;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC:
        return ETypeRcRcaPacs.RC === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RCA:
        return ETypeRcRcaPacs.RCA === categorieInscription;

      case ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC_RCA:
        return ETypeRcRcaPacs.RC === categorieInscription || ETypeRcRcaPacs.RCA === categorieInscription;

      default:
        return false;
    }
  }

  public static depuisId(id?: string | null): IDocumentDelivrance | null {
    return DocumentDelivrance.liste?.find(documentDelivrance => documentDelivrance.id === id) ?? null;
  }

  public static depuisCode(code: string): IDocumentDelivrance | null {
    return DocumentDelivrance.liste?.find(documentDelivrance => documentDelivrance.code === code) ?? null;
  }

  public static idDepuisCode(code: string): string {
    return DocumentDelivrance.depuisCode(code)?.id ?? "";
  }

  public static getCopieIntegraleUUID(): string {
    return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE);
  }

  public static getChoixDelivranceFromUUID(uuid: string) {
    switch (uuid) {
      case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE):
        return ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
      case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
      case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
      case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE):
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE;
      case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE):
        return ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
      default:
        return ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
    }
  }

  public static estDocumentDelivrance(uuid: string): boolean {
    return DocumentDelivrance.depuisId(uuid)?.categorie === CATEGORIE_DOCUMENT_DELIVRANCE;
  }

  public static estDocumentDelivranceValide(categorieInscription: string, documentDemande: IDocumentDelivrance | null): boolean {
    const codeDocumentDemande: string = documentDemande?.code ?? "";
    const categorie: string = categorieInscription.toUpperCase();
    return DocumentDelivrance.controleDocumentDelivranceSelonTypeRepertoire(codeDocumentDemande, categorie);
  }

  public static estExtraitCopieViaCode(code: string): boolean {
    return CodesExtraitCopie.includes(code as ECodeDocumentDelivrance);
  }

  public static estExtraitCopieViaUUID(uuid: string): boolean {
    return CodesExtraitCopie.includes((DocumentDelivrance.depuisId(uuid)?.code ?? "") as ECodeDocumentDelivrance);
  }

  public static estExtraitCopieAsigner(uuid?: string | null): boolean {
    return CodesExtraitCopieASigner.includes((DocumentDelivrance.depuisId(uuid)?.code ?? "") as ECodeDocumentDelivrance);
  }

  public static estExtraitAvecOuSansFilliation(uuid?: string): boolean {
    const code = DocumentDelivrance.depuisId(uuid)?.code;
    return code === ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION || code === ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION;
  }

  public static estExtraitAvecFilliation(uuid?: string): boolean {
    return DocumentDelivrance.depuisId(uuid)?.code === ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION;
  }

  public static estExtraitPlurilingue(uuid?: string): boolean {
    return DocumentDelivrance.depuisId(uuid)?.code === ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE;
  }

  public static estCopieIntegrale(uuid?: string): boolean {
    return DocumentDelivrance.depuisId(uuid)?.code === ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE;
  }

  public static estAttestationPacs(uuid?: string): boolean {
    return DocumentDelivrance.depuisId(uuid)?.code === ECodeDocumentDelivrance.CODE_ATTESTATION_PACS;
  }

  public static versOptionsDepuisCodes(codes: string[]): Option[] {
    return codes.map(code => DocumentDelivrance.versOptionDepuisCode(code));
  }

  public static versOptionDepuisCode(code: string): Option {
    const document = DocumentDelivrance.depuisCode(code);
    return {
      cle: document?.id ?? "",
      libelle: document?.libelle ?? ""
    };
  }

  public static estCourrierDelivranceEC(typeDocumentUUID: string): boolean {
    const categorieDocument = DocumentDelivrance.depuisId(typeDocumentUUID)?.categorieDocumentDelivrance;
    return Boolean(categorieDocument?.startsWith("Courrier") && categorieDocument?.includes("délivrance E/C"));
  }

  public static getAllCertificatSituationDemandeEtAttestationAsOptions(): Option[] {
    return (
      DocumentDelivrance.liste
        ?.filter(
          documentDelivrance =>
            documentDelivrance.categorieDocumentDelivrance === "Certificat de situation demandé" ||
            (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES_VIA_SAGA) &&
              documentDelivrance.categorieDocumentDelivrance === "Attestation")
        )
        .map(documentDelivrance => ({ cle: documentDelivrance.id, libelle: documentDelivrance.libelle })) ?? []
    );
  }

  public static getNumeroOrdre(uuid: string) {
    const documentDelivrance = DocumentDelivrance.depuisId(uuid);

    return DocumentDelivrance.estCourrierDAccompagnement(documentDelivrance)
      ? //@ts-ignore
        ORDRE_DOCUMENTS_DELIVRANCE[ECodeDocumentDelivrance.COURRIER]
      : // Recherche spécifique par code puis recherche plus générale par categorieDocumentDelivrance
        //@ts-ignore
        ORDRE_DOCUMENTS_DELIVRANCE[documentDelivrance.code] ||
          //@ts-ignore
          ORDRE_DOCUMENTS_DELIVRANCE[documentDelivrance.categorieDocumentDelivrance] ||
          ORDRE_MAX;
  }

  public static estCourrierDAccompagnement(documentDelivrance: IDocumentDelivrance | null): boolean {
    return Boolean(documentDelivrance?.categorieDocumentDelivrance?.startsWith(ECodeDocumentDelivrance.COURRIER));
  }

  public static estDocumentDemandeDeTypeRc(document: IDocumentDelivrance | null): boolean {
    return CodesRC.includes(document?.code as ECodeDocumentDelivrance);
  }

  public static getTypeDocument(choixDelivrance?: ChoixDelivrance): string | null {
    switch (choixDelivrance) {
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
        return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION);
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
        return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION);
      case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
        return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE);
      case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
        return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE);
      case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
        return DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_NON_SIGNEE);
      // FIXME A Compléter
      default:
        return null;
    }
  }
}
/* v8 ignore end */
