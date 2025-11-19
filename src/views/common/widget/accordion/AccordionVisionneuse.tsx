import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import AffichageDocument from "../../../../composants/commun/affichageDocument/AffichageDocument";
import { FenetrePiecesJointes } from "../../composant/piecesJointes/FenetrePiecesJointes";
import { IMajLibellePjParams, useMiseAJourLibellePjApiHook } from "../../hook/requete/creation/MiseAJourLibellePjApiHook";
import { useGetPieceJointeApi } from "../../hook/requete/piecesJointes/GetPieceJointeHook";
import { AccordionTitle } from "./AccordionTitle";
import { BoutonAccordionTitle } from "./BoutonAccordionTitle";
import "./scss/AccordionVisionneuse.scss";

interface AccordionVisionneuseProps {
  idDocumentAAfficher: string;
  titre?: string;
  titreOrigine: string;
  typePiece: TypePieceJointe;
  numRequete?: string;
  setTitreActuel: (nouveauTitre: string) => void;
  autoriseOuvertureFenetreExt?: boolean;
}

export const AccordionVisionneuse: React.FC<AccordionVisionneuseProps> = ({
  idDocumentAAfficher,
  titre,
  titreOrigine,
  typePiece,
  numRequete,
  setTitreActuel,
  autoriseOuvertureFenetreExt = false
}) => {
  const [idDocument, setIdDocument] = useState<string>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [majTitreParams, setMajTitreParams] = useState<IMajLibellePjParams>();
  const [fenetreExtOuverte, setFenetreExtOuverte] = useState<boolean>(false);

  const toggleFenetreExtState = () => {
    setFenetreExtOuverte(!fenetreExtOuverte);
  };

  useEffect(() => {
    setIdDocument(isExpanded ? idDocumentAAfficher : undefined);
  }, [isExpanded, idDocumentAAfficher]);

  const resultatMaj = useMiseAJourLibellePjApiHook(majTitreParams);

  useEffect(() => {
    if (resultatMaj?.resultat && majTitreParams?.nouveauLibelle) {
      setTitreActuel(majTitreParams?.nouveauLibelle);
    }
  }, [resultatMaj]);

  const documentApi = useGetPieceJointeApi(TypePieceJointe.PIECE_JUSTIFICATIVE, idDocument);

  return (
    <>
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
          bouton={
            autoriseOuvertureFenetreExt ? (
              <BoutonAccordionTitle
                onClickBouton={toggleFenetreExtState}
                iconeBouton={
                  fenetreExtOuverte ? (
                    <FaSquareXmark
                      className="BoutonAccordionTitle BoutonFermetureFenetreExt"
                      title="Fermer la fenêtre externe"
                      aria-label="Fermer la fenêtre externe"
                    />
                  ) : (
                    <FaExternalLinkAlt
                      className="BoutonAccordionTitle BoutonOuvertureFenetreExt"
                      title="Ouvrir PJ dans une fenêtre externe"
                      aria-label="Ouvrir PJ dans une fenêtre externe"
                    />
                  )
                }
              />
            ) : undefined
          }
        />
        <AccordionDetails>
          {documentApi && (
            <div className="h-screen">
              <AffichageDocument
                contenuBase64={documentApi.contenu}
                typeZoom={"page-fit"}
                typeMime={documentApi.mimeType}
                titre={titre ?? titreOrigine}
              />
            </div>
          )}
        </AccordionDetails>
      </Accordion>
      {fenetreExtOuverte && (
        <FenetrePiecesJointes
          idPiece={idDocumentAAfficher}
          nom={titre ?? titreOrigine}
          numRequete={numRequete}
          typePiece={typePiece}
          toggleFenetre={toggleFenetreExtState}
        />
      )}
    </>
  );
};
