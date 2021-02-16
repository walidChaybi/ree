export interface IRMCRequest {
  // Filtre Titulaire
  nomTitulaire: string | null;
  prenomTitulaire: string | null;
  jourNaissance: string | null;
  moisNaissance: string | null;
  anneeNaissance: string | null;
  paysNaissance: string | null;

  // Filtre Date de création
  dateCreationDebut: string | null;
  dateCreationFin: string | null;
  annee: string | null;

  // Filtre Registre & Réppertoire Civile
  natureActe: string | null;
  familleRegistre: string | null;
  posteOuPocopa: string | null;
  numeroActe: string | null;
  numeroInscription: string | null;
  typeRepertoire: string | null;
  natureRc: string | null;
  natureRca: string | null;
  jourDateEvenement: string | null;
  moisDateEvenement: string | null;
  anneeDateEvenement: string | null;
  paysEvenement: string | null;
}
