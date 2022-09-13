import { useGetDocumentReponseApi } from "@hook/DocumentReponseHook";
import { getValeurOuVide } from "@util/Utils";
import { VisionneuseDocument } from "@widget/document/VisionneuseDocument";
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
      contenu={documentApi?.contenu}
      titre={getValeurOuVide(documentApi?.nom)}
      typeMime={getValeurOuVide(documentApi?.mimeType)}
    ></VisionneuseDocument>
  );
};
