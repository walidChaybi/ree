import React, { useState } from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion,
} from "reakit/Disclosure";
import { MessageId, Text, getText } from "../../../../common/widget/Text";
import { DocumentDetail } from "./DocumentDetail";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import "./sass/DocumentPresentation.scss";
import "../sass/ResumeRequete.scss";
import { requestDocumentApi } from "./DocumentRequeteHook";
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import classNames from "classnames";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";

interface IDocumentPresentationProps {
  titre: MessageId;
  documents: IDocumentDetail[];
  highlighted?: boolean;
  documentVisible?: IDocumentDetail;
  setDocumentVisibleFct?: (document: IDocumentDetail) => void;
}

export const DocumentPresentation: React.FC<IDocumentPresentationProps> = ({
  titre,
  documents,
  highlighted,
  documentVisible,
  setDocumentVisibleFct,
}) => {
  const visible: boolean = documents.length > 0;
  const disclosure = useDisclosureState({ visible });

  const titleStyles = classNames({
    title: true,
    SpecificTitle: highlighted,
  });

  return (
    <div className="resume-requete">
      <Disclosure
        {...disclosure}
        as={ExpansionPanel}
        className={"DocumentDetailHeader"}
      >
        <ExpansionPanelSummary
          className={titleStyles}
          expandIcon={<ExpandMoreIcon />}
        >
          <Text messageId={titre} />
        </ExpansionPanelSummary>
      </Disclosure>
      <DisclosureRegion {...disclosure} as={ExpansionPanelDetails}>
        {(props) =>
          disclosure.visible && (
            <div {...props}>
              <List>
                {documents.map((element: IDocumentDetail, index: number) => {
                  return (
                    <DocumentDetail
                      key={index}
                      document={element}
                      onClickHandler={onClickHandler}
                      openedInViewer={documentVisible}
                      stateSetter={setDocumentVisibleFct}
                    />
                  );
                })}
              </List>
            </div>
          )
        }
      </DisclosureRegion>
    </div>
  );
};

function onClickHandler(
  event: React.MouseEvent,
  document: IDocumentDetail,
  stateSetter?: (document: IDocumentDetail) => void
) {
  requestDocumentApi(
    document.identifiantDocument,
    document.groupement,
    document.mimeType
  ).then((result) => {
    const documentObjectURL = URL.createObjectURL(result);
    if (
      document.groupement === GroupementDocument.DocumentAsigner &&
      stateSetter
    ) {
      lectureDuDocument(documentObjectURL);
      stateSetter(document);
    } else {
      window.open(documentObjectURL);
    }
  });
}

export function lectureDuDocument(documentObjectURL: string) {
  const pdfViewer = document.querySelector("#pdfViewer");
  const oldPdfElement = document.querySelector("#pdfViewer iframe");
  if (oldPdfElement) {
    pdfViewer?.removeChild(oldPdfElement);
  }
  const pdfElement = document.createElement("iframe");
  pdfElement.src = documentObjectURL;
  pdfElement.style.width = "100%";
  pdfElement.style.height = "100%";
  if (pdfViewer) {
    pdfViewer.appendChild(pdfElement);
  }
}
