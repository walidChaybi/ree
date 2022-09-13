import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { getValeurOuVide } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { VisionneuseDocument } from "../document/VisionneuseDocument";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionVisionneuse.scss";

export interface AccordionVisionneuseProps {
  idDocumentAAfficher: string;
  titre: string;
}

export const AccordionVisionneuse: React.FC<AccordionVisionneuseProps> = ({
  idDocumentAAfficher,
  titre
}) => {
  const [idDocument, setIdDocument] = useState<string>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIdDocument(isExpanded ? idDocumentAAfficher : undefined);
  }, [isExpanded, idDocumentAAfficher]);

  const documentApi = useGetPieceJointeApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    idDocument
  );

  return (
    <Accordion
      key={`rece-accordion-${titre}`}
      className="AccordionVisionneuse"
      expanded={isExpanded}
      onChange={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      <AccordionTitle title={titre} />
      <AccordionDetails>
        <VisionneuseDocument
          titre={titre}
          typeMime={getValeurOuVide(documentApi?.mimeType)}
          contenu={documentApi?.contenu}
        />
      </AccordionDetails>
    </Accordion>
  );
};
