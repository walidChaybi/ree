import { TypeEntite } from "./enum/TypeEntite";

export interface IHierarchieEntite {
  entite?: IEntite;
  entiteMere: IEntite;
}

export interface IEntite {
  idEntite: string;
  type: TypeEntite;
  code: string;
  libelleEntite: string;
  hierarchieEntite?: IHierarchieEntite[];
  utilisateur?: any;
}
