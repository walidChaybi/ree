/* istanbul ignore file */

import { DEUX, formatNom, formatPrenoms, UN } from "@util/Utils";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";

export interface IParent {
  id: string;
  position: number;
  nomNaissance: string;
  prenoms: IPrenomOrdonnes[];
  nom?: string;
}

export const Parent = {
  getNom(parent?: IParent): string {
    return parent ? formatNom(parent.nomNaissance) : "";
  },
  getPrenoms(parent?: IParent): string {
    return parent?.prenoms && parent.prenoms.length > 0
      ? formatPrenoms([
          parent.prenoms[0].prenom,
          parent.prenoms[UN]?.prenom,
          parent.prenoms[DEUX]?.prenom
        ])
      : "";
  },
  getPrenom(numero: number, parent?: IParent): string {
    let res = "";
    if (parent?.prenoms) {
      const prenom = parent.prenoms.find(
        element => element.numeroOrdre === numero
      );
      res = prenom?.prenom ?? "";
    }
    return res;
  },
  getPrenom1(parent: IParent): string {
    return this.getPrenom(1, parent);
  },
  getPrenom2(parent: IParent): string {
    const indexPrenom = 2;
    return this.getPrenom(indexPrenom, parent);
  },
  getPrenom3(parent: IParent): string {
    const indexPrenom = 3;
    return this.getPrenom(indexPrenom, parent);
  }
};
