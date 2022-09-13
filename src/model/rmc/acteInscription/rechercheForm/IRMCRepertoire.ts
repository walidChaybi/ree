import { valeurOuUndefined } from "@util/Utils";
import { NatureRc } from "../../../etatcivil/enum/NatureRc";
import { NatureRca } from "../../../etatcivil/enum/NatureRca";
import { TypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

export interface IRMCRepertoire {
  numeroInscription?: string;
  typeRepertoire?: string;
  natureInscription?: NatureRc | NatureRca;
}

export const RMCRepertoire = {
  getNatureRcRca(repertoire?: IRMCRepertoire) {
    let res;
    if (
      repertoire &&
      repertoire.typeRepertoire &&
      (TypeRepertoire.getEnumFor(repertoire.typeRepertoire) ===
        TypeRepertoire.RC ||
        TypeRepertoire.getEnumFor(repertoire.typeRepertoire) ===
          TypeRepertoire.RCA)
    ) {
      res = valeurOuUndefined(repertoire.natureInscription);
    }
    return res;
  }
};
