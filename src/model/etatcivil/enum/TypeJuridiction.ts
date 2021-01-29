export enum TypeJuridiction {
  TRIBUNAL_JUDICIAIRE = "TRIBUNAL_JUDICIAIRE",
  TRIBUNAL_INSTANCE = "TRIBUNAL_INSTANCE",
  TRIBUNAL_GRANDE_INSTANCE = "TRIBUNAL_GRANDE_INSTANCE",
  TRIBUNAL_PROXIMITE = "TRIBUNAL_PROXIMITE",
  TRIBUNAL_JUDICIAIRE_REFERENCE = "TRIBUNAL_JUDICIAIRE_REFERENCE",
  TRIBUNAL_PREMIERE_INSTANCE = "TRIBUNAL_PREMIERE_INSTANCE",
  TRIBUNAL_SUPERIEUR_APPEL = "TRIBUNAL_SUPERIEUR_APPEL",
  GREFFE_TRIBUNAL = "GREFFE_TRIBUNAL",
  COUR_APPEL = "COUR_APPEL",
  JURIDICTION_ETRANGERE = "JURIDICTION_ETRANGERE"
}

export class TypeJuridictionUtil {
  private static readonly libelles = {
    [TypeJuridiction.TRIBUNAL_JUDICIAIRE]: "Tribunal judiciaire",
    [TypeJuridiction.TRIBUNAL_INSTANCE]: "Tribunal d'instance",
    [TypeJuridiction.TRIBUNAL_GRANDE_INSTANCE]: "Tribunal de grande instance",
    [TypeJuridiction.TRIBUNAL_PROXIMITE]: "Tribunal de proximité",
    [TypeJuridiction.TRIBUNAL_JUDICIAIRE_REFERENCE]:
      "Tribunal judiciaire de référence",
    [TypeJuridiction.TRIBUNAL_PREMIERE_INSTANCE]:
      "Tribunal de première instance",
    [TypeJuridiction.TRIBUNAL_SUPERIEUR_APPEL]: "Tribunal supérieur d'appel",
    [TypeJuridiction.GREFFE_TRIBUNAL]: "Greffe du tribunal",
    [TypeJuridiction.COUR_APPEL]: "Cours d'appel",
    [TypeJuridiction.JURIDICTION_ETRANGERE]: "Juridiction étrangère"
  };

  public static getLibelle(typeJuridiction?: TypeJuridiction): string {
    return typeJuridiction ? this.libelles[typeJuridiction] : "";
  }
}
