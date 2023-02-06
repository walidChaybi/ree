import { useGetDocumentReponseApi } from "@hook/DocumentReponseHook";
import { getValeurOuVide } from "@util/Utils";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React from "react";

interface VisionneuseEditionProps {
  idDocumentAAfficher?: string;
}

export const VisionneuseEdition: React.FC<VisionneuseEditionProps> = ({
  idDocumentAAfficher
}) => {
  const documentApi = useGetDocumentReponseApi(idDocumentAAfficher);

  return (
    <VisionneuseDocument
      contenuBase64={documentApi?.contenu}
      infoBulle={getValeurOuVide(documentApi?.nom)}
      typeMime={getValeurOuVide(documentApi?.mimeType)}
    ></VisionneuseDocument>
  );
};
