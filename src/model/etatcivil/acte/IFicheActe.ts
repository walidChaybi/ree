import { IEvenement } from "./IEvenement";
import { ITitulaireActe } from "./ITitulaireActe";
import { NatureActe } from "../enum/NatureActe";
import { IPersonne } from "../commun/IPersonne";

export interface IFicheActe {
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  personnes: IPersonne[];
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  }
};
