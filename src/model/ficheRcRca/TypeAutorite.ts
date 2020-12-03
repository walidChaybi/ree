export enum TypeAutorite {
  NOTAIRE = "NOTAIRE",
  TRIBUNAL_JUDICIAIRE = "TRIBUNAL_JUDICIAIRE",
  TRIBUNAL_INSTANCE = "TRIBUNAL_INSTANCE",
  TRIBUNAL_DE_GRANDE_INSTANCE = "TRIBUNA_DE_GRANDE_INSTANCE",
  TRIBUNAL_DE_PROXIMITE = "TRIBUNAL_DE_PROXIMITE",
  TRIBUNAL_JUDICIAIRE_DE_REFERENCE = "TRIBUNAL_JUDICIAIRE_DE_REFERENCE",
  TRIBUNAL_DE_PREMIERE_INSTANCE = "TRIBUNAL_DE_PREMIERE_INSTANCE",
  TRIBUNAL_SUPERIEUR_D_APPEL = "TRIBUNAL_SUPERIEUR_D_APPEL",
  COUR_D_APPEL = "COUR_D_APPEL",
  JURIDICTION_ETRANGERE = "JURIDICTION_ETRANGERE"
}

export class AutoriteUtil {
  private static readonly libelles = {
    [TypeAutorite.NOTAIRE]: "Notaire",
    [TypeAutorite.TRIBUNAL_JUDICIAIRE]: "Tribunal judiciaire",
    [TypeAutorite.TRIBUNAL_INSTANCE]: "Tribunal d'instance",
    [TypeAutorite.TRIBUNAL_DE_GRANDE_INSTANCE]: "Tribunal de grande instance",
    [TypeAutorite.TRIBUNAL_DE_PROXIMITE]: "Tribunal de proximité",
    [TypeAutorite.TRIBUNAL_JUDICIAIRE_DE_REFERENCE]:
      "Tribunal judiciaire de référence",
    [TypeAutorite.TRIBUNAL_DE_PREMIERE_INSTANCE]:
      "Tribunal de première instance",
    [TypeAutorite.TRIBUNAL_SUPERIEUR_D_APPEL]: "Tribunal supérieur d'appel",
    [TypeAutorite.COUR_D_APPEL]: "Cours d'appel",
    [TypeAutorite.JURIDICTION_ETRANGERE]: "Juridiction étrangère"
  };

  public static getLibelle(autorite?: TypeAutorite): string {
    return autorite ? this.libelles[autorite] : "";
  }

  public static isJuridiction(autorite?: TypeAutorite): boolean {
    return autorite !== TypeAutorite.NOTAIRE;
  }

  public static isNotaire(autorite?: TypeAutorite): boolean {
    return autorite === TypeAutorite.NOTAIRE;
  }
}
