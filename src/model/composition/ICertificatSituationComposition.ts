import { IDecret } from "../etatcivil/commun/IDecret";
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
    canal?: TypeCanal,
    phrasesPiecesJointes?: string,
    requerant?: IRequerant,
    titulaire?: ITitulaireRequeteTableau
  ): ICertificatSituationComposition {
    const certificatSituation = {
      titre,
      phrases_liees: phraseLiees,
      phrases_pieces_jointes: phrasesPiecesJointes,
      decrets: formatLibellesDecrets(decrets)
    } as ICertificatSituationComposition;

    ParametresComposition.ajoutParametres(certificatSituation);
    RequerantComposition.ajoutInfosRequerant(
      certificatSituation,
      canal,
      requerant
    );
    TitulaireComposition.ajoutInfosTitulaire(certificatSituation, titulaire);

    return certificatSituation;
  }
};
