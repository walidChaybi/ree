export enum TypeFiche {
  RC = "RC",
  RCA = "RCA"
}

export class FicheUtil {
  private static readonly libelles = {
    [TypeFiche.RC]: "RC",
    [TypeFiche.RCA]: "RCA"
  };

  public static getLibelle(fiche?: TypeFiche): string {
    return fiche ? this.libelles[fiche] : "";
  }

  public static isFicheRca(fiche?: TypeFiche): boolean {
    return fiche === TypeFiche.RCA;
  }
}
