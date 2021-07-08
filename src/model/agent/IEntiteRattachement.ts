export interface IHierarchieEntite {
  entite?: IEntiteRattachement;
  entiteMere: IEntiteRattachement;
}

export interface IEntiteRattachement {
  idEntite: string;
  type: string;
  codeService: string;
  libelleService: string;
  hierarchieEntite?: IHierarchieEntite[];
  utilisateur?: any;
}
