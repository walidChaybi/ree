export enum TypeAutorite {
  NOTAIRE = "NOTAIRE",
  ONAC = "ONAC",
  JURIDICTION = "JURIDICTION",
  COMMUNE = "COMMUNE",
  POSTE_ETRANGER = "POSTE_ETRANGER"
}

export class TypeAutoriteUtil {
  private static readonly libelles = {
    [TypeAutorite.NOTAIRE]: "Notaire",
    [TypeAutorite.ONAC]: "ONAC",
    [TypeAutorite.JURIDICTION]: "Juridiction",
    [TypeAutorite.COMMUNE]: "Commune",
    [TypeAutorite.POSTE_ETRANGER]: "Poste"
  };

  public static getLibelle(autorite?: TypeAutorite): string {
    return autorite ? this.libelles[autorite] : "";
  }

  public static isJuridiction(autorite?: TypeAutorite): boolean {
    return (
      autorite != null &&
      autorite !== TypeAutorite.NOTAIRE &&
      autorite !== TypeAutorite.ONAC
    );
  }

  public static isNotaire(autorite?: TypeAutorite): boolean {
    return autorite === TypeAutorite.NOTAIRE;
  }

  public static isOnac(autorite?: TypeAutorite): boolean {
    return autorite === TypeAutorite.ONAC;
  }
}
