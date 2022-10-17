import { useMiseAJourLibellePjApiHook } from "@hook/requete/creation/MiseAJourLibellePjApiHook";
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
  const [titreActuel, setTitreActuel] = useState<string>(titre);

  useEffect(() => {
    setIdDocument(isExpanded ? idDocumentAAfficher : undefined);
  }, [isExpanded, idDocumentAAfficher]);

  useMiseAJourLibellePjApiHook({
    idPJ: idDocumentAAfficher,
    libelle: titre,
    nouveauLibelle: titreActuel
  });

  const documentApi = useGetPieceJointeApi(
    TypePieceJointe.PIECE_JUSTIFICATIVE,
    idDocument
  );

  return (
    <Accordion
      key={`rece-accordion-${titre}`}
      className="AccordionVisionneuse"
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <AccordionTitle
        title={titreActuel}
        handleMiseAJourLibelle={e => setTitreActuel(e)}
      />
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
