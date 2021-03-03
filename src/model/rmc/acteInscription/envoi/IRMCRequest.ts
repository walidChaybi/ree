import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";
import { NatureRc } from "../../../etatcivil/enum/NatureRc";
import { NatureRca } from "../../../etatcivil/enum/NatureRca";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { CodeFamilleRegistre } from "../../../etatcivil/enum/CodeFamilleRegistre";

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
  familleRegistre?: CodeFamilleRegistre;
  posteOuPocopa?: string;
  numeroActe?: string;
  //Repertoire
  numeroInscription?: string;
  typeRepertoire?: TypeRepertoire;
  natureRc?: NatureRc;
  natureRca?: NatureRca;
  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
