import { TypeRequete } from "../../requete/enum/TypeRequete";


export interface ICriteresRMCAutoRequete {
  criteres: IRMCRequestRequete[];
}
export interface IRMCRequestRequete {
  // Filtre Requete
  numeroRequete?: string;
  typeRequete?: TypeRequete;
  sousTypeRequete?: string; // SousTypeRequete ?
  statutRequete?: string; // StatutRequete ?
  numeroTeledossier?: string;
  numeroDossierNational?: string;

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
