import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../../views/common/util/Utils";

export enum Sexe {
  MASCULIN = "MASCULIN",
  FEMININ = "FEMININ",
  INDETERMINE = "INDETERMINE"
}

export class SexeUtil {
  private static readonly libelles = {
    [Sexe.MASCULIN]: premiereLettreEnMajusculeLeResteEnMinuscule(Sexe.MASCULIN),
    [Sexe.FEMININ]: premiereLettreEnMajusculeLeResteEnMinuscule(Sexe.FEMININ),
    [Sexe.INDETERMINE]: "Indeterminé"
  };

  public static getLibelle(sexe?: Sexe): string {
    return sexe ? this.libelles[sexe] : "";
  }
}
