import { MimeType } from "file-type/core";
import React from "react";
import { IDocumentReponse } from "../../../../../../../model/requete/v2/IDocumentReponse";
import { FenetreExterne } from "../../../../../../common/util/FenetreExterne";
import { VisionneuseDocument } from "../../../../../../common/widget/document/VisionneuseDocument";

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
      <VisionneuseDocument
        titre={"Document réponse"}
        contenu={props.contenuPiece?.contenu}
        typeMime={props.contenuPiece?.mimeType as MimeType}
      ></VisionneuseDocument>
    </FenetreExterne>
  );
};

export function onClose(props: React.PropsWithChildren<DocumentReponseProps>) {
  props.toggleFenetre();
}
