export enum AlerteInscription {
  DATE_FIN_MESURE_DEPASSEE = "DATE_FIN_MESURE_DEPASSEE"
}

export class AlerteInscriptionUtil {
  private static readonly alerteInscriptionLibelle = {
    [AlerteInscription.DATE_FIN_MESURE_DEPASSEE]:
      "Date de fin de mesure dépassée"
  };

  public static getLibelle(alerte: AlerteInscription) {
    return this.alerteInscriptionLibelle[alerte];
  }
}
