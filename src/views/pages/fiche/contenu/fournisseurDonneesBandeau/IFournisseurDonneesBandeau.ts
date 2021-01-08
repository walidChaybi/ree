/* istanbul ignore file */
export default interface IFournisseurDonneesBandeau {
  getData(): any;

  getNom1: () => string;
  getNom2: () => string;

  getPrenom1: () => string;
  getPrenom2: () => string | undefined;

  getTypeAbrege: () => string;
  getType: () => string;

  getAnnee: () => string;

  getRegistre: () => string | undefined;
}
