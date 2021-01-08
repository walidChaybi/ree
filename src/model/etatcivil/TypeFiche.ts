export enum TypeFiche {
  RC = "RC",
  RCA = "RCA",
  PACS = "PACS",
  ACTE = "ACTE"
}

export class FicheUtil {
  private static readonly libelles = {
    [TypeFiche.RC]: "RC",
    [TypeFiche.RCA]: "RCA",
    [TypeFiche.PACS]: "PACS",
    [TypeFiche.ACTE]: "ACTE"
  };

  public static getLibelle(fiche?: TypeFiche): string {
    return fiche ? this.libelles[fiche] : "";
  }

  public static isFicheRca(fiche?: TypeFiche): boolean {
    return fiche === TypeFiche.RCA;
  }
  public static isActe(type: string) {
    return FicheUtil.getTypeFicheFromString(type) === TypeFiche.ACTE;
  }

  public static getTypeFicheFromString(type: string): TypeFiche | null {
    let typeFiche = null;
    if (type) {
      const typeToUpper = type.toUpperCase();
      switch (typeToUpper) {
        case "RC":
          typeFiche = TypeFiche.RC;
          break;
        case "RCA":
          typeFiche = TypeFiche.RCA;
          break;
        case "PACS":
          typeFiche = TypeFiche.PACS;
          break;
        case "ACTE":
          typeFiche = TypeFiche.ACTE;
          break;

        default:
          typeFiche = null;
          break;
      }
    }
    return typeFiche;
  }
}
