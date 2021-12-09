import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { TypeFamille } from "../../../etatcivil/enum/TypeFamille";

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

  // Filtre Registre
  natureActe?: NatureActe;
  familleRegistre?: TypeFamille;
  posteOuPocopa?: string;
  numeroActe?: string;
  anneeRegistre?: string;

  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
