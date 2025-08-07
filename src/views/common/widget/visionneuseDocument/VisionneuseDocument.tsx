import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { base64EnBlobUrl, bloblEnBlobUrl, estTypeMimePdf } from "../../../../utils/FileUtils";
import VisionneuseImage from "./VisionneuseImage";
import { VisionneusePdf } from "./VisionneusePdf";

/**
 * Visionneuse de document intégrée à Firefox
 * Gère des documents en bas64 (Tous le document du Rece sont en base64 normalement)
 * Gère également l'exception concernant l'api '/acte/corps' qui renvoit un document de type Blob (cf. composant 'ActeImage')
 */
interface IVisionneuseDocumentProps {
  infoBulle: string;
  contenuBase64?: string; // Base64
  contenuBlob?: Blob; //Blob
  typeMime: string;
}

export const VisionneuseDocument: React.FC<IVisionneuseDocumentProps> = props => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let urlVisionneuseDocument;

    if (props.contenuBase64 && props.typeMime) {
      urlVisionneuseDocument = base64EnBlobUrl(props.contenuBase64, props.typeMime);
    } else if (props.contenuBlob && props.typeMime) {
      urlVisionneuseDocument = bloblEnBlobUrl(props.contenuBlob, props.typeMime);
    }
    if (urlVisionneuseDocument) {
      setUrl(urlVisionneuseDocument);
    }
  }, [props.contenuBase64, props.contenuBlob, props.typeMime]);

  return (
    <div>
      {url ? (
        getVisionneuse(props.typeMime, url)
      ) : props.contenuBase64 === "" && props.contenuBlob == null ? (
        <p className="messagePasDoc">{"Aucun document à afficher"}</p>
      ) : (
        <LinearProgress className="ProgressBar" />
      )}
    </div>
  );

  function getVisionneuse(typeMime: string, urlAvecDonneesBase64: string) {
    return estTypeMimePdf(typeMime) ? (
      <VisionneusePdf
        url={urlAvecDonneesBase64}
        infoBulle={props.infoBulle}
      />
    ) : (
      <VisionneuseImage
        url={urlAvecDonneesBase64}
        infoBulle={props.infoBulle}
      />
    );
  }
};
