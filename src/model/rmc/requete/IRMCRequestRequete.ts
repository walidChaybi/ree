import { TypeRequete } from "../../requete/TypeRequete";

export interface IRMCRequestRequete {
  // Filtre Requete
  numeroRequete?: string;
  typeRequete?: TypeRequete;
  sousTypeRequete?: string; // TODO SousTypeRequete
  statutRequete?: string; // TODO StatutRequete

  // Filtre Titulaire
  nomTitulaire?: string;
  prenomTitulaire?: string;
  jourNaissance?: string;
  moisNaissance?: string;
  anneeNaissance?: string;
  paysNaissance?: string;

  // Filtre Date de création
  dateCreationDebut?: Date;
  dateCreationFin?: Date;
  annee?: string;

  // Filtre Requerant
  nomRequerant?: string;
  raisonSociale?: string;
}
