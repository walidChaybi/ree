import { IRequeteCreationEtablissement } from "./IRequeteCreationEtablissement";
import { IPieceJustificativeCreation } from "./pieceJointe/IPieceJustificativeCreation";

export interface IRequeteCreationTranscription
  extends IRequeteCreationEtablissement {}

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
