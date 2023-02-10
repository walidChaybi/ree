import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { TypeFamille } from "../../../etatcivil/enum/TypeFamille";
import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";


export interface ICriteresRMCAutoActeInscription {
  criteres: IRMCRequestActesInscriptions[];
}
export interface IRMCRequestActesInscriptions {
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

  // Filtre Registre & Réppertoire Civile
  // Registre
  natureActe?: NatureActe;
  familleRegistre?: TypeFamille;
  posteOuPocopa?: string;
  numeroActe?: string;
  anneeRegistre?: string;
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
