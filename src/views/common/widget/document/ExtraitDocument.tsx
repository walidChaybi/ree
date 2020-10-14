import React from "react";
import { useDisclosureState, DisclosureRegion } from "reakit/Disclosure";
import { MessageId, Text } from "../Text";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import "./sass/ExtraitDocument.scss";

interface IExtraitDocumentProps {
  titre: MessageId;
}

export const ExtraitDocument: React.FC<IExtraitDocumentProps> = ({ titre }) => {
  const disclosure = useDisclosureState({ visible: true });

  return (
    <div className="resume-requete extrait">
      <div className="Panel">
        <Text messageId={titre} />
      </div>
      <DisclosureRegion {...disclosure} as={ExpansionPanelDetails}>
        {(props) =>
          disclosure.visible && (
            <div
              {...props}
              id="docRequeteViewer"
              className={"DocumentDetailPanel"}
            />
          )
        }
      </DisclosureRegion>
    </div>
  );
};
