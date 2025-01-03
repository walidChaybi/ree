import { formatPremieresLettresMajusculesNomCompose } from "@util/Utils";

export interface IPaysSecabilite {
  id: string;
  categorie: string;
  code: string;
  libelle: string;
}

export class PaysSecabilite {
  private static liste: IPaysSecabilite[] | null = null;

  public static init(paysSecabilite: IPaysSecabilite[]) {
    if (PaysSecabilite.liste !== null) {
      return;
    }

    PaysSecabilite.liste = paysSecabilite;
  }

  public static estSecable(libelle: string): boolean {
    return Boolean(
      PaysSecabilite.liste?.find(paysSecabilite => formatPremieresLettresMajusculesNomCompose(paysSecabilite.libelle) === libelle)
    );
  }
}
