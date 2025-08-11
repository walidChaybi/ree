import { postPieceComplementInformationApi, postPieceJustificative } from "@api/appels/requeteApi";
import { mapPieceComplementInformation } from "@model/requete/pieceJointe/IPieceComplementInformation";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { mapPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";

import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { PieceJointe } from "../../../../../utils/FileUtils";

interface IPostPiecesJointesApiResultat {
  uuidDocuments: string[];
  erreur?: any;
}

export function usePostPiecesJointesApi(
  typePiece: TypePieceJointe,
  idRequete?: string,
  piecesJointes?: PieceJointe[]
): IPostPiecesJointesApiResultat | undefined {
  const [resultat, setResultat] = useState<IPostPiecesJointesApiResultat>();
  const [uuidDocuments, setUuidDocuments] = useState<string[]>([]);

  const [piecesJointesAEnvoyer, setPiecesJointesAEnvoyer] = useState<PieceJointe[]>();

  useEffect(() => {
    if (idRequete && piecesJointes && piecesJointes.length > 0) {
      setPiecesJointesAEnvoyer(piecesJointes);
    }
  }, [idRequete, piecesJointes]);

  useEffect(() => {
    async function fetchData() {
      if (idRequete && piecesJointesAEnvoyer && piecesJointesAEnvoyer.length > 0) {
        try {
          let result;
          const pieceJointeAEnvoyer = piecesJointesAEnvoyer[0];
          if (typePiece === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION) {
            result = await postPieceComplementInformationApi(idRequete, mapPieceComplementInformation(pieceJointeAEnvoyer));
          } else if (typePiece === TypePieceJointe.PIECE_JUSTIFICATIVE) {
            result = await postPieceJustificative(idRequete, mapPieceJustificative(pieceJointeAEnvoyer));
          }
          if (result) {
            setUuidDocuments([...uuidDocuments, result.body.data]);
            setPiecesJointesAEnvoyer(piecesJointesAEnvoyer.slice(1));
          }
        } catch (erreurs) {
          setResultat({
            erreur: erreurs,
            uuidDocuments
          });
          AfficherMessage.erreur(`Impossible de stocker le document ${piecesJointesAEnvoyer[0].base64File.fileName}`, {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        }
      } else if (piecesJointesAEnvoyer && piecesJointesAEnvoyer.length === 0) {
        setResultat({
          uuidDocuments
        });
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [piecesJointesAEnvoyer]);

  return resultat;
}
