export enum Nationalite {
  FRANCAISE = "FRANCAISE",
  ETRANGERE = "ETRANGERE"
}

export class NationaliteUtil {
  private static readonly libelles = {
    [Nationalite.FRANCAISE]: "Française",
    [Nationalite.ETRANGERE]: "Etrangère"
  };

  public static getLibelle(nationalite?: Nationalite): string {
    return nationalite ? this.libelles[nationalite] : "";
  }
}
