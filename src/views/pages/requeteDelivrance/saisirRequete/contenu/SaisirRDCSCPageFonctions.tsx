import { TITULAIRES } from "@composant/formulaire/ConstantesNomsForm";
import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ECodeDocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { withNamespace } from "@widget/formulaire/utils/FormUtil";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import { PieceJointe } from "../../../../../utils/FileUtils";
import { limitesTitulaires } from "../SaisirRDCSCPage";
import { IdentiteSubFormProps } from "../sousFormulaires/identite/IdentiteForm";

export function createReponseSansDelivranceCS(requete?: IRequeteDelivrance) {
  let reponseSansDelivranceCS = {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  if (requete?.requerant) {
    reponseSansDelivranceCS = ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(requete);
  } else {
    AfficherMessage.erreur("Erreur inattendue: Pas de requérent pour la requête", { fermetureAuto: true });
  }

  return reponseSansDelivranceCS;
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
