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
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../model/requete/v2/IDocumentReponse";
import { AccordionRece } from "../../../../common/widget/accordion/AccordionRece";
import { getText } from "../../../../common/widget/Text";
import "./scss/DocumentsReponses.scss";

export interface InfoDocumentAffiche {
  id: string;
  nom?: string;
}
interface IDocumentsReponsesProps {
  documents: IDocumentReponse[];
  setDocumentAffiche?: (infoDoc: InfoDocumentAffiche) => void;
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
          {DocumentReponse.triDocumentsDelivrance(documents).map(el => (
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
                    title={getText("pages.requete.consultation.icon.pdf")}
                  >
                    <PictureAsPdf />
                  </Avatar>
                ) : (
                  <Avatar
                    title={getText("pages.requete.consultation.icon.png")}
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
