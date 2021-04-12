export interface IResultatRMCRequete {
  idRequete?: string;
  numeroRequete?: string; // idSagaDila? : number;
  sousTypeRequete?: string; //SousTypeRequete;
  provenance?: string; //Provenance ou Canal;
  natureActe?: string; // NatureActe;
  document?: string; // TypeActe
  requerant?: string; //IRequerantApi;
  attribuerA?: string; // attribuerA ou nomOec
  dateCreation?: string;
  dateDerniereMaj?: string; // ou dateStatut: string;
  statut?: string; // StatutRequete;
  prioriteRequete?: string;
}
