import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { CodeFamilleRegistre } from "../../../etatcivil/enum/CodeFamilleRegistre";

export interface IRMCArchiveRequest {
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

  // Filtre Registre
  natureActe?: NatureActe;
  familleRegistre?: CodeFamilleRegistre;
  posteOuPocopa?: string;
  numeroActe?: string;
  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
