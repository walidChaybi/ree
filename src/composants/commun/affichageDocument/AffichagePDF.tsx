import React, { memo, useMemo } from "react";
import { base64EnBlobUrl } from "../../../utils/FileUtils";

interface IAffichagePDFProps {
  contenuBase64: string | null;
  typeZoom?: "page-fit" | "auto" | number;
}

const AffichagePDF: React.FC<IAffichagePDFProps> = memo(({ contenuBase64, typeZoom = "page-fit" }) => {
  const blobUrl = useMemo(
    () => (contenuBase64 ? `${base64EnBlobUrl(contenuBase64, "application/pdf")}#zoom=${typeZoom}` : null),
    [contenuBase64]
  );

  return blobUrl ? (
    <div className="flex-grow overflow-hidden">
      <iframe
        title={"Document PDF"}
        className="h-full w-full overflow-auto border-0"
        src={blobUrl}
      />
    </div>
  ) : (
    <p>{"Aucun document à afficher"}</p>
  );
});

export default AffichagePDF;
