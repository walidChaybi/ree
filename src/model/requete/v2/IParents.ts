/* istanbul ignore file */

import { formatNom, formatPrenoms } from "../../../views/common/util/Utils";
import { IPrenom } from "../../etatcivil/fiche/IPrenom";

export interface IParent {
  id: string;
  position: number;
  nomNaissance: string;
  prenoms: IPrenom[];
}

export const Parent = {
  getNom(parent?: IParent): string {
    return parent ? formatNom(parent.nomNaissance) : "";
  },
  getPrenoms(parent?: IParent): string {
    return parent && parent.prenoms && parent.prenoms.length > 0
      ? formatPrenoms([
          parent.prenoms[0].valeur,
          parent.prenoms[1]?.valeur,
          parent.prenoms[2]?.valeur
        ])
      : "";
  }
};
