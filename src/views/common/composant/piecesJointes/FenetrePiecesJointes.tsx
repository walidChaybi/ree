import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React from "react";
import FenetreExterne from "../../../../composants/commun/conteneurs/FenetreExterne";
import { useGetPieceJointeApi } from "../../hook/requete/piecesJointes/GetPieceJointeHook";

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
      apresFermeture={() => {
        props.toggleFenetre();
      }}
      ratioLargeur={RATIO_WIDTH}
      ratioHauteur={RATIO_HEIGHT}
    >
      {contenuPiece && (
        <VisionneuseAvecTitre
          titre={props.typePiece === TypePieceJointe.PIECE_COMPLEMENT_INFORMATION ? "Pièces Complémentaires" : "Pièces Justificatives"}
          contenuBase64={contenuPiece.contenu}
          typeMime={contenuPiece.mimeType}
        />
      )}
    </FenetreExterne>
  );
};
