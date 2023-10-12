import { IRequete } from "@model/requete/IRequete";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { TypeCanal } from "../requete/enum/TypeCanal";
import { OBJET_COURRIER_CERTIFICAT_SITUATION } from "./ObjetsComposition";
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

export const NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT = "CARN_PAC_01";
export interface IReponseSansDelivranceCSPACSNonInscritComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  nom_titulaire1: string;
  prenoms_titulaire1: string;
}

export const ReponseSansDelivranceCSPACSNonInscritComposition = {
  creerReponseSansDelivranceCS(requete: IRequete, canal?: TypeCanal) {
    const reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSPACSNonInscritComposition;
    ParametresComposition.ajoutParametres(reponseSansDelivranceCS);

    CommunComposition.ajoutParamCommuns(
      reponseSansDelivranceCS,
      requete.numero,
      OBJET_COURRIER_CERTIFICAT_SITUATION
    );

    RequerantComposition.ajoutInfosRequerant(
      reponseSansDelivranceCS,
      canal,
      requete.requerant
    );

    if (requete.titulaires?.length) {
      reponseSansDelivranceCS.nom_titulaire1 = TitulaireRequete.getNom(
        requete.titulaires[0]
      );

      reponseSansDelivranceCS.prenoms_titulaire1 = TitulaireRequete.getPrenoms(
        requete.titulaires[0]
      );
    }

    return reponseSansDelivranceCS;
  }
};
