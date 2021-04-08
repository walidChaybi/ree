import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { TypeFamille } from "../../../etatcivil/enum/TypeFamille";

export interface IRMCRequest {
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

  // Filtre Registre & Réppertoire Civile
  // Registre
  natureActe?: NatureActe;
  familleRegistre?: TypeFamille;
  posteOuPocopa?: string;
  numeroActe?: string;
  //Repertoire
  numeroInscription?: string;
  typeRepertoire?: TypeRepertoire;
  natureRcRca?: string;
  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
