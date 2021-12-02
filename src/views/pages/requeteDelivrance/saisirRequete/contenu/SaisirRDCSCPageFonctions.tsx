import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "../../../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { TypeCanal } from "../../../../../model/requete/v2/enum/TypeCanal";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import messageManager from "../../../../common/util/messageManager";
import { getLibelle } from "../../../../common/widget/Text";

export function createReponseSansDelivranceCS(requete?: IRequeteDelivrance) {
  let reponseSansDelivranceCS = {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  if (requete && requete.requerant) {
    reponseSansDelivranceCS = ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(
      requete.requerant,
      TypeCanal.COURRIER,
      requete.numero
    );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérent pour la requête"
    );
  }

  return reponseSansDelivranceCS;
}

/** Elements Popin "Courrier de refus" */
export function getMessagesPopin() {
  return [
    getLibelle(
      "Des données obligatoires de la naissance du titulaire sont manquantes."
    ),
    getLibelle(
      "Un courrier de refus va être automatiquement envoyé au requérant (Veuillez vérifier son adresse postale)."
    ),
    getLibelle("Voulez-vous valider le refus ?")
  ];
}
