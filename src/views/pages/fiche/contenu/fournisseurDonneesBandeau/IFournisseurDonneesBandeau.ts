/* istanbul ignore file */

export class SimplePersonne {
  constructor(public nom: string, public prenom: string) {}
}

export default interface IFournisseurDonneesBandeau {
  getData(): any;

  getSimplePersonnes: () => SimplePersonne[];

  getTypeAbrege: () => string;
  getType: () => string;

  getAnnee: () => string;

  getRegistre: () => string | undefined;
}
