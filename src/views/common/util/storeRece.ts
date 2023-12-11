import { IEntite } from "@model/agent/IEntiteRattachement";
import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";

class StoreRece {
  private _utilisateurCourant?: IOfficier;
  private _retourUrl = "";
  private _listeUtilisateurs: IUtilisateur[] = [];
  private _listeEntite: IEntite[] = [];
  private _decrets: IDecret[] = [];
  private _logErrorOff = false;

  set logErrorOff(estOff: boolean) {
    if (process.env.NODE_ENV === "test") {
      this._logErrorOff = estOff;
    } else {
      throw new Error("Pas de désactivation de la log en dehors des tests");
    }
  }

  get logErrorOff() {
    return this._logErrorOff;
  }

  set retourUrl(ru: string) {
    this._retourUrl = ru;
  }

  get retourUrl() {
    return this._retourUrl;
  }

  set utilisateurCourant(uc: IOfficier | undefined) {
    this._utilisateurCourant = uc;
  }

  get utilisateurCourant() {
    return this._utilisateurCourant;
  }

  set listeUtilisateurs(liste: IUtilisateur[]) {
    this._listeUtilisateurs = liste;
  }

  get listeUtilisateurs(): IUtilisateur[] {
    return this._listeUtilisateurs;
  }

  set listeEntite(liste: IEntite[]) {
    this._listeEntite = liste;
  }

  get decrets(): IDecret[] {
    return this._decrets;
  }

  set decrets(decrets: IDecret[]) {
    this._decrets = decrets;
  }

  get listeEntite(): IEntite[] {
    return this._listeEntite;
  }

  public getNomPrenomUtilisateurAPartirId(id: string) {
    return `${this.getNomUtilisateurAPartirID(
      id
    )} ${this.getPrenomUtilisateurAPartirID(id)}`;
  }

  public getPrenomUtilisateurAPartirID(id: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.prenom;
  }
  public getNomUtilisateurAPartirID(id: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.nom;
  }

  public getLibelleEntite(id: string) {
    return this.listeEntite.find(entite => entite.idEntite === id)
      ?.libelleEntite;
  }

  public getTrigrammeFromID(id?: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.trigramme;
  }
}

export const storeRece = new StoreRece();
