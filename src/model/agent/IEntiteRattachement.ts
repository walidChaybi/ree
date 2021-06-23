export interface IEntiteRattachement {
  idEntite: string;
  type: string;
  codeService: string;
  libelleService: string;
  hierarchieEntite?: IEntiteRattachement[];
  utilisateur?: any;
}
