import { IEntite } from "../../../model/agent/IEntiteRattachement";
import { IUtilisateur } from "../../../model/agent/IUtilisateur";
import { IOfficierSSOApi } from "../../../model/IOfficierSSOApi";
import parametres from "../../../ressources/parametres.json";
import { Rot18 } from "./crypto/Rot18";

const codePin = parametres.code_pin;

class StoreRece {
  private _utilisateurCourant?: IOfficierSSOApi;
  private _codePin?: string;
  private _timerCodePin?: number;
  private _retourUrl = "";
  private _listeUtilisateurs: IUtilisateur[] = [];
  private _listeEntite: IEntite[] = [];

  set retourUrl(ru: string) {
    this._retourUrl = ru;
  }

  get retourUrl() {
    return this._retourUrl;
  }

  set utilisateurCourant(uc: IOfficierSSOApi | undefined) {
    this._utilisateurCourant = uc;
  }

  get utilisateurCourant() {
    return this._utilisateurCourant;
  }

  set codePin(code: string | undefined) {
    this._codePin = Rot18.crypte(code);
    this.timeoutCodePin();
  }

  get codePin(): string | undefined {
    this.timeoutCodePin();
    return Rot18.decrypte(this._codePin);
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

  public getPrenomUtilisateurFromID(id: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.prenom;
  }
  public getNomUtilisateurFromID(id: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.nom;
  }

  public getLibelleEntite(id: string) {
    return this.listeEntite.find(entite => entite.idEntite === id)
      ?.libelleEntite;
  }

  public getTrigrammeFromID(id: string) {
    return this.listeUtilisateurs.find(
      utilisateur => utilisateur.idUtilisateur === id
    )?.trigramme;
  }
}

export const storeRece = new StoreRece();
