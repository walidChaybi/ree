import { Generateur } from "./generateur/Generateur";

export class GestionnaireDoubleOuverture {
  private readonly uuidAppli = Generateur.genereCleUnique();
  private readonly DELAIS = 1000;
  private interval: any = 0;

  init = () => {
    localStorage.setItem("uuidAppli", this.uuidAppli);
  };

  ecouteNouvelleAppli = () => {
    return localStorage.getItem("uuidAppli") !== this.uuidAppli;
  };

  lancerVerification = (fctActionSiAppliDejaOuverte: () => void) => {
    this.interval = setInterval(
      () => this.actionSiAppliOuverte(fctActionSiAppliDejaOuverte),
      this.DELAIS
    );
  };

  actionSiAppliOuverte = (fctActionSiAppliDejaOuverte: () => void) => {
    if (this.ecouteNouvelleAppli()) {
      fctActionSiAppliDejaOuverte();
      this.arreterVerification();
    }
  };

  arreterVerification() {
    clearInterval(this.interval);
    this.interval = false;
  }

  checkMinuteurEstArrete() {
    return this.interval === false;
  }
}

export const gestionnaireDoubleOuverture = new GestionnaireDoubleOuverture();
