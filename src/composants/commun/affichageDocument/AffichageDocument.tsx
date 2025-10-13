import React, { memo, useMemo } from "react";
import { EMimeType } from "../../../ressources/EMimeType";
import { base64EnBlobUrl, blobEnBlobUrl } from "../../../utils/FileUtils";

interface IAffichagePDFProps {
  contenuBase64?: string | null;
  contenuBlob?: Blob | null;
  typeZoom?: "page-fit" | "auto" | number;
  typeMime: EMimeType;
  titre?: string;
}

const AffichageDocument: React.FC<IAffichagePDFProps> = memo(({ contenuBase64, contenuBlob, typeZoom = "page-fit", typeMime, titre }) => {
  const blobUrl = useMemo(() => {
    if (contenuBase64) {
      return base64EnBlobUrl(contenuBase64, typeMime).concat(typeMime === EMimeType.APPLI_PDF ? "#zoom=" + typeZoom : "");
    } else if (contenuBlob) {
      return blobEnBlobUrl(contenuBlob, typeMime).concat(typeMime === EMimeType.APPLI_PDF ? "#zoom=" + typeZoom : "");
    } else {
      return null;
    }
  }, [contenuBase64, contenuBlob]);

  const titreAAfficher = titre ?? `Document ${typeMime.split("/")[1].toUpperCase()}`;

  return blobUrl ? (
    <div className="h-full flex-grow overflow-auto">
      <iframe
        title={titreAAfficher}
        aria-label={titreAAfficher}
        className={"h-full w-full overflow-auto border-0"}
        src={blobUrl}
      />
    </div>
  ) : (
    <p>{"Aucun document à afficher"}</p>
  );
});

export default AffichageDocument;
