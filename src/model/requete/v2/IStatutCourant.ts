import { StatutRequete } from "./enum/StatutRequete";

export interface IStatutCourant {
  statut: StatutRequete;
  dateEffet: string;
  raisonStatut?: string;
}
