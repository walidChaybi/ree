import { base64toBlobUrl } from "@util/FileUtils";
import React, { memo, useMemo } from "react";

interface IAffichagePDFProps {
  contenuBase64: string | null;
  typeZoom?: "page-fit" | "auto";
}

const AffichagePDF: React.FC<IAffichagePDFProps> = memo(({ contenuBase64, typeZoom = "page-fit" }) => {
  const blobUrl = useMemo(
    () => (contenuBase64 ? `${base64toBlobUrl(contenuBase64, "application/pdf")}#zoom=${typeZoom}` : null),
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
