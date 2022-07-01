import { LinearProgress } from "@material-ui/core";
import { MimeType } from "file-type";
import React, { useEffect, useRef, useState } from "react";
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
  const iframe = useRef<any>();

  useEffect(() => {
    if (contenu && typeMime) {
      setUrl(base64toBlob(contenu, typeMime));
    }
  }, [contenu, typeMime]);

  function addStyle() {
    const styleLink = document.createElement("style");
    styleLink.textContent = "img{width:100%}";
    iframe.current.contentWindow?.document.head.appendChild(styleLink);
  }

  return (
    <div className={"VisionneuseDocument"}>
      {url ? (
        <iframe
          title={titre}
          src={url}
          id="iframe"
          ref={iframe}
          onLoad={addStyle}
        ></iframe>
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

