import { TypeCanal } from "../requete/v2/enum/TypeCanal";
import { IRequerant } from "../requete/v2/IRequerant";
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

export const NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE = "CARN_CSPAC_01";
export interface IReponseNegativeDemandeIncompleteComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {}

export const ReponseNegativeDemandeIncompleteComposition = {
  creerReponseNegative(
    requerant: IRequerant,
    canal: TypeCanal,
    numeroRequete?: string
  ) {
    const reponseNegative = {} as IReponseNegativeDemandeIncompleteComposition;
    ParametresComposition.ajoutParametres(reponseNegative);

    CommunComposition.ajoutParamCommuns(
      reponseNegative,
      numeroRequete,
      OBJET_COURRIER_CERTIFICAT_SITUATION
    );

    RequerantComposition.ajoutInfosRequerant(reponseNegative, canal, requerant);

    return reponseNegative;
  }
};
