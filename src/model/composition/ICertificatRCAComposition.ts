import { IElementsJasperCertificatRCA } from "../../views/common/hook/generation/generationInscriptionsHook/specificationInscriptions/specificationRCA";
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

export const NOM_DOCUMENT_CERTIFICAT_RCA = "Certificat d'inscription au RCA";
export interface ICertificatRCAComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition,
    ITitulaireComposition {
  annee_inscription: string;
  numero_inscription: string;
  decision_recue: string;
  interesse_decision: string;
  decision_exequatur: string;
  paragraphe_fin: string;
}

export const CertificatRCAComposition = {
  creerCertificatRCA(
    elementsJasper: IElementsJasperCertificatRCA,
    canal?: TypeCanal,
    requerant?: IRequerant,
    numeroRequete?: string,
    titulaire?: ITitulaireRequeteTableau
  ): ICertificatRCAComposition {
    const certificatRCA = {
      annee_inscription: elementsJasper.anneeInscription,
      numero_inscription: elementsJasper.numeroInscription,
      decision_recue: elementsJasper.decisionRecue,
      interesse_decision: elementsJasper.interesseDecision,
      decision_exequatur: elementsJasper.decisionExequatur
        ? elementsJasper.decisionExequatur
        : "",
      paragraphe_fin: elementsJasper.paragrapheFin
    } as ICertificatRCAComposition;

    CommunComposition.ajoutParamCommuns(certificatRCA, numeroRequete);
    ParametresComposition.ajoutParametres(certificatRCA);
    RequerantComposition.ajoutInfosRequerant(certificatRCA, canal, requerant);
    TitulaireComposition.ajoutInfosTitulaire(certificatRCA, titulaire);

    return certificatRCA;
  }
};
