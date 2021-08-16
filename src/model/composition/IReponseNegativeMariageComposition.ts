import { IFicheActe } from "../etatcivil/acte/IFicheActe";
import { TitulaireActe } from "../etatcivil/acte/ITitulaireActe";
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

export const NOM_DOCUMENT_REFUS_MARIAGE = "CARN_CS_01.pdf";
export interface IReponseNegativeMariageComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  document_demande: string;
  nom_titulaire1: string;
  prenoms_titulaire1: string;
  nom_titulaire2: string;
  prenoms_titulaire2: string;
}

export const ReponseNegativeMariageComposition = {
  creerReponseNegative(requete: IRequeteDelivrance, infoActe: IFicheActe) {
    const reponseNegative = {} as IReponseNegativeMariageComposition;
    ParametresComposition.ajoutParametres(reponseNegative);

    CommunComposition.ajoutParametres(reponseNegative, requete.numero);

    reponseNegative.document_demande = requete.documentDemande.libelle;

    reponseNegative.identite_requerant = `${requete.requerant.nomFamille} ${requete.requerant.prenom}`;
    RequerantComposition.ajoutInfosRequerant(
      reponseNegative,
      requete.requerant
    );

    if (requete.titulaires) {
      reponseNegative.nom_titulaire1 = TitulaireActe.getNom(
        infoActe.titulaires[0]
      );
      reponseNegative.prenoms_titulaire1 = TitulaireActe.getPrenoms(
        infoActe.titulaires[0]
      );
      reponseNegative.nom_titulaire2 = TitulaireActe.getNom(
        infoActe.titulaires[1]
      );
      reponseNegative.prenoms_titulaire2 = TitulaireActe.getPrenoms(
        infoActe.titulaires[1]
      );
    }

    return reponseNegative;
  }
};
