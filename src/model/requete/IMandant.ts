/* istanbul ignore file */

import { formatPrenom } from "@util/Utils";
import { ETypeLienMandant } from "./enum/ETypeLienMandant";
import { ETypeMandant } from "./enum/TypeMandant";

export interface IMandant {
  id: string;
  type: keyof typeof ETypeMandant;
  nom?: string;
  prenom?: string;
  raisonSociale?: string;
  typeLien?: keyof typeof ETypeLienMandant;
  natureLien?: string;
}

export const Mandant = {
  getNom(requerant?: IMandant): string {
    return requerant?.nom ?? "";
  },
  getPrenom(requerant?: IMandant): string {
    return requerant ? formatPrenom(requerant.prenom) : "";
  }
};
