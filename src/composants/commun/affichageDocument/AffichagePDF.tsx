import { base64toBlobUrl } from "@util/FileUtils";
import React, { memo, useMemo } from "react";
import "./AffichagePDF.scss";

interface IAffichagePDFProps {
  contenuBase64: string | null;
}

const AffichagePDF: React.FC<IAffichagePDFProps> = memo(({ contenuBase64 }) => {
  const blobUrl = useMemo(
    () =>
      contenuBase64
        ? `${base64toBlobUrl(contenuBase64, "application/pdf")}#zoom=page-fit`
        : null,
    [contenuBase64]
  );

  return blobUrl ? (
    <div className="conteneur-affichage-pdf">
      <iframe title={"Document PDF"} src={blobUrl}></iframe>
    </div>
  ) : (
    <p>{"Aucun document à afficher"}</p>
  );
});

export default AffichagePDF;
