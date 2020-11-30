import { IOfficierSSOApi } from "../../../model/IOfficierSSOApi";

class StoreRece {
  private _utilisateurCourant?: IOfficierSSOApi;

  set utilisateurCourant(uc: IOfficierSSOApi | undefined) {
    this._utilisateurCourant = uc;
  }

  get utilisateurCourant() {
    return this._utilisateurCourant;
  }
}

export const storeRece = new StoreRece();
