import React from "react";
import { useGetDocumentReponseApi } from "../../../../../common/hook/DocumentReponseHook";
import { getValeurOuVide } from "../../../../../common/util/Utils";
import { VisionneuseDocument } from "../../../../../common/widget/document/VisionneuseDocument";

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
