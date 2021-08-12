import { getValeurOuVide } from "../../views/common/util/Utils";
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

export const NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE = "CARN_CSPAC_01.pdf";
export interface IReponseNegativeDemandeIncompleteComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {}

export const ReponseNegativeDemandeIncompleteComposition = {
  creerReponseNegative(
    objet: string,
    requerant: IRequerant,
    numeroRequete?: string
  ) {
    const reponseNegative = {} as IReponseNegativeDemandeIncompleteComposition;
    ParametresComposition.ajoutParametres(reponseNegative);

    CommunComposition.ajoutParametres(
      reponseNegative,
      getValeurOuVide(numeroRequete),
      objet
    );

    reponseNegative.identite_requerant = `${requerant.nomFamille} ${requerant.prenom}`;
    RequerantComposition.ajoutInfosRequerant(reponseNegative, requerant);

    return reponseNegative;
  }
};
