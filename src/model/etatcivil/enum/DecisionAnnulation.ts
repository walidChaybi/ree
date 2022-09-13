import { premiereLettreEnMajusculeLeResteEnMinuscule } from "@util/Utils";

export enum DecisionAnnulation {
  JUGEMENT = "JUGEMENT",
  ARRET = "ARRET"
}

export class DecisionAnnulationUtil {
  private static readonly libelles = {
    [DecisionAnnulation.JUGEMENT]: premiereLettreEnMajusculeLeResteEnMinuscule(
      DecisionAnnulation.JUGEMENT
    ),
    [DecisionAnnulation.ARRET]: "Arrêt"
  };

  public static getLibelle(decisionAnnulation?: DecisionAnnulation): string {
    return decisionAnnulation ? this.libelles[decisionAnnulation] : "";
  }
}
