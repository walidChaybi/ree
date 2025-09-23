export enum ETypeAutorite {
  NOTAIRE = "NOTAIRE",
  ONAC = "ONAC",
  JURIDICTION = "JURIDICTION",
  COMMUNE = "COMMUNE",
  POSTE_ETRANGER = "POSTE_ETRANGER"
}

export class TypeAutoriteUtil {
  private static readonly libelles = {
    [ETypeAutorite.NOTAIRE]: "Notaire",
    [ETypeAutorite.ONAC]: "ONAC",
    [ETypeAutorite.JURIDICTION]: "Juridiction",
    [ETypeAutorite.COMMUNE]: "Commune",
    [ETypeAutorite.POSTE_ETRANGER]: "Poste"
  };

  public static getLibelle(typeAutorite?: ETypeAutorite): string {
    return typeAutorite ? this.libelles[typeAutorite] : "";
  }

  public static isJuridiction(typeAutorite?: ETypeAutorite): boolean {
    return typeAutorite === ETypeAutorite.JURIDICTION;
  }

  public static isNotaire(typeAutorite?: ETypeAutorite): boolean {
    return typeAutorite === ETypeAutorite.NOTAIRE;
  }

  public static isOnac(typeAutorite?: ETypeAutorite): boolean {
    return typeAutorite === ETypeAutorite.ONAC;
  }

  public static isPoste(typeAutorite?: ETypeAutorite): boolean {
    return typeAutorite === ETypeAutorite.POSTE_ETRANGER;
  }
}
