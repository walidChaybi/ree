import { IEvenement } from "./IEvenement";
import { ITitulaireActe } from "./ITitulaireActe";
import { NatureActe } from "../enum/NatureActe";
import { IPersonne } from "../commun/IPersonne";
import { ICompositionCorps } from "./ICompositionCorps";
import { IRegistre } from "./IRegistre";
import { TypeVisibiliteArchiviste } from "../enum/TypeVisibiliteArchiviste";

export interface IFicheActe {
  id: string;
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  personnes: IPersonne[];
  compositionCorps?: ICompositionCorps;
  registre: IRegistre;
  dateDerniereMaj: Date;
  dateDerniereDelivrance: Date;
  visibiliteArchiviste: TypeVisibiliteArchiviste;
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  }
};
