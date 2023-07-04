import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { FenetreExterne } from "@util/FenetreExterne";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React from "react";

interface FenetrePieceProps {
  idPiece: string;
  nom: string;
  numRequete?: string;
  typePiece: TypePieceJointe;
  toggleFenetre: () => void;
}

const RATIO_WIDTH = 0.33;
const RATIO_HEIGHT = 0.66;
export const FenetrePiecesJointes: React.FC<FenetrePieceProps> = props => {
  const contenuPiece = useGetPieceJointeApi(props.typePiece, props.idPiece);

  return (
    <FenetreExterne
      titre={`${props.nom} - Req N°${props.numRequete}`}
      onCloseHandler={() => {
        onClose(props);
      }}
      ratioWidth={RATIO_WIDTH}
      ratioHeight={RATIO_HEIGHT}
    >
      {contenuPiece && (
        <VisionneuseAvecTitre
          titre={
            props.typePiece === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION
              ? "Pièces Complémentaires"
              : "Pièces Justificatives"
          }
          contenuBase64={contenuPiece.contenu}
          typeMime={contenuPiece.mimeType}
        />
      )}
    </FenetreExterne>
  );
};

export function onClose(props: React.PropsWithChildren<FenetrePieceProps>) {
  props.toggleFenetre();
}
