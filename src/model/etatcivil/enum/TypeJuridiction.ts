export enum TypeJuridiction {
  TRIBUNAL_JUDICIAIRE = "TRIBUNAL JUDICIAIRE",
  TRIBUNAL_INSTANCE = "TRIBUNAL INSTANCE",
  TRIBUNAL_GRANDE_INSTANCE = "TRIBUNAL GRANDE INSTANCE",
  TRIBUNAL_PROXIMITE = "TRIBUNAL PROXIMITE",
  TRIBUNAL_JUDICIAIRE_REFERENCE = "TRIBUNAL JUDICIAIRE REFERENCE",
  TRIBUNAL_PREMIERE_INSTANCE = "TRIBUNAL PREMIERE INSTANCE",
  TRIBUNAL_SUPERIEUR_APPEL = "TRIBUNAL SUPERIEUR APPEL",
  COUR_APPEL = "COUR APPEL",
  JURIDICTION_ETRANGERE = "JURIDICTION ETRANGERE"
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
    [TypeJuridiction.COUR_APPEL]: "Cours d'appel",
    [TypeJuridiction.JURIDICTION_ETRANGERE]: "Juridiction étrangère"
  };

  public static getLibelle(typeJuridiction?: TypeJuridiction): string {
    return typeJuridiction ? this.libelles[typeJuridiction] : "";
  }
}
