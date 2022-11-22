import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import messageManager from "@util/messageManager";
import { getLibelle } from "@util/Utils";

export function createReponseSansDelivranceCS(requete?: IRequeteDelivrance) {
  let reponseSansDelivranceCS =
    {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  if (requete && requete.requerant) {
    reponseSansDelivranceCS =
      ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(
        requete
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
