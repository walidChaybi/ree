import { RECEContextData } from "@core/contexts/RECEContext";
import { CertificatRCAComposition, NOM_DOCUMENT_CERTIFICAT_RCA } from "@model/composition/ICertificatRCAComposition";
import { CertificatRCComposition, NOM_DOCUMENT_CERTIFICAT_RC } from "@model/composition/ICertificatRCComposition";
import { CertificatPACSComposition, NOM_DOCUMENT_ATTESTATION_PACS } from "@model/composition/pacs/ICertificatPACSComposition";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { Decret } from "@model/etatcivil/commun/IDecret";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { useContext } from "react";
import SpecificationRC from "../specificationInscriptions/specificationRC";
import { specificationRCA } from "../specificationInscriptions/specificationRCA";

export function getNomDocument(typeCertificat: ETypePacsRcRca): string | undefined {
  let nomDocument: string | undefined;
  switch (typeCertificat) {
    case ETypePacsRcRca.PACS:
      nomDocument = NOM_DOCUMENT_ATTESTATION_PACS;
      break;
    case ETypePacsRcRca.RC:
      nomDocument = NOM_DOCUMENT_CERTIFICAT_RC;
      break;
    case ETypePacsRcRca.RCA:
      nomDocument = NOM_DOCUMENT_CERTIFICAT_RCA;
      break;
    default:
      break;
  }
  return nomDocument;
}

export function getTypeDocument(typeCertificat: ETypePacsRcRca): string | undefined {
  let uuidTypeDocument: string | undefined;
  switch (typeCertificat) {
    case ETypePacsRcRca.PACS:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_ATTESTATION_PACS);
      break;
    case ETypePacsRcRca.RC:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_INSCRIPTION_RC);
      break;
    case ETypePacsRcRca.RCA:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_INSCRIPTION_RCA);
      break;
    default:
      break;
  }
  return uuidTypeDocument;
}

export function getTypeFiche(typeCertificat: ETypePacsRcRca): ETypeFiche | undefined {
  let typeFiche: ETypeFiche | undefined;
  switch (typeCertificat) {
    case ETypePacsRcRca.PACS:
      typeFiche = ETypeFiche.PACS;
      break;
    case ETypePacsRcRca.RC:
      typeFiche = ETypeFiche.RC;
      break;
    case ETypePacsRcRca.RCA:
      typeFiche = ETypeFiche.RCA;
      break;
    default:
      break;
  }
  return typeFiche;
}

export const useConstructionCertificatPacsRcRca = (
  typeCertificat: ETypePacsRcRca,
  fichePacsOuRcRca?: FichePacs | FicheRcRca,
  requete?: IRequeteTableauDelivrance,
  inscriptionsRcRadiation?: IInscriptionRc
): TypeCertificatComposition | undefined => {
  const { decrets } = useContext(RECEContextData);

  let certificatComposition: TypeCertificatComposition | undefined;
  let titulaire: ITitulaireRequeteTableau | undefined;

  if (!requete || !fichePacsOuRcRca) {
    return;
  }
  if (requete.titulaires) {
    titulaire = requete.titulaires[0];
  }

  switch (typeCertificat) {
    case ETypePacsRcRca.PACS:
      certificatComposition = CertificatPACSComposition.creerCertificatPACS(
        Decret.getDecretsAttestationPacs(decrets),
        fichePacsOuRcRca as FichePacs,
        requete.canal,
        requete.requerant,
        requete.numero
      );
      break;
    case ETypePacsRcRca.RC:
      certificatComposition = CertificatRCComposition.creerCertificatRC(
        SpecificationRC.getElementsJasper(fichePacsOuRcRca as FicheRcRca, decrets, inscriptionsRcRadiation),
        requete?.canal,
        requete?.requerant,
        requete?.numero,
        titulaire
      );
      break;
    case ETypePacsRcRca.RCA:
      certificatComposition = CertificatRCAComposition.creerCertificatRCA(
        specificationRCA.getElementsJasper(fichePacsOuRcRca as FicheRcRca, decrets),
        requete?.canal,
        requete?.requerant,
        requete?.numero,
        titulaire
      );
      break;

    default:
      break;
  }

  return certificatComposition;
};
