import { v4 as uuidv4 } from "uuid";

export class GestionnaireDoubleOuverture {
  private readonly uuidAppli = uuidv4();
  private readonly DELAIS = 1000;

  init = () => {
    localStorage.setItem("uuidAppli", this.uuidAppli);
  };

  ecouteNouvelleAppli = () => {
    return localStorage.getItem("uuidAppli") !== this.uuidAppli;
  };

  lancerVerification = (fctActionSiAppliDejaOuverte: () => void) => {
    const interval: NodeJS.Timeout = setInterval(
      () => this.actionSiAppliOuverte(fctActionSiAppliDejaOuverte, interval),
      this.DELAIS
    );
  };

  actionSiAppliOuverte = (
    fctActionSiAppliDejaOuverte: () => void,
    interval: NodeJS.Timeout
  ) => {
    if (this.ecouteNouvelleAppli()) {
      fctActionSiAppliDejaOuverte();
      clearInterval(interval);
    }
  };
}

export const gestionnaireDoubleOuverture = new GestionnaireDoubleOuverture();
