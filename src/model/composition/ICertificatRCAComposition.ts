import { IElementsJasperCertificatRCA } from "../../views/common/hook/v2/generation/generationInscriptionsHook/GenerationCertificatRCAHook";
import { TypeCanal } from "../requete/v2/enum/TypeCanal";
import { IRequerant } from "../requete/v2/IRequerant";
import { ITitulaireRequeteTableau } from "../requete/v2/IRequeteTableau";
import { ICommunComposition } from "./commun/ICommunComposition";
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

export const NOM_DOCUMENT_CERTIFICAT_RCA = "CERTIFICAT_INSCRIPTION_RCA";
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

    ParametresComposition.ajoutParametres(certificatRCA);
    RequerantComposition.ajoutInfosRequerant(certificatRCA, canal, requerant);
    TitulaireComposition.ajoutInfosTitulaire(certificatRCA, titulaire);

    return certificatRCA;
  }
};
