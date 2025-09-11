import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

const CRITERES_RMC_REQ = "criteresRMCReq";

/** @deprecated Remplacé par `StockageLocal`. Cette classe sera supprimée dans une future version. */
class StockageDonnees {
  stockerDonnees(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  recupererDonnees(key: string) {
    return localStorage.getItem(key);
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
