import {
  IMajLibellePjParams,
  useMiseAJourLibellePjApiHook
} from "@hook/requete/creation/MiseAJourLibellePjApiHook";
import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { getValeurOuVide } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { VisionneuseDocument } from "../document/VisionneuseDocument";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionVisionneuse.scss";

export interface AccordionVisionneuseProps {
  idDocumentAAfficher: string;
  titre?: string;
  titreOrigine: string;
  setTitreActuel: (nouveauTitre: string) => void;
}

export const AccordionVisionneuse: React.FC<AccordionVisionneuseProps> = ({
  idDocumentAAfficher,
  titre,
  titreOrigine,
  setTitreActuel
}) => {
  const [idDocument, setIdDocument] = useState<string>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [majTitreParams, setMajTitreParams] = useState<IMajLibellePjParams>();

  useEffect(() => {
    setIdDocument(isExpanded ? idDocumentAAfficher : undefined);
  }, [isExpanded, idDocumentAAfficher]);

  const resultatMaj = useMiseAJourLibellePjApiHook(majTitreParams);

  useEffect(() => {
    if (resultatMaj && resultatMaj.resultat && majTitreParams?.nouveauLibelle) {
      setTitreActuel(majTitreParams?.nouveauLibelle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatMaj]);

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
        titre={titre}
        handleMiseAJourLibelle={(nouveauLibelle: string) =>
          setMajTitreParams({
            idPJ: idDocumentAAfficher,
            libelle: titre ?? titreOrigine,
            nouveauLibelle
          })
        }
        titreOrigine={titreOrigine}
      />
      <AccordionDetails>
        <VisionneuseDocument
          titre={titre ?? titreOrigine}
          typeMime={getValeurOuVide(documentApi?.mimeType)}
          contenu={documentApi?.contenu}
        />
      </AccordionDetails>
    </Accordion>
  );
};
