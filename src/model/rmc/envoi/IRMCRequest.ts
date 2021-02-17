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
  natureActe?: string;
  familleRegistre?: string;
  posteOuPocopa?: string;
  numeroActe?: string;
  numeroInscription?: string;
  typeRepertoire?: string;
  natureRc?: string;
  natureRca?: string;
  jourDateEvenement?: string;
  moisDateEvenement?: string;
  anneeDateEvenement?: string;
  paysEvenement?: string;
}
