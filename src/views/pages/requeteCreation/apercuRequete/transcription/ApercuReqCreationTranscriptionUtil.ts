import { Requete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";

export function onRenommePieceJustificative(
  idPieceJustificative: string,
  nouveauLibelle: string,
  requete: IRequeteCreationTranscription | undefined,
  setRequete: any
) {
  const pjARenommer = Requete.getPieceJustificative(
    requete,
    idPieceJustificative
  ) as IPieceJustificativeCreation;
  if (pjARenommer) {
    pjARenommer.libelle = nouveauLibelle;
    setRequete({ ...requete } as IRequeteCreationTranscription);
  }
}
