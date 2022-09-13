import { getValeurOuVide } from "@util/Utils";
import { Decret, IDecret } from "../../etatcivil/commun/IDecret";
import { IFichePacs } from "../../etatcivil/pacs/IFichePacs";
import { TypeCanal } from "../../requete/enum/TypeCanal";
import { IRequerant } from "../../requete/IRequerant";
import {
  CommunComposition,
  ICommunComposition
} from "../commun/ICommunComposition";
import {
  IParametresComposition,
  ParametresComposition
} from "../commun/IParametresComposition";
import {
  IRequerantComposition,
  RequerantComposition
} from "../commun/IRequerantComposition";
import {
  formatLibellesDecrets,
  TypeLibelleDecretComposition
} from "../commun/TypeDecretComposition";
import { ParagrapheComposition } from "./IParagraphesPacsComposition";
import {
  IPartenaire1Composition,
  IPartenaire2Composition,
  PartenaireComposition
} from "./IPartenaireComposition";

export const NOM_DOCUMENT_ATTESTATION_PACS = "Attestation PACS";

export interface ICertificatPACSComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition,
    IPartenaire1Composition,
    IPartenaire2Composition {
  numero_fiche_pac: string;
  decrets: TypeLibelleDecretComposition[];
  decret_fin?: string;
  paragraphe_enregistrement: string;
  paragraphe_modification?: string;
  paragraphe_dissolution?: string;
  paragraphe_annulation?: string;
}

export const CertificatPACSComposition = {
  creerCertificatPACS(
    decrets: IDecret[],
    fichePacs: IFichePacs,
    canal?: TypeCanal,
    requerant?: IRequerant,
    numeroRequete?: string
  ): ICertificatPACSComposition {
    const certificatPACS = {
      numero_fiche_pac: formatNumeroPacs(fichePacs?.annee, fichePacs?.numero),
      decrets: formatLibellesDecrets(decrets),
      decret_fin: Decret.getLibelleDecretPrincipalAttestationPacs(decrets)
    } as ICertificatPACSComposition;

    CommunComposition.ajoutParamCommuns(certificatPACS, numeroRequete);
    ParametresComposition.ajoutParametres(certificatPACS);
    RequerantComposition.ajoutInfosRequerant(certificatPACS, canal, requerant);
    if (fichePacs && fichePacs.partenaires) {
      PartenaireComposition.ajoutInfosPartenaire1(
        certificatPACS,
        fichePacs.partenaires[0]
      );
      PartenaireComposition.ajoutInfosPartenaire2(
        certificatPACS,
        fichePacs.partenaires[1]
      );
    }

    ParagrapheComposition.ajoutParagrapheEnregistrementPACS(
      certificatPACS,
      fichePacs
    );
    if (fichePacs.modifications && fichePacs.modifications.length > 0) {
      ParagrapheComposition.ajoutParagrapheModificationPACS(
        certificatPACS,
        fichePacs.modifications
      );
    }
    if (fichePacs.dissolution) {
      ParagrapheComposition.ajoutParagrapheDissolutionPACS(
        certificatPACS,
        fichePacs.dissolution
      );
    }
    if (fichePacs.annulation) {
      ParagrapheComposition.ajoutParagrapheAnnulationPACS(
        certificatPACS,
        fichePacs.annulation
      );
    }
    return certificatPACS;
  }
};

function formatNumeroPacs(annee?: string, numero?: string) {
  return `${getValeurOuVide(annee)} - ${getValeurOuVide(numero)}`;
}
