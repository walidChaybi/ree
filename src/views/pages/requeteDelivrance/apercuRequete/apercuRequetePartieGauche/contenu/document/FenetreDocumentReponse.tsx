import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { FenetreExterne } from "@util/FenetreExterne";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React from "react";

interface DocumentReponseProps {
  numRequete: string;
  nom: string;
  contenuPiece?: IDocumentReponse;
  toggleFenetre: () => void;
}

export const FenetreDocumentReponse: React.FC<DocumentReponseProps> = props => {
  const ratioWidth = 0.33;
  const ratioHeight = 0.66;

  return (
    <FenetreExterne
      titre={`${props.nom} - Req N°${props.numRequete}`}
      onCloseHandler={() => {
        onClose(props);
      }}
      ratioWidth={ratioWidth}
      ratioHeight={ratioHeight}
    >
      {props.contenuPiece && (
        <VisionneuseAvecTitre
          titre={"Document réponse"}
          contenuBase64={props.contenuPiece.contenu}
          typeMime={props.contenuPiece.mimeType}
        />
      )}
    </FenetreExterne>
  );
};

export function onClose(props: React.PropsWithChildren<DocumentReponseProps>) {
  props.toggleFenetre();
}
