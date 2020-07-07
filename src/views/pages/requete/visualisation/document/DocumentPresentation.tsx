import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion
} from "reakit/Disclosure";
import { MessageId, Text } from "../../../../common/widget/Text";
import { DocumentDetail } from "./DocumentDetail";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import "./sass/DocumentPresentation.scss";
import "../sass/ResumeRequete.scss";
import { requestDocumentApi } from "./DocumentRequeteHook";
import classNames from "classnames";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";

interface IDocumentPresentationProps {
  titre: MessageId;
  documents: IDocumentDetail[];
  documentVisible?: IDocumentDetail;
  setDocumentVisibleFct?: (document: IDocumentDetail) => void;
}

export const DocumentPresentation: React.FC<IDocumentPresentationProps> = ({
  titre,
  documents,
  documentVisible,
  setDocumentVisibleFct
}) => {
  const visible: boolean = documents.length > 0;
  const disclosure = useDisclosureState({ visible });

  const titleStyles = classNames({
    title: true
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
        {props =>
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
  ).then(result => {
    const documentObjectURL = URL.createObjectURL(result);
    lectureDuDocument(documentObjectURL);
    if (stateSetter) {
      stateSetter(document);
    }
  });
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
