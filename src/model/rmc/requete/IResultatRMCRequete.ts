export interface IResultatRMCRequete {
  idRequete: string;
  numero?: string;
  numeroSagaDila?: string;
  type?: string;
  sousType?: string;
  provenance?: string;
  nature?: string;
  document?: string;
  titulaires?: string[][];
  datesNaissancesTitulaires?: string[];
  requerant?: string;
  attribueA?: string;
  dateCreation?: string;
  dateDerniereMaj?: string;
  statut?: string;
  priorite?: string;
  observations?: string[];
}
