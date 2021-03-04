import { IOfficierSSOApi } from "../../../model/IOfficierSSOApi";
import parametres from "../../../ressources/parametres.json";
import { Rot18 } from "./crypto/cryptos";

const codePin = parametres.code_pin;

class StoreRece {
  private _utilisateurCourant?: IOfficierSSOApi;
  private _codePin?: string;
  private _timerCodePin?: number;
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

  // La sauvegarde du code pin est de 30 min (1800000 millisecondes) depuis sa dernière utilisation
  private readonly timeoutCodePin = () => {
    if (this._timerCodePin != null) {
      window.clearTimeout(this._timerCodePin);
    }
    this._timerCodePin = window.setTimeout(() => {
      this._codePin = undefined;
    }, codePin.time_out_ms);
  };
}

export const storeRece = new StoreRece();
