import parametres from "../../../ressources/parametres.json";
import { Crypto } from "./crypto/Crypto";
const pass = parametres.pass;

export class GestionnaireDoubleOuverture {
  static verifSiAppliDejaOuverte() {
    const nAppli = localStorage.getItem("nAppliOuverte");
    if (nAppli && parseInt(Crypto.decrypte(nAppli, pass)) > 0) {
      return true;
    } else {
      return false;
    }
  }

  static verifSiAppliNonDejaOuverte() {
    const nAppli = localStorage.getItem("nAppliOuverte");
    if (!nAppli || (nAppli && Crypto.decrypte(nAppli, pass) === "0")) {
      return true;
    } else {
      return false;
    }
  }

  static incrementeNAppliOuverte() {
    const nAppliCypher = localStorage.getItem("nAppliOuverte");
    const nAppli = nAppliCypher
      ? parseInt(Crypto.decrypte(nAppliCypher, pass))
      : 0;
    localStorage.setItem(
      "nAppliOuverte",
      Crypto.encrypte((nAppli + 1).toString(), pass)
    );
  }

  static decroitNAppliOnUnload() {
    window.addEventListener("beforeunload", this.decroitNAppliOuverte);
  }

  static decroitNAppliOuverte() {
    const nAppliCypher = localStorage.getItem("nAppliOuverte");
    if (nAppliCypher) {
      const nAppli = parseInt(Crypto.decrypte(nAppliCypher, pass));
      localStorage.setItem(
        "nAppliOuverte",
        Crypto.encrypte(nAppli > 0 ? (nAppli - 1).toString() : "0", pass)
      );
      window.removeEventListener("beforeunload", this.decroitNAppliOuverte);
    }
  }

  static resetNAppli() {
    localStorage.setItem("nAppliOuverte", Crypto.encrypte("0", pass));
  }
}
