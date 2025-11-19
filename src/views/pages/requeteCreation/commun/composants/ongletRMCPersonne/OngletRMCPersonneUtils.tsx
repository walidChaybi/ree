import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { Options } from "@util/Type";
import { IPersonneRMCPersonne, IRMCPersonneResultat } from "@views/common/hook/rmcAuto/IRMCPersonneResultat";
import { IDataTableauRMCPersonne } from "@views/pages/rechercheMultiCriteres/personne/IDataTableauRMCPersonne";
import {
  formatDataTableauPersonne,
  getLibelleMenuItemPersonne
} from "@views/pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { IDataTableauActeInscriptionSelectionne } from "../tableauActesInscriptionsSelectionnes/IDataTableauActeInscriptionSelectionne";
import { IDataTableauPersonneSelectionnee } from "../tableauPersonnesSelectionnees/IDataTableauPersonneSelectionne";

export function mapDataTableauRMCPersonneVersDataTableauPersonneSelectionnee(
  data: IDataTableauRMCPersonne
): IDataTableauPersonneSelectionnee {
  return {
    idPersonne: data.idPersonneOuActeInscription,
    nom: data.nom,
    autresNoms: data.autresNoms,
    prenoms: data.prenoms,
    dateNaissance: data.dateNaissance,
    lieuNaissance: data.lieuNaissance,
    sexe: data.sexe
  };
}

export function mapDataTableauRMCPersonneVersDataTableauActeInscriptionSelectionne(
  data: IDataTableauRMCPersonne,
  resultatRMCPersonne: IRMCPersonneResultat[]
): IDataTableauActeInscriptionSelectionne {
  const personne = resultatRMCPersonne.find(resultatCourant =>
    resultatCourant.actesInscriptions.some(acteInscriptionLie => acteInscriptionLie.idActeInscription === data.idPersonneOuActeInscription)
  )?.personne as IPersonneRMCPersonne;

  return {
    idPersonne: personne.idPersonne,
    idActeInscription: data.idPersonneOuActeInscription,
    nature: data.nature,
    reference: data.reference,
    nom: personne.nom,
    dateNaissance: personne.dateNaissance,
    lieuNaissance: personne.lieuNaissance,
    ...formatDataTableauPersonne(personne)
  };
}

export function triDataTableauPersonneSelectionneeSurNomPrenom(
  personne1: IDataTableauPersonneSelectionnee,
  personne2: IDataTableauPersonneSelectionnee
): number {
  let compareNom = 0;
  let comparePrenoms = 0;
  if (personne1.nom && personne2.nom) {
    compareNom = personne1.nom.localeCompare(personne2.nom);
  }
  if (personne1.prenoms && personne2.prenoms) {
    comparePrenoms = personne1.prenoms.localeCompare(personne2.prenoms);
  }
  return compareNom || comparePrenoms;
}

export function getTitulairesAsOptions(sousTypeRequete?: SousTypeCreation, titulaires?: ITitulaireRequeteCreation[]): Options {
  return titulaires
    ? titulaires.map(titulaire => ({
        cle: titulaire.id,
        libelle: getLibelleMenuItemPersonne(titulaire, sousTypeRequete)
      }))
    : ([] as Options);
}
