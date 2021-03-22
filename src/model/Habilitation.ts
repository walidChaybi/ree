import { Droit } from "./Droit";
import { IPerimetre } from "./IPerimetre";

export interface IDroit {
  idDroit: string;
  nom: Droit;
}

export interface IProfil {
  idProfil: string;
  nom: string;
  droits: IDroit[];
}

export interface IHabilitation {
  idHabilitation: string;
  profil: IProfil;
  perimetre: IPerimetre;
}
