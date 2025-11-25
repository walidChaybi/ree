import { getPieceComplementInformationById, getPieceJustificativeById } from "@api/appels/requeteApi";
import { IPieceComplementInformation } from "@model/requete/pieceJointe/IPieceComplementInformation";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";

export const useGetPieceJointeApi = (type: TypePieceJointe, id?: string): IPieceJustificative | IPieceComplementInformation | undefined => {
  const [PieceJointe, setPieceJointe] = useState<IPieceJustificative | IPieceComplementInformation | undefined>();
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
};

/* istanbul ignore next */
const gereErreur = (erreurs: any) => {
  AfficherMessage.erreur("Impossible de récupérer le document", {
    erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
    fermetureAuto: true
  });
};
