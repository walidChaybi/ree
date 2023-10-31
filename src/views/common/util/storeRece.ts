import { IEntite } from "@model/agent/IEntiteRattachement";
import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import parametres from "../../../ressources/parametres.json";
import { Rot5 } from "./crypto/Rot5";

const codePin = parametres.code_pin;

class StoreRece {
  private _utilisateurCourant?: IOfficier;
  private _codePin?: string;
  private _timerCodePin?: number;
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

  set codePin(code: string | undefined) {
    this._codePin = Rot5.crypte(code);
    this.timeoutCodePin();
  }

  get codePin(): string | undefined {
    this.timeoutCodePin();
    return Rot5.decrypte(this._codePin);
  }

  resetCodePin() {
    this._codePin = undefined;
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

  // La sauvegarde du code pin est de 30 min (1800000 millisecondes) depuis sa dernière utilisation
  private readonly timeoutCodePin = () => {
    if (this._timerCodePin != null) {
      window.clearTimeout(this._timerCodePin);
    }
    this._timerCodePin = window.setTimeout(() => {
      this._codePin = undefined;
    }, codePin.time_out_ms);
  };

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
