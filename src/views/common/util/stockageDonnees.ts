import { IRMCActeInscription } from "../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

const CRITERES_RMC_ACTE_INSPT = "criteresRMCActeInspt";
const CRITERES_RMC_REQ = "criteresRMCReq";

class StockageDonnees {
  stockerDonnees(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  recupererDonnees(key: string) {
    return localStorage.getItem(key);
  }

  stockerCriteresRMCActeInspt(data: any) {
    this.stockerDonnees(CRITERES_RMC_ACTE_INSPT, JSON.stringify(data));
  }

  recupererCriteresRMCActeInspt() {
    let res;
    const value = this.recupererDonnees(CRITERES_RMC_ACTE_INSPT);
    if (value) {
      res = JSON.parse(value) as IRMCActeInscription;
    }
    return res;
  }

  stockerCriteresRMCReq(data: any) {
    this.stockerDonnees(CRITERES_RMC_REQ, JSON.stringify(data));
  }

  recupererCriteresRMCReq() {
    let res;
    const value = this.recupererDonnees(CRITERES_RMC_REQ);
    if (value) {
      res = JSON.parse(value) as IRMCActeInscription;
    }
    return res;
  }
}

export const stockageDonnees = new StockageDonnees();
