import { useGetDocumentReponseApi } from "@hook/DocumentReponseHook";
import {
  DocumentReponse,
  IDocumentReponse
} from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import Image from "@mui/icons-material/Image";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { getIdDocumentReponseAAfficher } from "@util/RequetesUtils";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import React, { useCallback, useEffect, useState } from "react";
import { FenetreDocumentReponse } from "./FenetreDocumentReponse";
import "./scss/DocumentsReponses.scss";

export interface InfoDocumentAffiche {
  id: string;
  nom?: string;
}
interface IDocumentsReponsesProps {
  requete: IRequeteDelivrance;
  onClickDocumentAffiche?: (docReponse: IDocumentReponse) => void;
}

export const DocumentsReponses: React.FC<IDocumentsReponsesProps> = ({
  requete,
  onClickDocumentAffiche
}) => {
  /* Gestion fenêtre externe si pas de visinneuse */
  const [documentAffiche, setDocumentAffiche] = useState<InfoDocumentAffiche>();
  const contenuPiece = useGetDocumentReponseApi(documentAffiche?.id);

  const [isFenetreOuverte, setIsFenetreOuverte] = useState<boolean>(false);

  const toggleFenetre = useCallback(() => {
    setIsFenetreOuverte(!isFenetreOuverte);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsFenetreOuverte]);

  function onClick(infoDoc: InfoDocumentAffiche) {
    setDocumentAffiche(infoDoc);
  }

  // Gestion de l'affiche du document
  useEffect(() => {
    if (contenuPiece) {
      // Si visionneuse présent sur la page parent
      if (onClickDocumentAffiche) {
        onClickDocumentAffiche(contenuPiece);
      } else if (contenuPiece.id !== "") {
        // Sinon ouverture d'une visionneuse dans une fenêtre externe
        toggleFenetre();
      }
    }
  }, [contenuPiece, onClickDocumentAffiche, toggleFenetre]);

  // Gestion du document à afficher par défaut
  useEffect(() => {
    // Si visionneuse présent sur la page parent (onClickDocumentAffiche présent)
    if (requete && onClickDocumentAffiche) {
      const idDoc = getIdDocumentReponseAAfficher(requete);

      // S'il y a des documents réponses dans la requête on affiche le premier document de la liste
      if (idDoc !== "") {
        setDocumentAffiche({
          id: idDoc
        });
      } else {
        // s'il n'y pas de documents réponses alors on retourne un document vide pour afficher le message "Aucun document à afficher"
        setDocumentAffiche({
          id: "",
          nom: ""
        });
      }
    }
  }, [requete, onClickDocumentAffiche]);
  
  return (
    <div className="documents-reponses">
      <AccordionRece
        titre={"Documents à délivrer"}
        disabled={requete.documentsReponses?.length === 0}
        expanded={requete.documentsReponses?.length > 0}
        expandedPossible={requete.documentsReponses?.length > 0}
      >
        <List>
          {DocumentReponse.triDocumentsDelivrance(
            requete.documentsReponses || []
          ).map(el => (
            <ListItem
              key={el.id}
              onClick={() => {
                onClick({ id: el.id, nom: DocumentReponse.getLibelle(el) });
              }}
              className={`documentReponse ${
                documentAffiche?.id === el.id ? "selected" : ""
              }`}
            >
              <ListItemAvatar>
                {el.mimeType === "application/pdf" ? (
                  <Avatar title={getLibelle("Fichier au format PDF")}>
                    <PictureAsPdf />
                  </Avatar>
                ) : (
                  <Avatar title={getLibelle("Image au format PNG")}>
                    <Image />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                className="InformationDocument"
                primary={DocumentReponse.getLibelle(el)}
              />
            </ListItem>
          ))}
        </List>
      </AccordionRece>
      {isFenetreOuverte === true && contenuPiece && (
        <FenetreDocumentReponse
          toggleFenetre={toggleFenetre}
          numRequete={requete.numero}
          contenuPiece={contenuPiece}
          nom={getValeurOuVide(documentAffiche?.nom)}
        />
      )}
    </div>
  );
};
