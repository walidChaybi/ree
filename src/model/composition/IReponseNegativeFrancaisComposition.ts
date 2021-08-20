import { IRequeteDelivrance } from "../requete/v2/IRequeteDelivrance";
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
import { OBJET_COURRIER_CERTIFICAT_SITUATION } from "./ObjetsComposition";

export const NOM_DOCUMENT_REFUS_FRANCAIS = "CARN_CSPAC_02";
export interface IReponseNegativeFrancaisComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  url: string;
}

export const ReponseNegativeFrancaisComposition = {
  creerReponseNegative(requete: IRequeteDelivrance) {
    const reponseNegative = {} as IReponseNegativeFrancaisComposition;
    ParametresComposition.ajoutParametres(reponseNegative);

    CommunComposition.ajoutParametres(
      reponseNegative,
      requete.numero,
      OBJET_COURRIER_CERTIFICAT_SITUATION
    );

    reponseNegative.url = "https://www.service-public.fr";

    RequerantComposition.ajoutInfosRequerant(
      reponseNegative,
      requete.canal,
      requete.requerant
    );

    return reponseNegative;
  }
};
