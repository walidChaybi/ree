export interface ISuiviDossier {
  id: string;
  idActe?: string;
  identifiantSuiviProjet?: string;
  dateEtablissement?: number;
  jourEvenement?: string;
  moisEvenement?: string;
  anneeEvenement: string;
  natureProjet?: string;
  referenceActe?: string;
  avancement?: string;
}
