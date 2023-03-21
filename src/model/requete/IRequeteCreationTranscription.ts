import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { NatureActeTranscription } from "./NatureActeTranscription";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IRequeteCreationTranscription
  extends IRequeteCreationEtablissement {
  natureActeTranscrit?: NatureActeTranscription;
}

export const RequeteCreationTranscription = {
  getPJsTranscriptionTrieesParPriorites(
    requete: IRequeteCreationTranscription
  ): IPieceJustificativeCreation[] {
    return requete.piecesJustificatives
      ? requete.piecesJustificatives.sort(
          (pj1, pj2) => pj1.ordreNatali - pj2.ordreNatali
        )
      : [];
  }
};
