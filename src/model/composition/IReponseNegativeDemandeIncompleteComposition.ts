import { IRequerant } from "../requete/v2/IRequerant";
import { ICommunComposition } from "./commun/ICommunComposition";
import {
  IParametresComposition,
  ParametresComposition
} from "./commun/IParametresComposition";
import {
  IRequerantComposition,
  RequerantComposition
} from "./commun/IRequerantComposition";

export const NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE = "CARN_CSPAC_01.pdf";
export interface IReponseNegativeDemandeIncompleteComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {}

export const ReponseNegativeDemandeIncompleteComposition = {
  creerReponseNegative(objet: string, requerant: IRequerant) {
    const reponseNegative = {} as IReponseNegativeDemandeIncompleteComposition;
    ParametresComposition.ajoutParametres(reponseNegative);

    reponseNegative.objet_courrier = objet;

    reponseNegative.identite_requerant = `${requerant.nomFamille} ${requerant.prenom}`;
    RequerantComposition.ajoutInfosRequerant(reponseNegative, requerant);
    return reponseNegative;
  }
};
