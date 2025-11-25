import { TRequeteAssociee } from "./requete/RequeteAssociee";

export interface ITableauRMC {
  requetesAssociees: TRequeteAssociee[];
  nombreTotalLignes: number;
}
