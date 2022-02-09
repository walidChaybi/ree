import { MimeType } from "file-type/core";
import React from "react";
import { useGetPieceJustificativeApi } from "../../../../../../../../common/hook/PieceJustificativeHook";
import { FenetreExterne } from "../../../../../../../../common/util/FenetreExterne";
import { VisionneuseAvecTitre } from "../../../../../../../../common/widget/document/VisionneuseAvecTitre";

interface FenetrePieceProps {
  idPiece: string;
  nom: string;
  numRequete: string;
  toggleFenetre: () => void;
}

const RATIO_WIDTH = 0.33;
const RATIO_HEIGHT = 0.66;
export const FenetrePiecesJustificatives: React.FC<FenetrePieceProps> =
  props => {
    const contenuPiece = useGetPieceJustificativeApi(props.idPiece);
    return (
      <FenetreExterne
        titre={`${props.nom} - Req N°${props.numRequete}`}
        onCloseHandler={() => {
          onClose(props);
        }}
        ratioWidth={RATIO_WIDTH}
        ratioHeight={RATIO_HEIGHT}
      >
        <VisionneuseAvecTitre
          titre={"Pièce Justificative"}
          contenu={contenuPiece?.contenu}
          typeMime={contenuPiece?.mimeType as MimeType}
        ></VisionneuseAvecTitre>
      </FenetreExterne>
    );
  };

export function onClose(props: React.PropsWithChildren<FenetrePieceProps>) {
  props.toggleFenetre();
}
