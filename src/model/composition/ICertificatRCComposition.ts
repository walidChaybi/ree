import { TypeCanal } from "../requete/enum/TypeCanal";
import { IRequerant } from "../requete/IRequerant";
import { ITitulaireRequeteTableau } from "../requete/ITitulaireRequeteTableau";
import {
  CommunComposition,
  ICommunComposition
} from "./commun/ICommunComposition";
import {
  IParametresComposition,
  ParametresComposition
} from "./commun/IParametresComposition";
import {
  IRequerantComposition,
  RequerantComposition
} from "./commun/IRequerantComposition";
import {
  ITitulaireComposition,
  TitulaireComposition
} from "./commun/ITitulaireComposition";

export const NOM_DOCUMENT_CERTIFICAT_RC = "Certificat d'inscription au RC";

export interface IElementsJasperCertificatRC {
  anneeInscription?: string;
  numeroInscription?: string;
  decisionRecue1?: string;
  decisionRecue2?: string;
  interesseDecision?: string;
  regime?: string;
  renouvellementModification?: string;
  decisionExequatur?: string;
  duree?: string;
  paragrapheFin?: string;
}
export interface ICertificatRCComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition,
    ITitulaireComposition {
  annee_inscription: string;
  numero_inscription: string;
  decision_recue_1: string;
  decision_recue_2: string;
  interesse_decision: string;
  regime: string;
  renouvellement_modification: string;
  decision_exequatur: string;
  duree: string;
  paragraphe_fin: string;
}

export const CertificatRCComposition = {
  creerCertificatRC(
    elementsJasper: IElementsJasperCertificatRC,
    canal?: TypeCanal,
    requerant?: IRequerant,
    numeroRequete?: string,
    titulaire?: ITitulaireRequeteTableau
  ): ICertificatRCComposition {
    const certificatRC = {
      annee_inscription: elementsJasper.anneeInscription,
      numero_inscription: elementsJasper.numeroInscription,
      decision_recue_1: elementsJasper.decisionRecue1,
      decision_recue_2: elementsJasper.decisionRecue2,
      interesse_decision: elementsJasper.interesseDecision,
      regime: elementsJasper.regime,
      renouvellement_modification: elementsJasper.renouvellementModification,
      decision_exequatur: elementsJasper.decisionExequatur
        ? elementsJasper.decisionExequatur
        : "",
      duree: elementsJasper.duree,
      paragraphe_fin: elementsJasper.paragrapheFin
    } as ICertificatRCComposition;

    CommunComposition.ajoutParamCommuns(certificatRC, numeroRequete);
    ParametresComposition.ajoutParametres(certificatRC);
    RequerantComposition.ajoutInfosRequerant(certificatRC, canal, requerant);
    TitulaireComposition.ajoutInfosTitulaire(certificatRC, titulaire);

    return certificatRC;
  }
};
