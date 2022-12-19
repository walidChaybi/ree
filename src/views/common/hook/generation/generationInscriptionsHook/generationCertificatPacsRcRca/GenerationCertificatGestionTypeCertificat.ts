import {
  CertificatRCAComposition,
  NOM_DOCUMENT_CERTIFICAT_RCA
} from "@model/composition/ICertificatRCAComposition";
import {
  CertificatRCComposition,
  NOM_DOCUMENT_CERTIFICAT_RC
} from "@model/composition/ICertificatRCComposition";
import {
  CertificatPACSComposition,
  NOM_DOCUMENT_ATTESTATION_PACS
} from "@model/composition/pacs/ICertificatPACSComposition";
import { TypeCertificatComposition } from "@model/composition/type/TypeCertificatCompoistion";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { TypePacsRcRca } from "@model/etatcivil/enum/TypePacsRcRca";
import { IFichePacs } from "@model/etatcivil/pacs/IFichePacs";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { specificationPACS } from "../specificationInscriptions/specificationPACS";
import { specificationRC } from "../specificationInscriptions/specificationRC";
import { specificationRCA } from "../specificationInscriptions/specificationRCA";

export function getNomDocument(
  typeCertificat: TypePacsRcRca
): string | undefined {
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

export function getTypeDocument(
  typeCertificat: TypePacsRcRca
): string | undefined {
  let uuidTypeDocument: string | undefined;
  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      uuidTypeDocument = DocumentDelivrance.getAttestationPacsUUID();
      break;
    case TypePacsRcRca.RC:
      uuidTypeDocument = DocumentDelivrance.getCertificatInscriptionRcUUID();
      break;
    case TypePacsRcRca.RCA:
      uuidTypeDocument = DocumentDelivrance.getCertificatInscriptionRcaUUID();
      break;
    default:
      break;
  }
  return uuidTypeDocument;
}

export function getTypeFiche(
  typeCertificat: TypePacsRcRca
): TypeFiche | undefined {
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

export function construitCertificatPacsRcRca(
  typeCertificat: TypePacsRcRca,
  requete: IRequeteTableauDelivrance,
  fichePacs: IFichePacs | IFicheRcRca,
  inscriptionsRcRadiation?: IInscriptionRc
): TypeCertificatComposition | undefined {
  let certificatComposition: TypeCertificatComposition | undefined;
  let titulaire: ITitulaireRequeteTableau | undefined;
  if (requete?.titulaires) {
    titulaire = requete.titulaires[0];
  }

  switch (typeCertificat) {
    case TypePacsRcRca.PACS:
      certificatComposition = CertificatPACSComposition.creerCertificatPACS(
        specificationPACS.getElementsJasper().decrets,
        fichePacs as IFichePacs,
        requete.canal,
        requete.requerant,
        requete.numero
      );
      break;
    case TypePacsRcRca.RC:
      certificatComposition = CertificatRCComposition.creerCertificatRC(
        specificationRC.getElementsJasper(
          fichePacs as IFicheRcRca,
          inscriptionsRcRadiation
        ),
        requete?.canal,
        requete?.requerant,
        requete?.numero,
        titulaire
      );
      break;
    case TypePacsRcRca.RCA:
      certificatComposition = CertificatRCAComposition.creerCertificatRCA(
        specificationRCA.getElementsJasper(fichePacs as IFicheRcRca),
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
}
