import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";

export interface ITypeDonneesStockees {
  CRITERES_RMC_ACTE_INSCRIPTION: ICriteresRMC;
  CRITERES_RMC_ARCHIVE: ICriteresRMC;
  CRITERES_RMC_REQUETE: any;
}

export const StockageLocal = {
  stocker: <T extends keyof ITypeDonneesStockees>(type: T, donnees: ITypeDonneesStockees[T]) => {
    localStorage.setItem(type, JSON.stringify(donnees));
  },
  recuperer: <T extends keyof ITypeDonneesStockees>(type: T): ITypeDonneesStockees[T] | null => {
    return JSON.parse(localStorage.getItem(type) ?? "null");
  }
};
