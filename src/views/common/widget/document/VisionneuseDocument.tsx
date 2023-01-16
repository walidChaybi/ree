import { LinearProgress } from "@mui/material";
import { base64toBlobUrl, bloblToBlobUrl } from "@util/FileUtils";
import { getLibelle } from "@util/Utils";
import { MimeType } from "file-type";
import React, { useEffect, useRef, useState } from "react";
import { MimeType as ReceMimeType } from "../../../../ressources/MimeType";
import "./scss/VisionneuseDocument.scss";

/**
 * Visionneuse de document intégrée à Firefox
 * Gère des documents en bas64 (Tous le document du Rece sont en base64 normalement)
 * Gère également l'exception concernant l'api '/acte/corps' qui renvoit un document de type Blob (cf. composant 'ActeImage')
 */
interface IVisionneuseDocumentProps {
  titre: string;
  contenu?: string; // Base64
  contenuBlob?: Blob; //Blob
  typeMime?: MimeType;
}

export const VisionneuseDocument: React.FC<
  IVisionneuseDocumentProps
> = props => {
  const [url, setUrl] = useState<string>();
  const iframe = useRef<any>();

  useEffect(() => {
    let urlVisionneuseDocument;

    let attributUrl = "";
    if (props.typeMime === ReceMimeType.APPLI_PDF) {
      attributUrl = "#zoom=page-fit";
    }
    if (props.contenu && props.typeMime) {
      urlVisionneuseDocument = base64toBlobUrl(props.contenu, props.typeMime);
    } else if (props.contenuBlob && props.typeMime) {
      urlVisionneuseDocument = bloblToBlobUrl(
        props.contenuBlob,
        props.typeMime
      );
    }
    if (urlVisionneuseDocument) {
      setUrl(urlVisionneuseDocument + attributUrl);
    }
  }, [props.contenu, props.contenuBlob, props.typeMime]);

  return (
    <div className={"VisionneuseDocument"}>
      {url ? (
        <iframe
          title={props.titre}
          src={url}
          id="iframe"
          ref={iframe}
          onLoad={() => ajouteStyleIFrame(iframe, props.typeMime)}
        ></iframe>
      ) : props.contenu === "" && props.contenuBlob == null ? (
        <p className="messagePasDoc">
          {getLibelle("Aucun document à afficher")}
        </p>
      ) : (
        <LinearProgress className="ProgressBar" />
      )}
    </div>
  );
};

export function ajouteStyleIFrame(iframe: any, typeMime?: MimeType) {
  if (typeMime !== "application/pdf") {
    const styleLink = document.createElement("style");
    styleLink.textContent = "img{width:100%}";
    iframe.current.contentWindow?.document.head.appendChild(styleLink);
  }
}
