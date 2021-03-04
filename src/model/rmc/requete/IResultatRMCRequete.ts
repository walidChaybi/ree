export interface IResultatRMCRequete {
  idRequete?: string;
  numeroRequete?: string; // idSagaDila? : number;
  sousTypeRequete?: string; //SousTypeRequete;
  canal?: string; //Canal;
  natureActe?: string; // NatureActe;
  document?: string; // TypeActe
  requerant?: string; //IRequerantApi;
  nomOec?: string;
  dateCreation?: string;
  dateDerniereMaj?: string; // ou dateStatut: string;
  statut?: string; // StatutRequete;
  prioriteRequete?: string;
}
