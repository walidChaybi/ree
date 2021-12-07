import { useEffect, useState } from "react";
import { postPieceComplementInformationApi } from "../../../api/appels/requeteApi";
import { getPieceComplementInformation } from "../../pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { PieceJointe } from "../util/FileUtils";
import { logError } from "../util/LogManager";

export enum TypePieceJointe {
  PIECE_COMPLEMENT_INFORMATION,
  PIECE_JUSTIFICATIVE
}

export function usePostPiecesJointesApi(
  typePiece: TypePieceJointe,
  idRequete?: string,
  piecesJointes?: PieceJointe[]
): [boolean, string[]] {
  const [uuiDocuments, setUuidDocuments] = useState<string[]>([]);
  const [
    ajoutPieceJointeTermine,
    setAjoutPieceJointeTermine
  ] = useState<boolean>(false);
  const [piecesJointesAEnvoyer, setPiecesJointesAEnvoyer] = useState<
    PieceJointe[]
  >();

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
          let pieceAEnvoyer: any;
          let result;
          if (typePiece === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION) {
            pieceAEnvoyer = getPieceComplementInformation(
              piecesJointesAEnvoyer[0]
            );
            result = await postPieceComplementInformationApi(
              idRequete,
              pieceAEnvoyer
            );
            // TODO US 620 case Piece justificative
          }
          if (result) {
            setUuidDocuments([...uuiDocuments, result.body.data]);
            setPiecesJointesAEnvoyer(piecesJointesAEnvoyer.slice(1));
          }
        } catch (error) {
          logError({
            messageUtilisateur: `Impossible de stocker le document ${piecesJointesAEnvoyer[0].base64File.fileName}`,
            error
          });
        }
      } else if (piecesJointesAEnvoyer && piecesJointesAEnvoyer.length === 0) {
        setAjoutPieceJointeTermine(true);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [piecesJointesAEnvoyer]);

  return [ajoutPieceJointeTermine, uuiDocuments];
}
