import { LinearProgress } from "@material-ui/core";
import { MimeType } from "file-type";
import React, { useEffect, useState } from "react";
import { base64toBlob } from "../../util/FileUtils";
import { Fieldset } from "../fieldset/Fieldset";
import { getLibelle, MessageId } from "../Text";
import "./scss/ExtraitDocument.scss";
import "./scss/VisionneuseDocument.scss";

interface IVisionneuseDocumentProps {
  titre: MessageId;
  contenu?: string; // Base64
  typeMime?: MimeType;
}

export const VisionneuseDocument: React.FC<IVisionneuseDocumentProps> =
  props => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
      if (props.contenu && props.typeMime) {
        setUrl(base64toBlob(props.contenu, props.typeMime));
      }
    }, [props.contenu, props.typeMime]);

    return (
      <div className={"VisionneuseDocument"}>
        <Fieldset titre={props.titre}>
          {url ? (
            <iframe title={props.titre} src={url}></iframe>
          ) : props.contenu === "" ? (
            <p className="messagePasDoc">
              {getLibelle("Aucun document à afficher")}
            </p>
          ) : (
            <LinearProgress className="ProgressBar" />
          )}
        </Fieldset>
      </div>
    );
  };
