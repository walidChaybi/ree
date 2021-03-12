import { IEvenement } from "./IEvenement";
import { ITitulaireActe } from "./ITitulaireActe";
import { NatureActe } from "../enum/NatureActe";
import { IPersonne } from "../commun/IPersonne";
import { ICompositionCorps } from "./ICompositionCorps";

export interface IFicheActe {
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  personnes: IPersonne[];
  compositionCorps?: ICompositionCorps;
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  }
};
