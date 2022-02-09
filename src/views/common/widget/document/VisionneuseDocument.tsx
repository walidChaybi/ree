import { LinearProgress } from "@material-ui/core";
import { MimeType } from "file-type";
import React, { useEffect, useState } from "react";
import { base64toBlob } from "../../util/FileUtils";
import { getLibelle } from "../../util/Utils";
import "./scss/VisionneuseDocument.scss";

interface IVisionneuseDocumentProps {
  titre: string;
  contenu?: string; // Base64
  typeMime?: MimeType;
}

export const VisionneuseDocument: React.FC<IVisionneuseDocumentProps> = ({
  titre,
  contenu,
  typeMime
}) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (contenu && typeMime) {
      setUrl(base64toBlob(contenu, typeMime));
    }
  }, [contenu, typeMime]);

  return (
    <div className={"VisionneuseDocument"}>
        {url ? (
          <iframe title={titre} src={url}></iframe>
        ) : contenu === "" ? (
          <p className="messagePasDoc">
            {getLibelle("Aucun document à afficher")}
          </p>
        ) : (
          <LinearProgress className="ProgressBar" />
        )}
    </div>
  );
};

