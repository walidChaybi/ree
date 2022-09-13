/* istanbul ignore file */

import { DEUX, formatNom, formatPrenoms, UN } from "@util/Utils";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface IParent {
  id: string;
  position: number;
  nomNaissance: string;
  prenoms: IPrenomOrdonnes[];
}

export const Parent = {
  getNom(parent?: IParent): string {
    return parent ? formatNom(parent.nomNaissance) : "";
  },
  getPrenoms(parent?: IParent): string {
    return parent && parent.prenoms && parent.prenoms.length > 0
      ? formatPrenoms([
          parent.prenoms[0].prenom,
          parent.prenoms[UN]?.prenom,
          parent.prenoms[DEUX]?.prenom
        ])
      : "";
  }
};
