import { TITULAIRES } from "@composant/formulaire/ConstantesNomsForm";
import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ECodeDocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PieceJointe } from "@util/FileUtils";
import messageManager from "@util/messageManager";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import { limitesTitulaires } from "../SaisirRDCSCPage";
import { IdentiteSubFormProps } from "../sousFormulaires/identite/IdentiteForm";

export function createReponseSansDelivranceCS(requete?: IRequeteDelivrance) {
  let reponseSansDelivranceCS = {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  if (requete?.requerant) {
    reponseSansDelivranceCS = ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(requete);
  } else {
    messageManager.showErrorAndClose("Erreur inattendue: Pas de requérent pour la requête");
  }

  return reponseSansDelivranceCS;
}

/** Elements Popin "Courrier de refus" */
export function getMessagesPopin() {
  return [
    "Des données obligatoires de la naissance du titulaire sont manquantes.",
    "Un courrier de refus va être automatiquement envoyé au requérant (Veuillez vérifier son adresse postale).",
    "Voulez-vous valider le refus ?"
  ];
}

export const creerTitulaire = (numTitulaire = 1) => {
  return {
    nom: withNamespace(TITULAIRES, `titulaire${numTitulaire}`),
    titre: `Titulaire ${numTitulaire}`
  } as IdentiteSubFormProps;
};

export function getPiecesJointesAMettreAJour(formulairePiecesJointes?: PieceJointe[]) {
  // On ne prend que les pjs dont le contenu est renseigné,
  //   en effet si le contenu est vide c'est qu'il a été écrasé par la requête lors de la sauvegarde (la requête ramène ses pièces jointes mais sans le contenu)
  return formulairePiecesJointes?.filter(formulairePj => formulairePj.base64File.base64String);
}

export const initialiserTitulaires = (nbTitulaires = 1) => {
  const titulaires = [];

  for (let i = 1; i <= nbTitulaires; i++) {
    titulaires.push(creerTitulaire(i));
  }

  return titulaires;
};

export const getMaxTitulaires = (document: IDocumentDelivrance | null): number => {
  return document?.code === ECodeDocumentDelivrance.CODE_ATTESTATION_PACS ? limitesTitulaires.MAX : limitesTitulaires.MIN;
};
