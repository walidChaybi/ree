/* istanbul ignore file */

import { IPieceJustificative } from "../../../views/common/types/RequeteType";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { numberToString } from "../../../views/common/util/Utils";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";
import { IMandant } from "./IMandant";
import { IRequerant } from "./IRequerant";
import { IStatutCourant } from "./IStatutCourant";
import { ITitulaireRequete } from "./ITitulaireRequete";

export interface IRequete {
  id: string;
  numero: string;
  idSagaDila?: number;
  dateCreation: number;
  canal: TypeCanal;
  type: TypeRequete;
  statutCourant: IStatutCourant;
  titulaires?: ITitulaireRequete[];
  requerant: IRequerant;
  mandant?: IMandant;
  idUtilisateur: string; // FIXME Utile ?
  piecesJustificatives: IPieceJustificative[];
}

export const Requete = {
  getIdSagaDila(requete?: IRequete): string {
    return requete?.idSagaDila ? numberToString(requete.idSagaDila) : "";
  },
  getDateCreation(requete?: IRequete): string {
    return requete ? getFormatDateFromTimestamp(requete.dateCreation) : "";
  }
};
