import { MimeType } from "file-type/core";
import React from "react";
import { useGetDocumentReponseApi } from "../../../../common/hook/v2/DocumentReponseHook";
import { FenetreExterne } from "../../../../common/util/FenetreExterne";
import { VisionneuseDocument } from "../../../../common/widget/document/VisionneuseDocument";

interface DocumentReponseProps {
  idDocument: string;
  numRequete: string;
  nom: string;
  toggleFenetre: () => void;
}

export const FenetreDocumentReponse: React.FC<DocumentReponseProps> = props => {
  const contenuPiece = useGetDocumentReponseApi(props.idDocument);
  return (
    <FenetreExterne
      titre={`${props.nom} - Req N°${props.numRequete}`}
      onCloseHandler={() => {
        onClose(props);
      }}
      ratioWidth={0.33}
      ratioHeight={0.66}
    >
      <VisionneuseDocument
        titre={"Document réponse"}
        contenu={contenuPiece?.contenu}
        typeMime={contenuPiece?.mimeType as MimeType}
      ></VisionneuseDocument>
    </FenetreExterne>
  );
};

export function onClose(props: React.PropsWithChildren<DocumentReponseProps>) {
  props.toggleFenetre();
}
