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

export const NOM_DOCUMENT_CERTIFICAT_SITUATION = "CERTIFICAT_SITUATION";
export interface ICertificatSituationComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition,
    ITitulaireComposition {
  decret1: string;
  decret2: string;
  decret3: string;
  decret4: string;
  decret5: string;
  decret6: string;

  phrases_liees: string;
  phrases_pieces_jointes?: string;
}

export const CertificatSituationComposition = {
  creerCertificatSituation(
    titre: string,
    decrets: string[],
    phraseLiees: string,
    canal?: TypeCanal,
    phrasesPiecesJointes?: string,
    requerant?: IRequerant,
    titulaire?: ITitulaireRequeteTableau
  ): ICertificatSituationComposition {
    const certificatSituation = {
      titre,
      phrases_liees: phraseLiees,
      phrases_pieces_jointes: phrasesPiecesJointes
    } as ICertificatSituationComposition;

    if (decrets) {
      decrets.forEach((decret, idx) => {
        //@ts-ignore
        certificatSituation[`decret${idx + 1}`] = decret;
      });
    }

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
