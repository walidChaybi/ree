import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion,
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
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import { IDocumentDelivre } from "../RequeteType";

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
  setDocumentDelivreFct,
}) => {
  const visible: boolean = documents.length > 0;
  const disclosure = useDisclosureState({ visible });

  const titleStyles = classNames({
    title: true,
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
                      groupement={groupement}
                      onClickHandler={onClickHandler}
                      openedInViewer={documentVisible}
                      stateSetter={setDocumentVisibleFct}
                      setDocumentDelivreFct={setDocumentDelivreFct}
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
  groupement: GroupementDocument,
  stateSetter?: (document: IDocumentDetail) => void
) {
  requestDocumentApi(
    document.identifiantDocument,
    groupement,
    document.mimeType
  ).then((result) => {
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
