import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IRequeteDelivrance } from "../requete/IRequeteDelivrance";
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
export interface IReponseSansDelivranceCSFrancaisComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  url: string;
}

export const ReponseSansDelivranceCSFrancaisComposition = {
  creerReponseSansDelivranceCS(requete: IRequeteDelivrance) {
    const reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSFrancaisComposition;
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

    reponseSansDelivranceCS.url = "https://www.service-public.fr";

    RequerantComposition.ajoutInfosRequerant(
      reponseSansDelivranceCS,
      requete.canal,
      requete.requerant
    );

    return reponseSansDelivranceCS;
  }
};
