import { IDecret } from "../etatcivil/commun/IDecret";
import { IRequeteTableauDelivrance } from "../requete/v2/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "../requete/v2/ITitulaireRequeteTableau";
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
import {
  formatLibellesDecrets,
  TypeLibelleDecretComposition
} from "./commun/TypeDecretComposition";

export const NOM_DOCUMENT_CERTIFICAT_SITUATION = "Certificat de situation";
export interface ICertificatSituationComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition,
    ITitulaireComposition {
  decrets: TypeLibelleDecretComposition[];
  phrases_liees: string;
  phrases_pieces_jointes?: string;
}

export const CertificatSituationComposition = {
  creerCertificatSituation(
    titre: string,
    decrets: IDecret[],
    phraseLiees: string,
    requete?: IRequeteTableauDelivrance,
    phrasesPiecesJointes?: string,
    titulaire?: ITitulaireRequeteTableau
  ): ICertificatSituationComposition {
    const certificatSituation = {
      titre,
      phrases_liees: phraseLiees,
      phrases_pieces_jointes: phrasesPiecesJointes,
      decrets: formatLibellesDecrets(decrets)
    } as ICertificatSituationComposition;

    CommunComposition.ajoutParamCommuns(
      certificatSituation,
      requete?.numero,
      undefined,
      titre
    );
    ParametresComposition.ajoutParametres(certificatSituation);
    RequerantComposition.ajoutInfosRequerant(
      certificatSituation,
      requete?.canal,
      requete?.requerant
    );
    TitulaireComposition.ajoutInfosTitulaire(certificatSituation, titulaire);

    return certificatSituation;
  }
};
