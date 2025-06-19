export interface IParametreBaseRequeteDTO {
  idParametre: string;
  cle: string;
  valeur?: string;
  fichierB64?: string;
}

interface IParametreBaseRequete {
  cle: string;
  libelle: string;
}

export class ParametreBaseRequete {
  private static liste: IParametreBaseRequete[] | null = null;

  public static init(parametresBaseRequete: IParametreBaseRequeteDTO[]): void {
    if (ParametreBaseRequete.liste !== null) {
      return;
    }
    ParametreBaseRequete.liste = parametresBaseRequete.map((parametreBaseRequete: IParametreBaseRequeteDTO): IParametreBaseRequete => {
      return { cle: parametreBaseRequete.cle, libelle: parametreBaseRequete.fichierB64 ?? parametreBaseRequete.valeur ?? ("" as never) };
    });
  }

  public static depuisCle(cle: string): IParametreBaseRequete | null {
    return ParametreBaseRequete.liste?.find(parametreBaseRequete => parametreBaseRequete.cle === cle) ?? null;
  }
}
