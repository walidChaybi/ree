import { mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";
import { IPrenomOrdonnes } from "../../requete/IPrenomOrdonnes";
import { LienParente } from "../enum/LienParente";
import { Sexe } from "../enum/Sexe";
import { IAdresse } from "./IAdresse";
import { IEvenement } from "./IEvenement";

export interface IFiliation {
  lienParente: LienParente;
  ordre: number;
  nom: string;
  sexe: Sexe;
  naissance: IEvenement;
  age: number;
  profession: string;
  domicile: IAdresse;
  prenoms: string[];
}

export const Filiation = {
  mapPrenomsVersPrenomsOrdonnes(fililation?: IFiliation): IPrenomOrdonnes[] {
    return mapPrenomsVersPrenomsOrdonnes(fililation?.prenoms);
  }
};
