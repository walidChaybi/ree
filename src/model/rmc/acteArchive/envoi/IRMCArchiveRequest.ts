import { ENatureActe } from "../../../etatcivil/enum/NatureActe";
import { ETypeFamille } from "../../../etatcivil/enum/TypeFamille";

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
  natureActe?: keyof typeof ENatureActe;
  familleRegistre?: keyof typeof ETypeFamille;
  posteOuPocopa?: string;
  numeroActe?: string;
  anneeRegistre?: string;
  numeroBisTer?: string;
  support1?: string;
  support2?: string;

  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
