import { ICriteresRMC } from "@model/rmc/commun/IRMCFormulaire";

export interface ITypeDonneesStockees {
  CRITERES_RMC_ACTE_INSCRIPTION: ICriteresRMC;
  CRITERES_RMC_ARCHIVE: ICriteresRMC;
  CRITERES_RMC_REQUETE: any;
  PROFIL_RECE: "RECE_USER" | "RECE_ADMIN" | "RECE_USER;RECE_ADMIN";
  ID_SSO: string;
}

export const StockageLocal = {
  stocker: <TTypeDonnees extends keyof ITypeDonneesStockees>(type: TTypeDonnees, donnees: ITypeDonneesStockees[TTypeDonnees]) => {
    localStorage.setItem(type, JSON.stringify(donnees));
  },
  recuperer: <TTypeDonnees extends keyof ITypeDonneesStockees>(
    type: TTypeDonnees,
    formatJSON = true
  ): ITypeDonneesStockees[TTypeDonnees] | null => {
    const valeur = localStorage.getItem(type);
    return formatJSON ? JSON.parse(valeur ?? "null") : valeur;
  }
};
