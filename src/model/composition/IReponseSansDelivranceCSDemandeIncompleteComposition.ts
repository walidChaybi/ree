import { IRequete } from "@model/requete/IRequete";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
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
  creerReponseSansDelivranceCS(requete: IRequete) {
    const reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
    ParametresComposition.ajoutParametres(reponseSansDelivranceCS);

    CommunComposition.ajoutParamCommuns(
      reponseSansDelivranceCS,
      requete.numero,
      OBJET_COURRIER_CERTIFICAT_SITUATION
    );

    if (requete.titulaires?.length) {
      reponseSansDelivranceCS.prenom_titulaire = TitulaireRequete.getPrenom1(
        requete.titulaires[0]
      );
      reponseSansDelivranceCS.nom_titulaire =
        requete.titulaires[0].nomNaissance;
    }

    RequerantComposition.ajoutInfosRequerant(
      reponseSansDelivranceCS,
      requete.canal,
      requete.requerant
    );

    return reponseSansDelivranceCS;
  }
};
