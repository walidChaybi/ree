/* istanbul ignore file */

import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { StatutRequete } from "./enum/StatutRequete";
import { TypeCanal } from "./enum/TypeCanal";
import { TypeRequete } from "./enum/TypeRequete";
import { IAction } from "./IActions";
import { IObservation } from "./IObservation";
import { IRequerant } from "./IRequerant";
import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { IRequeteDelivrance } from "./IRequeteDelivrance";
import { IRequeteInformation } from "./IRequeteInformation";
import { IRequeteMiseAjour } from "./IRequeteMiseAjour";
import { IStatutCourant } from "./IStatutCourant";
import { ITitulaireRequete } from "./ITitulaireRequete";

export type TRequete =
  | IRequeteDelivrance
  | IRequeteCreationEtablissement
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
  numeroRequeteOrigine?: string;
}

export const Requete = {
  getDateCreation(requete?: IRequete): string {
    return requete ? getFormatDateFromTimestamp(requete.dateCreation) : "";
  },
  nAppartientAPersonne(requete?: IRequete) {
    return requete?.idUtilisateur == null;
  },
  estDeTypeInformation(requete?: IRequete) {
    return requete?.type === TypeRequete.INFORMATION;
  },
  estATraiter(requete?: IRequete) {
    return requete?.statutCourant?.statut === StatutRequete.A_TRAITER;
  },
  estATransferer(requete?: IRequete) {
    return requete?.statutCourant?.statut === StatutRequete.TRANSFEREE;
  },
  estATraiterOuEstATransferer(requete?: IRequete) {
    return this.estATraiter(requete) || this.estATransferer(requete);
  },
  getTitulairesTriesParPosition(
    titulaires?: ITitulaireRequete[]): ITitulaireRequete[] | undefined {
    return titulaires
      ? titulaires.sort((titulaire1, titulaire2) => {
          return titulaire1.position - titulaire2.position;
        })
      : undefined;
  }
};
