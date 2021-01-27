export enum Sexe {
  INDETERMINE = "INDETERMINE",
  FEMININ = "FEMININ",
  MASCULIN = "MASCULIN"
}

export class SexeUtil {
  private static readonly libelles = {
    [Sexe.INDETERMINE]: "Indéterminé",
    [Sexe.FEMININ]: "Féminin",
    [Sexe.MASCULIN]: "Masculin"
  };

  public static getLibelle(sexe: Sexe): string {
    return sexe ? this.libelles[sexe] : "";
  }
}
