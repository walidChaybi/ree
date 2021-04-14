import React from "react";
import { MessageId, Text } from "../Text";
import "./scss/ExtraitDocument.scss";
import { Accordion } from "@material-ui/core";

interface IExtraitDocumentProps {
  titre: MessageId;
}

export const ExtraitDocument: React.FC<IExtraitDocumentProps> = ({ titre }) => {
  return (
    <>
      <div className="resume-requete extrait">
        <div className="Panel">
          <Text messageId={titre} />
        </div>
        <Accordion>
          <div id="docRequeteViewer" className={"DocumentDetailPanel"} />
        </Accordion>
      </div>
    </>
  );
};
