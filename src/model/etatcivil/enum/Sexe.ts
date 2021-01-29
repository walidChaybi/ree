export enum Sexe {
  MASCULIN = "MASCULIN",
  FEMININ = "FEMININ",
  INDETERMINE = "INDETERMINE"
}

export class SexeUtil {
  private static readonly libelles = {
    [Sexe.MASCULIN]: "Masculin",
    [Sexe.FEMININ]: "Féminin",
    [Sexe.INDETERMINE]: "Indeterminé"
  };

  public static getLibelle(sexe?: Sexe): string {
    return sexe ? this.libelles[sexe] : "";
  }
}
