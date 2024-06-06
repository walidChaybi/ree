import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";

class StoreRece {
  private _utilisateurCourant?: IOfficier;
  private _retourUrl = "";
  private _listeUtilisateurs: IUtilisateur[] = [];
  private _listeServices: IService[] = [];
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

  get listeServices(): IService[] {
    return this._listeServices;
  }

  set listeServices(liste: IService[]) {
    this._listeServices = liste;
  }

  get decrets(): IDecret[] {
    return this._decrets;
  }

  set decrets(decrets: IDecret[]) {
    this._decrets = decrets;
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

  public getLibelleService(id: string) {
    return this.listeServices.find(service => service.idService === id)
      ?.libelleService;
  }

  public getTrigrammeFromID(id?: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.trigramme;
  }
}

export const storeRece = new StoreRece();
