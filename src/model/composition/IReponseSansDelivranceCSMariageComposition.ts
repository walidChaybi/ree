import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { formatPrenoms } from "@util/Utils";
import { FicheActe, IFicheActe } from "../etatcivil/acte/IFicheActe";
import { TitulaireActe } from "../etatcivil/acte/ITitulaireActe";
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

export const NOM_DOCUMENT_REFUS_MARIAGE = "CARN_CS_01";
export interface IReponseSansDelivranceCSMariageComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  nom_titulaire1: string;
  prenoms_titulaire1: string;
  nom_titulaire2: string;
  prenoms_titulaire2: string;
  reference_acte: string;
}

export const ReponseSansDelivranceCSMariageComposition = {
  creerReponseSansDelivranceCS(
    requete: IRequeteDelivrance,
    infoActe: IFicheActe
  ) {
    const reponseSansDelivranceCS =
      {} as IReponseSansDelivranceCSMariageComposition;
    ParametresComposition.ajoutParametres(reponseSansDelivranceCS);

    CommunComposition.ajoutParamCommuns(
      reponseSansDelivranceCS,
      requete.numero
    );

    RequerantComposition.ajoutInfosRequerant(
      reponseSansDelivranceCS,
      requete.canal,
      requete.requerant
    );

    reponseSansDelivranceCS.reference_acte = FicheActe.getReference(infoActe);

    if (requete.titulaires?.length) {
      reponseSansDelivranceCS.prenom_titulaire = TitulaireRequete.getPrenom1(
        requete.titulaires[0]
      );
      reponseSansDelivranceCS.nom_titulaire =
        requete.titulaires[0].nomNaissance;
      reponseSansDelivranceCS.nom_titulaire1 = TitulaireActe.getNom(
        infoActe.titulaires[0]
      );
      reponseSansDelivranceCS.prenoms_titulaire1 = formatPrenoms(
        infoActe.titulaires[0].prenoms
      );
      reponseSansDelivranceCS.nom_titulaire2 = TitulaireActe.getNom(
        infoActe.titulaires[1]
      );
      reponseSansDelivranceCS.prenoms_titulaire2 = formatPrenoms(
        infoActe.titulaires[1].prenoms
      );
    }

    return reponseSansDelivranceCS;
  }
};
