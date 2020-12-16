export enum TypeAutorite {
  NOTAIRE = "NOTAIRE",
  TRIBUNAL_JUDICIAIRE = "TRIBUNAL_JUDICIAIRE",
  TRIBUNAL_INSTANCE = "TRIBUNAL_INSTANCE",
  TRIBUNAL_GRANDE_INSTANCE = "TRIBUNAL_GRANDE_INSTANCE",
  TRIBUNAL_PROXIMITE = "TRIBUNAL_PROXIMITE",
  TRIBUNAL_JUDICIAIRE_REFERENCE = "TRIBUNAL_JUDICIAIRE_REFERENCE",
  TRIBUNAL_PREMIERE_INSTANCE = "TRIBUNAL_PREMIERE_INSTANCE",
  TRIBUNAL_SUPERIEUR_APPEL = "TRIBUNAL_SUPERIEUR_APPEL",
  COUR_APPEL = "COUR_APPEL",
  JURIDICTION_ETRANGERE = "JURIDICTION_ETRANGERE"
}

export class AutoriteUtil {
  private static readonly libelles = {
    [TypeAutorite.COUR_APPEL]: "Cours d'appel",
    [TypeAutorite.TRIBUNAL_GRANDE_INSTANCE]: "Tribunal de grande instance",
    [TypeAutorite.TRIBUNAL_INSTANCE]: "Tribunal d'instance",
    [TypeAutorite.TRIBUNAL_PREMIERE_INSTANCE]: "Tribunal de première instance",
    [TypeAutorite.TRIBUNAL_SUPERIEUR_APPEL]: "Tribunal supérieur d'appel",
    [TypeAutorite.TRIBUNAL_JUDICIAIRE]: "Tribunal judiciaire",
    [TypeAutorite.TRIBUNAL_PROXIMITE]: "Tribunal de proximité",
    [TypeAutorite.JURIDICTION_ETRANGERE]: "Juridiction étrangère",
    [TypeAutorite.TRIBUNAL_JUDICIAIRE_REFERENCE]:
      "Tribunal judiciaire de référence",
    [TypeAutorite.NOTAIRE]: "Notaire"
  };

  public static getLibelle(autorite?: TypeAutorite): string {
    return autorite ? this.libelles[autorite] : "";
  }

  public static isJuridiction(autorite?: TypeAutorite): boolean {
    return autorite != null && autorite !== TypeAutorite.NOTAIRE;
  }

  public static isNotaire(autorite?: TypeAutorite): boolean {
    return autorite === TypeAutorite.NOTAIRE;
  }
}
