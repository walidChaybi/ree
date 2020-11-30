import React from "react";

import { DocumentDetail } from "./DocumentDetail";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import "./sass/DocumentPresentation.scss";
import classNames from "classnames";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDetail } from "../../../../common/types/IDocumentDetail";
import { requestDocumentApi } from "../../../../common/hook/DocumentRequeteHook";
import { Text, MessageId } from "../../../../common/widget/Text";
import { IDocumentDelivre } from "../../../../common/types/RequeteType";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";

interface IDocumentPresentationProps {
  titre: MessageId;
  documents: IDocumentDetail[];
  documentVisible?: IDocumentDetail;
  groupement: GroupementDocument;
  setDocumentVisibleFct?: (document: IDocumentDetail) => void;
  setDocumentDelivreFct?: (doc: IDocumentDelivre) => void;
}

export const DocumentPresentation: React.FC<IDocumentPresentationProps> = ({
  titre,
  documents,
  documentVisible,
  groupement,
  setDocumentVisibleFct,
  setDocumentDelivreFct
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(documents.length > 0);

  const handleChange = () => (event: any, isExpanded: boolean) => {
    setExpanded(!expanded);
  };

  const titleStyles = classNames({
    title: true
  });

  return (
    <div className="document-presentation">
      <Accordion
        expanded={expanded}
        className={"DocumentDetailHeader"}
        onChange={handleChange()}
      >
        <AccordionSummary
          className={titleStyles}
          expandIcon={<ExpandMoreIcon />}
        >
          <Text messageId={titre} />
        </AccordionSummary>

        <AccordionDetails>
          <List>
            {documents.map((element: IDocumentDetail, index: number) => {
              return (
                <DocumentDetail
                  key={index}
                  document={element}
                  groupement={groupement}
                  onClickHandler={onClickHandler}
                  openedInViewer={documentVisible}
                  stateSetter={setDocumentVisibleFct}
                  setDocumentDelivreFct={setDocumentDelivreFct}
                />
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

function onClickHandler(
  event: React.MouseEvent,
  document: IDocumentDetail,
  groupement: GroupementDocument,
  stateSetter?: (document: IDocumentDetail) => void
) {
  requestDocumentApi(
    document.identifiantDocument,
    groupement,
    document.mimeType
  ).then(result => {
    const documentObjectURL = URL.createObjectURL(
      convertToBlob(result.documentDelivre.contenu, result.mimeType)
    );
    lectureDuDocument(documentObjectURL);
    if (stateSetter) {
      stateSetter(document);
    }
  });
}

export function convertToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

export function lectureDuDocument(documentObjectURL: string) {
  const docRequeteViewer = document.querySelector("#docRequeteViewer");
  const oldDocElement = document.querySelector("#docRequeteViewer iframe");
  if (oldDocElement) {
    docRequeteViewer?.removeChild(oldDocElement);
  }
  const docElement = document.createElement("iframe");
  docElement.src = documentObjectURL;
  docElement.style.width = "100%";
  docElement.style.height = "100%";
  if (docRequeteViewer) {
    docRequeteViewer.appendChild(docElement);
  }
}
