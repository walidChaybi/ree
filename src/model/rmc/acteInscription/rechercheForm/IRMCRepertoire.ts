import { INatureRca } from "@model/etatcivil/enum/NatureRca";
import { getValeurOuUndefined } from "@util/Utils";
import { INatureRc } from "../../../etatcivil/enum/NatureRc";
import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

export interface IRMCRepertoire {
  numeroInscription?: string;
  typeRepertoire?: string;
  natureInscription?: INatureRc | INatureRca;
}

export const RMCRepertoire = {
  getNatureRcRca(repertoire?: IRMCRepertoire) {
    let res;
    if (
      repertoire &&
      repertoire.typeRepertoire &&
      (TypeRepertoire.getEnumFor(repertoire.typeRepertoire) === TypeRepertoire.RC ||
        TypeRepertoire.getEnumFor(repertoire.typeRepertoire) === TypeRepertoire.RCA)
    ) {
      res = getValeurOuUndefined(repertoire.natureInscription);
    }
    return res;
  }
};
