import {
  getPieceComplementInformationById,
  getPieceJustificativeById
} from "@api/appels/requeteApi";
import { IPieceComplementInformation } from "@model/requete/pieceJointe/IPieceComplementInformation";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { TypePieceJointe } from "./PostPiecesJointesHook";

export function useGetPieceJointeApi(
  type: TypePieceJointe,
  id?: string
): IPieceJustificative | IPieceComplementInformation | undefined {
  const [PieceJointe, setPieceJointe] = useState<
    IPieceJustificative | IPieceComplementInformation | undefined
  >();
  useEffect(() => {
    if (id && type === TypePieceJointe.PIECE_JUSTIFICATIVE) {
      getPieceJustificativeById(id)
        .then(result => {
          setPieceJointe(result.body.data);
        })
        .catch(error => {
          gereErreur(error);
        });
    } else if (id && type === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION) {
      getPieceComplementInformationById(id)
        .then(result => {
          setPieceJointe(result.body.data);
        })
        .catch(error => {
          gereErreur(error);
        });
    }
  }, [type, id]);
  return PieceJointe;
}

/* istanbul ignore next */
function gereErreur(error: any) {
  logError({
    messageUtilisateur: "Impossible de récupérer le document",
    error
  });
}

