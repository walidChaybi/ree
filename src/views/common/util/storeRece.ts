import { IUtilisateur } from "@model/agent/IUtilisateur";

class StoreRece {
  private _retourUrl = "";
  private _logErrorOff = false;

  set logErrorDesactive(estDesactive: boolean) {
    if (process.env.NODE_ENV === "test") {
      this._logErrorOff = estDesactive;
    } else {
      throw new Error("Pas de désactivation de la log en dehors des tests");
    }
  }

  get logErrorDesactive() {
    return this._logErrorOff;
  }

  set retourUrl(ru: string) {
    this._retourUrl = ru;
  }

  get retourUrl() {
    return this._retourUrl;
  }

  // Laissé ici car va être retire lors de la prochaine itération lorsque les TRIGRAMMES OEC seront remplacés partout par Nom et Prenom
  public getTrigrammeFromID(utilisateurs?: IUtilisateur[], id?: string) {
    return utilisateurs?.find(utilisateur => utilisateur.idUtilisateur === id)
      ?.trigramme;
  }
}

export const storeRece = new StoreRece();
