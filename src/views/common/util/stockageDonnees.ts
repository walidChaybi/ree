import { IRMCActeArchive } from "@model/rmc/acteArchive/rechercheForm/IRMCActeArchive";
import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";

const CRITERES_RMC_ACTE_ARCHIVE = "criteresRMCActeArchive";
const CRITERES_RMC_REQ = "criteresRMCReq";

class StockageDonnees {
  stockerDonnees(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  recupererDonnees(key: string) {
    return localStorage.getItem(key);
  }

  // A SUPPRIMER QUAND RMC ARCHIVE SERA TERMINE
  stockerCriteresRMCActeArchive(data: any) {
    this.stockerDonnees(CRITERES_RMC_ACTE_ARCHIVE, JSON.stringify(data));
  }

  recupererCriteresRMCActeArchive() {
    let res;
    const value = this.recupererDonnees(CRITERES_RMC_ACTE_ARCHIVE);
    if (value) {
      res = JSON.parse(value) as IRMCActeArchive;
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
