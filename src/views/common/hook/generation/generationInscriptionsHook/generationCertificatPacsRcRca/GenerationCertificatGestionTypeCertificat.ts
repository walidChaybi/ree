import { RECEContextData } from "@core/contexts/RECEContext";
import { CertificatRCAComposition, NOM_DOCUMENT_CERTIFICAT_RCA } from "@model/composition/ICertificatRCAComposition";
import { CertificatRCComposition, NOM_DOCUMENT_CERTIFICAT_RC } from "@model/composition/ICertificatRCComposition";
import { CertificatPACSComposition, NOM_DOCUMENT_ATTESTATION_PACS } from "@model/composition/pacs/ICertificatPACSComposition";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { Decret } from "@model/etatcivil/commun/IDecret";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { TypePacsRcRca } from "@model/etatcivil/enum/TypePacsRcRca";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { useContext } from "react";
import SpecificationRC from "../specificationInscriptions/specificationRC";
import { specificationRCA } from "../specificationInscriptions/specificationRCA";

export function getNomDocument(typeCertificat: TypePacsRcRca): string | undefined {
  let nomDocument: string | undefined;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      nomDocument = NOM_DOCUMENT_ATTESTATION_PACS;
      break;
    case TypePacsRcRca.RC:
      nomDocument = NOM_DOCUMENT_CERTIFICAT_RC;
      break;
    case TypePacsRcRca.RCA:
      nomDocument = NOM_DOCUMENT_CERTIFICAT_RCA;
      break;
    default:
      break;
  }
  return nomDocument;
}

export function getTypeDocument(typeCertificat: TypePacsRcRca): string | undefined {
  let uuidTypeDocument: string | undefined;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_ATTESTATION_PACS);
      break;
    case TypePacsRcRca.RC:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_INSCRIPTION_RC);
      break;
    case TypePacsRcRca.RCA:
      uuidTypeDocument = DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_INSCRIPTION_RCA);
      break;
    default:
      break;
  }
  return uuidTypeDocument;
}

export function getTypeFiche(typeCertificat: TypePacsRcRca): TypeFiche | undefined {
  let typeFiche: TypeFiche | undefined;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      typeFiche = TypeFiche.PACS;
      break;
    case TypePacsRcRca.RC:
      typeFiche = TypeFiche.RC;
      break;
    case TypePacsRcRca.RCA:
      typeFiche = TypeFiche.RCA;
      break;
    default:
      break;
  }
  return typeFiche;
}

export const useConstructionCertificatPacsRcRca = (
  typeCertificat: TypePacsRcRca,
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
    case TypePacsRcRca.PACS:
      certificatComposition = CertificatPACSComposition.creerCertificatPACS(
        Decret.getDecretsAttestationPacs(decrets),
        fichePacsOuRcRca as FichePacs,
        requete.canal,
        requete.requerant,
        requete.numero
      );
      break;
    case TypePacsRcRca.RC:
      certificatComposition = CertificatRCComposition.creerCertificatRC(
        SpecificationRC.getElementsJasper(fichePacsOuRcRca as FicheRcRca, decrets, inscriptionsRcRadiation),
        requete?.canal,
        requete?.requerant,
        requete?.numero,
        titulaire
      );
      break;
    case TypePacsRcRca.RCA:
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
