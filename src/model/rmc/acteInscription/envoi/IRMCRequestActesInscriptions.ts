import { IReferenceRECE } from "@model/form/commun/referenceRECE";
import { ENatureActe } from "../../../etatcivil/enum/NatureActe";
import { ETypeFamille } from "../../../etatcivil/enum/TypeFamille";
import { ETypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

export interface ICriteresRMCAutoActeInscription {
  criteres: ICriteresRMCActesInscriptions[];
}
export interface ICriteresRMCActesInscriptions {
  // Filtre Titulaire
  nomTitulaire?: string;
  prenomTitulaire?: string;
  jourNaissance?: string;
  moisNaissance?: string;
  anneeNaissance?: string;
  paysNaissance?: string;
  numeroOrdre?: string;

  // Filtre Date de création
  dateCreationDebut?: Date;
  dateCreationFin?: Date;

  // Filtres Registre & Répertoire Civil
  // Registre
  natureActe?: keyof typeof ENatureActe;
  familleRegistre?: keyof typeof ETypeFamille;
  posteOuPocopa?: string;
  numeroActe?: string;
  aPartirDeNumeroActe?: boolean;
  anneeRegistre?: string;
  numeroBisTer?: string;
  support1?: string;
  support2?: string;
  referenceRece?: IReferenceRECE;

  //Repertoire
  numeroInscription?: string;
  typeRepertoire?: keyof typeof ETypeRepertoire;
  natureRcRca?: string;
  etInscriptionsSuivantes?: boolean;
  // Evenement
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
