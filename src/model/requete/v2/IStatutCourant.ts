import { StatutRequete } from "./enum/StatutRequete";

export interface IStatutCourant {
  statut: StatutRequete;
  dateEffet: number;
  raisonStatut?: string;
}
