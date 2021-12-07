/* istanbul ignore file */

import { formatNom, formatPrenom } from "../../views/common/util/Utils";
import { TypeLienMandant } from "./enum/TypeLienMandant";
import { TypeMandant } from "./enum/TypeMandant";

export interface IMandant {
  id: string;
  type: TypeMandant;
  nom?: string;
  prenom?: string;
  raisonSociale?: string;
  typeLien?: TypeLienMandant;
  natureLien?: string;
}

export const Mandant = {
  getNom(requerant?: IMandant): string {
    return requerant ? formatNom(requerant.nom) : "";
  },
  getPrenom(requerant?: IMandant): string {
    return requerant ? formatPrenom(requerant.prenom) : "";
  }
};
