import {
  compactObject,
  getValeurOuVide
} from "../../../views/common/util/Utils";
import { IPersonne } from "../commun/IPersonne";
import { NatureActe } from "../enum/NatureActe";
import { TypeVisibiliteArchiviste } from "../enum/TypeVisibiliteArchiviste";
import { IAnalyseMarginale } from "./IAnalyseMarginale";
import { IEvenement } from "./IEvenement";
import { IRegistre } from "./IRegistre";
import { ITitulaireActe } from "./ITitulaireActe";

export interface IFicheActe {
  id: string;
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  numero: string;
  numeroBisTer: string;
  personnes: IPersonne[];
  estReecrit?: boolean;
  registre: IRegistre;
  dateDerniereMaj?: Date;
  dateDerniereDelivrance?: Date;
  visibiliteArchiviste: TypeVisibiliteArchiviste;
  analyseMarginales?: IAnalyseMarginale[];
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  },

  getReference(acte?: IFicheActe): string {
    const registre: any = {
      famille: getValeurOuVide(acte?.registre?.famille).toLocaleUpperCase(),
      pocopa: getValeurOuVide(acte?.registre?.pocopa).toLocaleUpperCase(),
      annee: getValeurOuVide(acte?.registre?.annee),
      support1: getValeurOuVide(acte?.registre?.support1).toLocaleUpperCase(),
      support2: getValeurOuVide(acte?.registre?.support2).toLocaleUpperCase(),
      numeroActe: getValeurOuVide(acte?.numero),
      numeroBisTer: getValeurOuVide(acte?.numeroBisTer)
    };
    return Object.values(compactObject(registre)).join(".");
  }
};
