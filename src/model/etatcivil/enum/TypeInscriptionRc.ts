export enum TypeInscriptionRc {
  INSCRIPTION = "INSCRIPTION",
  RENOUVELLEMENT = "RENOUVELLEMENT",
  MODIFICATION = "MODIFICATION",
  RADIATION = "RADIATION",
  MAIN_LEVEE = "MAIN_LEVEE",
  FIN_MESURE = "FIN_MESURE",
  CADUCITE = "CADUCITE",
  INCONNU = "INCONNU"
}

export class InscriptionRcUtil {
  private static readonly libelles = {
    [TypeInscriptionRc.INSCRIPTION]: "Inscription",
    [TypeInscriptionRc.RENOUVELLEMENT]: "Renouvellement",
    [TypeInscriptionRc.MODIFICATION]: "Modification",
    [TypeInscriptionRc.RADIATION]: "Radiation",
    [TypeInscriptionRc.MAIN_LEVEE]: "Main levée",
    [TypeInscriptionRc.FIN_MESURE]: "Fin de mesure",
    [TypeInscriptionRc.CADUCITE]: "Caducité",
    [TypeInscriptionRc.INCONNU]: "Inconnu"
  };

  public static getLibelle(inscriptionRc?: TypeInscriptionRc): string {
    return inscriptionRc && this.libelles[inscriptionRc]
      ? this.libelles[inscriptionRc]
      : "";
  }
}
