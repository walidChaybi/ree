export enum TypeMandataire {
  FAMILLE = "FAMILLE",
  MANDATAIRE_JUDICIAIRE_ASSOCIATION = "MANDATAIRE_JUDICIAIRE_ASSOCIATION",
  MANDATAIRE_JUDICIAIRE_INDIVIDUEL = "MANDATAIRE_JUDICIAIRE_INDIVIDUEL",
  PREPOSE_D_ETABLISSEMENT = "PREPOSE_D_ETABLISSEMENT"
}

export class MandataireUtil {
  private static readonly libelles = {
    [TypeMandataire.FAMILLE]: "Famille",
    [TypeMandataire.MANDATAIRE_JUDICIAIRE_ASSOCIATION]:
      "Mandataire judiciaire à la protection des majeurs association",
    [TypeMandataire.MANDATAIRE_JUDICIAIRE_INDIVIDUEL]:
      "Mandataire judiciaire à la protection des majeurs  individuel ",
    [TypeMandataire.PREPOSE_D_ETABLISSEMENT]: "Préposé d’établissement "
  };

  public static getLibelle(nature?: TypeMandataire): string {
    return nature ? this.libelles[nature] : "";
  }
}
