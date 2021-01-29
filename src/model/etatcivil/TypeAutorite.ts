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

  public static getLibelle(typeAutorite?: TypeAutorite): string {
    return typeAutorite ? this.libelles[typeAutorite] : "";
  }

  public static isJuridiction(typeAutorite?: TypeAutorite): boolean {
    return typeAutorite === TypeAutorite.JURIDICTION;
  }

  public static isNotaire(typeAutorite?: TypeAutorite): boolean {
    return typeAutorite === TypeAutorite.NOTAIRE;
  }

  public static isOnac(typeAutorite?: TypeAutorite): boolean {
    return typeAutorite === TypeAutorite.ONAC;
  }

  public static isPoste(typeAutorite?: TypeAutorite): boolean {
    return typeAutorite === TypeAutorite.POSTE_ETRANGER;
  }
}
