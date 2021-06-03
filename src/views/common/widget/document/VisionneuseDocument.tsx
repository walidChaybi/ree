import React, { useEffect, useState } from "react";
import { MessageId } from "../Text";
import "./scss/ExtraitDocument.scss";
import { Accordion, LinearProgress } from "@material-ui/core";
import { MimeType } from "file-type";
import { base64toBlob } from "../../util/FileUtils";
import "./scss/VisionneuseDocument.scss";

interface IVisionneuseDocumentProps {
  titre: MessageId;
  contenu?: string;
  typeMime?: MimeType;
}

export const VisionneuseDocument: React.FC<IVisionneuseDocumentProps> = props => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (props.contenu && props.typeMime) {
      setUrl(base64toBlob(props.contenu, props.typeMime));
    }
  }, [props.contenu, props.typeMime]);

  return (
    <div className={"VisionneuseDocument"}>
      <Accordion>
        {url ? (
          <iframe title={props.titre} src={url}></iframe>
        ) : (
          <LinearProgress className="ProgressBar" />
        )}
      </Accordion>
    </div>
  );
};
