/* istanbul ignore file */

import { SimplePersonne } from "@model/etatcivil/fiche/SimplePersonne";


export default interface IFournisseurDonneesBandeau {
  getData(): any;

  getSimplePersonnes: () => SimplePersonne[];

  getTypeAbrege: () => string;
  getType: () => string;

  getAnnee: () => string;

  getRegistre: () => string | undefined;
}
