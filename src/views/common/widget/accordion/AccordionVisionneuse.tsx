import { FenetrePiecesJointes } from "@composant/piecesJointes/FenetrePiecesJointes";
import {
  faExternalLink,
  faSquareXmark
} from "@fortawesome/free-solid-svg-icons";
import {
  IMajLibellePjParams,
  useMiseAJourLibellePjApiHook
} from "@hook/requete/creation/MiseAJourLibellePjApiHook";
import { TypePieceJointe } from "@hook/requete/piecesJointes/communPieceJointe";
import { useGetPieceJointeApi } from "@hook/requete/piecesJointes/GetPieceJointeHook";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { VisionneuseDocument } from "../document/VisionneuseDocument";
import { AccordionTitle } from "./AccordionTitle";
import { BoutonAccordionTitle } from "./BoutonAccordionTitle";
import "./scss/AccordionVisionneuse.scss";

export interface AccordionVisionneuseProps {
  idDocumentAAfficher: string;
  titre?: string;
  titreOrigine: string;
  typePiece: TypePieceJointe;
  numRequete: string;
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
                iconeBouton={fenetreExtOuverte ? faSquareXmark : faExternalLink}
                descriptionBouton={getLibelle(
                  fenetreExtOuverte
                    ? "Fermer la fenetre externe"
                    : "Ouvrir PJ dans une fenêtre externe"
                )}
                classNameBouton={
                  fenetreExtOuverte
                    ? "BoutonFermetureFenetreExt"
                    : "BoutonOuvertureFenetreExt"
                }
              />
            ) : undefined
          }
        />
        <AccordionDetails>
          <VisionneuseDocument
            titre={titre ?? titreOrigine}
            typeMime={getValeurOuVide(documentApi?.mimeType)}
            contenu={documentApi?.contenu}
          />
        </AccordionDetails>
      </Accordion>
      {fenetreExtOuverte && (
        <FenetrePiecesJointes
          idPiece={idDocumentAAfficher}
          nom={titre ? titre : titreOrigine}
          numRequete={numRequete}
          typePiece={typePiece}
          toggleFenetre={toggleFenetreExtState}
        />
      )}
    </>
  );
};
