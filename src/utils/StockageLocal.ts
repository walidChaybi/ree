import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";

interface ITypeDonneesStockees {
  CRITERES_RMC_ACTE_INSCRIPTION: IRMCActeInscriptionForm;
  CRITERES_RMC_ACTE_ARCHIVE: any;
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
