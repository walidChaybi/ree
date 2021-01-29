export enum TypePoste {
  AMBASSADE = "AMBASSADE",
  CONSULAT_GENERAL = "CONSULAT_GENERAL",
  CONSULAT = "CONSULAT",
  CHANCELLERIE_DETACHEE_FRANCE = "CHANCELLERIE_DETACHEE_FRANCE"
}
export class TypePosteUtil {
  private static readonly libelles = {
    [TypePoste.AMBASSADE]: "Ambassade",
    [TypePoste.CONSULAT_GENERAL]: "Consulat général",
    [TypePoste.CONSULAT]: "Consulat",
    [TypePoste.CHANCELLERIE_DETACHEE_FRANCE]: "Chancellerie détachée de France"
  };

  public static getLibelle(typePoste?: TypePoste): string {
    return typePoste ? this.libelles[typePoste] : "";
  }
}
