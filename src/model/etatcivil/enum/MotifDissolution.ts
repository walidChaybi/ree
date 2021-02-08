import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../../views/common/util/Utils";

export enum MotifDissolution {
  COMMUN_ACCORD = "COMMUN ACCORD",
  UNILATERAL = "UNILATERAL",
  DECES = "DECES",
  MARIAGE = "MARIAGE",
  TUTEUR_COMMUN_ACCORD = "TUTEUR COMMUN ACCORD",
  TUTEUR_UNILATERAL = "TUTEUR UNILATERAL"
}

export class MotifDissolutionUtil {
  private static readonly libelles = {
    [MotifDissolution.COMMUN_ACCORD]: premiereLettreEnMajusculeLeResteEnMinuscule(
      MotifDissolution.COMMUN_ACCORD
    ),
    [MotifDissolution.UNILATERAL]: "Unilatéral",
    [MotifDissolution.DECES]: "Décès",
    [MotifDissolution.MARIAGE]: premiereLettreEnMajusculeLeResteEnMinuscule(
      MotifDissolution.MARIAGE
    ),
    [MotifDissolution.TUTEUR_COMMUN_ACCORD]: premiereLettreEnMajusculeLeResteEnMinuscule(
      MotifDissolution.TUTEUR_COMMUN_ACCORD
    ),
    [MotifDissolution.TUTEUR_UNILATERAL]: "Tuteur unilatéral"
  };

  public static getLibelle(motifDissolution?: MotifDissolution): string {
    return motifDissolution ? this.libelles[motifDissolution] : "";
  }
}
