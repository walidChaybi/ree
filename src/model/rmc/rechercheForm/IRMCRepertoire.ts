import { NatureRc } from "../../etatcivil/enum/NatureRc";
import { NatureRca } from "../../etatcivil/enum/NatureRca";
import { TypeRepertoire } from "../../etatcivil/enum/TypeRepertoire";
import { valeurOuUndefined } from "../../../views/common/util/Utils";

export interface IRMCRepertoire {
  numeroInscription?: string;
  typeRepertoire?: string;
  natureInscription?: NatureRc | NatureRca;
}

export const RMCRepertoire = {
  getNatureRc(repertoire?: IRMCRepertoire) {
    let res;
    if (
      repertoire &&
      repertoire.typeRepertoire &&
      TypeRepertoire.getEnumFor(repertoire.typeRepertoire) === TypeRepertoire.RC
    ) {
      res = valeurOuUndefined(repertoire.natureInscription);
    }
    return res;
  },
  getNatureRca(repertoire?: IRMCRepertoire) {
    let res;
    if (
      repertoire &&
      repertoire.typeRepertoire &&
      TypeRepertoire.getEnumFor(repertoire.typeRepertoire) ===
        TypeRepertoire.RCA
    ) {
      res = valeurOuUndefined(repertoire.natureInscription);
    }
    return res;
  }
};
