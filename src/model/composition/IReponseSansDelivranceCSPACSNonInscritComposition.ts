import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
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

export const NOM_DOCUMENT_REFUS_PACS_NON_INSCRIT = "CARN_PAC_01";
export interface IReponseSansDelivranceCSPACSNonInscritComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  nom_titulaire1: string;
  prenoms_titulaire1: string;
}

export const ReponseSansDelivranceCSPACSNonInscritComposition = {
  creerReponseSansDelivranceCS(
    requerant: IRequerant,
    canal: TypeCanal,
    titulaire?: ITitulaireRequete,
    numeroRequete?: string
  ) {
    const reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSPACSNonInscritComposition;
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

    if (titulaire) {
      reponseSansDelivranceCS.nom_titulaire1 =
        TitulaireRequete.getNom(titulaire);
      reponseSansDelivranceCS.prenoms_titulaire1 =
        TitulaireRequete.getPrenoms(titulaire);
    }

    return reponseSansDelivranceCS;
  }
};
