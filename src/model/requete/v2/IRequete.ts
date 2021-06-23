/* istanbul ignore file */

import { IPieceJustificative } from "../../../views/common/types/RequeteType";
import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { numberToString } from "../../../views/common/util/Utils";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";
import { IAction } from "./IActions";
import { IMandant } from "./IMandant";
import { IRequerant } from "./IRequerant";
import { IRequeteCreation } from "./IRequeteCreation";
import { IRequeteDelivrance } from "./IRequeteDelivrance";
import { IRequeteInformation } from "./IRequeteInformation";
import { IRequeteMiseAjour } from "./IRequeteMiseAjour";
import { IStatutCourant } from "./IStatutCourant";
import { ITitulaireRequete } from "./ITitulaireRequete";

export type TRequete =
  | IRequeteDelivrance
  | IRequeteCreation
  | IRequeteMiseAjour
  | IRequeteInformation;

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
  idUtilisateur: string;
  idEntite: string;
  piecesJustificatives: IPieceJustificative[];
  actions?: IAction[];
}

export const Requete = {
  getIdSagaDila(requete?: IRequete): string {
    return requete?.idSagaDila ? numberToString(requete.idSagaDila) : "";
  },
  getDateCreation(requete?: IRequete): string {
    return requete ? getFormatDateFromTimestamp(requete.dateCreation) : "";
  }
};
