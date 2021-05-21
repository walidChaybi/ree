import {
  IDocumentDelivre,
  IPieceJustificative,
  ITitulaire
} from "../../views/common/types/RequeteType";
import {
  IReponseApi,
  IRequerantApi
} from "../../views/pages/espaceDelivrance/v1//hook/DonneesRequeteHook";
import { Canal } from "../Canal";
import { NatureActe } from "../etatcivil/enum/NatureActe";
import { CanalProvenance } from "./CanalProvenance";
import { MotifRequete } from "./MotifRequete";
import { SousTypeRequete } from "./SousTypeRequete";
import { StatutRequete } from "./StatutRequete";
import { TypeRequete } from "./TypeRequete";

export interface IDataTable {
  idRequete: string;
  idSagaDila: number;
  idRequeteInitiale: number;
  sousTypeRequete: SousTypeRequete;
  typeRequete: TypeRequete;
  provenance: CanalProvenance;
  natureActe: NatureActe;
  dateCreation: string;
  dateDerniereMaj: string;
  dateStatut: string;
  statut: StatutRequete;
  prioriteRequete: string;
  villeEvenement: string;
  paysEvenement: string;
  canal: Canal;
  motifRequete: MotifRequete;
  requerant: IRequerantApi;
  titulaires: ITitulaire[];
  piecesJustificatives: IPieceJustificative[];
  nomOec: string;
  typeActe: string;
  reponse?: IReponseApi;
  anneeEvenement: number;
  jourEvenement: number;
  moisEvenement: number;
  nbExemplaire: number;
  documentsDelivres: IDocumentDelivre[];
}
