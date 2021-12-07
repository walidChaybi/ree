import { TypeCanal } from "../requete/enum/TypeCanal";
import { IRequerant } from "../requete/IRequerant";
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
export interface IReponseSansDelivranceCSDemandeIncompleteComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {}

export const ReponseSansDelivranceCSDemandeIncompleteComposition = {
  creerReponseSansDelivranceCS(
    requerant: IRequerant,
    canal: TypeCanal,
    numeroRequete?: string
  ) {
    const reponseSansDelivranceCS = {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
    ParametresComposition.ajoutParametres(reponseSansDelivranceCS);

    CommunComposition.ajoutParamCommuns(
      reponseSansDelivranceCS,
      numeroRequete,
      OBJET_COURRIER_CERTIFICAT_SITUATION
    );

    RequerantComposition.ajoutInfosRequerant(
      reponseSansDelivranceCS,
      canal,
      requerant
    );

    return reponseSansDelivranceCS;
  }
};
