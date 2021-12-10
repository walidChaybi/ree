import { IChampsMail } from "./IChampsMail";
import { IPieceJustificativeMail } from "./IPieceJustificativeMail";

export interface IMail {
  codeModele: string;
  versionModele: string;
  listeDestinataire: string[];
  listeDestinataireCopie: string[];
  listeDestinataireCopieCache: string[];
  champs: IChampsMail;
  listePieceJointe: IPieceJustificativeMail[];
}
