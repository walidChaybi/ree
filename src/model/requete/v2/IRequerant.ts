/* istanbul ignore file */

import { formatNom, formatPrenom } from "../../../views/common/util/Utils";
import { IAdresseRequerant } from "./IAdresseRequerant";
import { ILienRequerant } from "./ILienRequerant";
import { IQualiteRequerant } from "./IQualiteRequerant";

export interface IRequerant {
  id: string;
  dateCreation: Date;
  nomFamille?: string;
  prenom?: string;
  courriel?: string;
  telephone?: string;
  adresse?: IAdresseRequerant;
  qualiteRequerant: IQualiteRequerant;
  lienRequerant?: ILienRequerant;
}

export const Requerant = {
  getNomFamille(requerant?: IRequerant): string {
    return requerant ? formatNom(requerant.nomFamille) : "";
  },
  getPrenom(requerant?: IRequerant): string {
    return requerant && requerant.prenom ? formatPrenom(requerant.prenom) : "";
  }
};
