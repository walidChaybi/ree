export enum StatutPacs {
  ENREGISTRE = "ENREGISTRE",
  MODIFIE = "MODIFIE",
  ANNULE = "ANNULE",
  DISSOUS = "DISSOUS"
}

export class StatutPacesUtil {
  private static readonly libelles = {
    [StatutPacs.ENREGISTRE]: "Enregistré",
    [StatutPacs.MODIFIE]: "Modifié",
    [StatutPacs.ANNULE]: "Annulé",
    [StatutPacs.DISSOUS]: "Dissous"
  };

  public static getLibelle(statutPacs?: StatutPacs): string {
    return statutPacs ? this.libelles[statutPacs] : "";
  }
}
