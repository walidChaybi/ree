export enum AlerteInscription {
  DATE_DE_FIN_MESURE_DEPASSEE = "DATE_DE_FIN_MESURE_DEPASSEE",
  AUCUNE_ALERTE_IDENTIFIEE = "AUCUNE_ALERTE_IDENTIFIEE"
}

export class AlerteInscriptionUtil {
  private static readonly alerteInscriptionLibelle = {
    DATE_DE_FIN_MESURE_DEPASSEE: "Date de fin de mesure dépassée",
    AUCUNE_ALERTE_IDENTIFIEE: "Aucune alerte identifiée"
  };

  public static getLibelle(alerte: AlerteInscription) {
    return this.alerteInscriptionLibelle[alerte];
  }
}
