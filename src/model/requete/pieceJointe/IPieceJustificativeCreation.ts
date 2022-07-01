import { IDocumentPJ } from "../IDocumentPj";
import { IPieceJustificative } from "./IPieceJustificative";

export interface IPieceJustificativeCreation extends IPieceJustificative {
  idFichierNatali: string;
  ordreNatali: number;
  libelle: string;
  estPieceAnnexe: boolean;
  idActe: string;
  documentPj: IDocumentPJ;
}
