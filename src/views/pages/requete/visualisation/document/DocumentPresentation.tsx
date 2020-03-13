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
import { GroupementDocument } from "../../../../../model/requete/GroupementDocument";
import classNames from "classnames";
import { IDocumentDetail } from "./interfaces/IDocumentDetail";

interface IDocumentPresentationProps {
  titre: MessageId;
  documents: IDocumentDetail[];
  highlighted?: boolean;
}

export const DocumentPresentation: React.FC<IDocumentPresentationProps> = ({
  titre,
  documents,
  highlighted
}) => {
  const visible: boolean = documents.length > 0;
  const disclosure = useDisclosureState({ visible });

  const titleStyles = classNames({
    title: true,
    SpecificTitle: highlighted
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
            <div {...props} className={"DocumentDetailPanel"}>
              <List>
                {documents.map((element: IDocumentDetail, index: number) => {
                  return (
                    <DocumentDetail
                      key={index}
                      document={element}
                      onClickHandler={onClickHandler}
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
  identifiantDocument: string,
  groupement: GroupementDocument,
  mimeType: string
) {
  requestDocumentApi(identifiantDocument, groupement, mimeType).then(result => {
    //TODO ouvrir document dans l'extrait #US102 (72-C)
    // if (groupement === GroupementDocument.DocumentAsigner) {
    // } else {
    window.open(URL.createObjectURL(result));
    // }
  });
}
