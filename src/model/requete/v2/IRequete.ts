/* istanbul ignore file */

import { getFormatDateFromTimestamp } from "../../../views/common/util/DateUtils";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";
import { IAction } from "./IActions";
import { IObservation } from "./IObservation";
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
  dateCreation: number;
  type: TypeRequete;
  canal: TypeCanal;
  statutCourant: IStatutCourant;
  titulaires?: ITitulaireRequete[];
  requerant: IRequerant;
  idUtilisateur: string;
  idEntite: string;
  observations?: IObservation[];
  actions?: IAction[];
}

export const Requete = {
  getDateCreation(requete?: IRequete): string {
    return requete ? getFormatDateFromTimestamp(requete.dateCreation) : "";
  }
};
