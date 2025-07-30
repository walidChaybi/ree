import { ETypeRepertoire } from "../../../etatcivil/enum/TypeRepertoire";

export interface IRMCRepertoire {
  numeroInscription?: string;
  typeRepertoire?: string;
  natureInscription?: string;
  etInscriptionsSuivantes?: boolean;
}

export const RMCRepertoire = {
  getNatureRcRca(repertoire?: IRMCRepertoire): string | undefined {
    if (
      repertoire?.typeRepertoire &&
      (repertoire.typeRepertoire === ETypeRepertoire.RC || repertoire.typeRepertoire === ETypeRepertoire.RCA)
    ) {
      return repertoire.natureInscription || undefined;
    }
    return undefined;
  }
};
