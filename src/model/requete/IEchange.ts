export interface IEchange {
  id?: string;
  nature: string;
  date?: string;
  message: string;
  emetteur: string;
  destinataire: string;
  pieceJustificativeRequeteCreation: any;
}

export interface IEchangeServeur {
  id: string;
  nature: string;
  dateMessage: number;
  message: string;
  emetteur: string;
  destinataire: string;
  pieceJustificativeRequeteCreation: any;
}
