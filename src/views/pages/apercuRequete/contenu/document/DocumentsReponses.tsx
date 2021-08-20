import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import Image from "@material-ui/icons/Image";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import React from "react";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { AccordionRece } from "../../../../common/widget/accordion/AccordionRece";
import { getLibelle } from "../../../../common/widget/Text";
import "./scss/DocumentsReponses.scss";

export interface infoDocumentAffiche {
  id: string;
  nom?: string;
}
interface IDocumentsReponsesProps {
  documents: IDocumentReponse[];
  setDocumentAffiche?: (infoDoc: infoDocumentAffiche) => void;
}

export const DocumentsReponses: React.FC<IDocumentsReponsesProps> = ({
  documents,
  setDocumentAffiche
}) => {
  return (
    <div className="documents-reponses">
      <AccordionRece
        titre={"Documents à délivrer"}
        disabled={false}
        expanded={true}
      >
        <List>
          {documents.map(el => (
            <ListItem
              key={el.id}
              onClick={() => {
                if (setDocumentAffiche) {
                  setDocumentAffiche({ id: el.id, nom: el.nom });
                }
              }}
              className="documentReponse"
            >
              <ListItemAvatar>
                {el.mimeType === "application/pdf" ? (
                  <Avatar
                    title={getLibelle("pages.requete.consultation.icon.pdf")}
                  >
                    <PictureAsPdf />
                  </Avatar>
                ) : (
                  <Avatar
                    title={getLibelle("pages.requete.consultation.icon.png")}
                  >
                    <Image />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText className="InformationDocument" primary={el.nom} />
            </ListItem>
          ))}
        </List>
      </AccordionRece>
    </div>
  );
};
