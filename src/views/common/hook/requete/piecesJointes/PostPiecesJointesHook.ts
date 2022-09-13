import {
  postPieceComplementInformationApi,
  postPieceJustificative
} from "@api/appels/requeteApi";
import {
  getPieceComplementInformation,
  getPieceJustificative
} from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { PieceJointe } from "@util/FileUtils";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

export enum TypePieceJointe {
  PIECE_COMPLEMENT_INFORMATION,
  PIECE_JUSTIFICATIVE
}

export interface IPostPiecesJointesApiResultat {
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

  const [piecesJointesAEnvoyer, setPiecesJointesAEnvoyer] =
    useState<PieceJointe[]>();

  useEffect(() => {
    if (idRequete && piecesJointes && piecesJointes.length > 0) {
      setPiecesJointesAEnvoyer(piecesJointes);
    }
  }, [idRequete, piecesJointes]);

  useEffect(() => {
    async function fetchData() {
      if (
        idRequete &&
        piecesJointesAEnvoyer &&
        piecesJointesAEnvoyer.length > 0
      ) {
        try {
          let result;
          const pieceJointeAEnvoyer = piecesJointesAEnvoyer[0];
          if (typePiece === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION) {
            result = await postPieceComplementInformationApi(
              idRequete,
              getPieceComplementInformation(pieceJointeAEnvoyer)
            );
          } else if (typePiece === TypePieceJointe.PIECE_JUSTIFICATIVE) {
            result = await postPieceJustificative(
              idRequete,
              getPieceJustificative(pieceJointeAEnvoyer)
            );
          }
          if (result) {
            setUuidDocuments([...uuidDocuments, result.body.data]);
            setPiecesJointesAEnvoyer(piecesJointesAEnvoyer.slice(1));
          }
        } catch (error) {
          setResultat({
            erreur: error,
            uuidDocuments
          });
          logError({
            messageUtilisateur: `Impossible de stocker le document ${piecesJointesAEnvoyer[0].base64File.fileName}`,
            error
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
