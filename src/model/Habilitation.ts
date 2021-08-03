import { Droit } from "./Droit";
import { INomenclatureAgentApi } from "./INomenclatureAgentApi";
import { IPerimetre } from "./IPerimetre";

export interface IDroit {
  idDroit: string;
  nom: Droit;
}

export interface IProfil {
  idProfil: string;
  nom: INomenclatureAgentApi;
  droits: IDroit[];
}

export interface IHabilitation {
  idHabilitation: string;
  profil: IProfil;
  perimetre: IPerimetre;
}
