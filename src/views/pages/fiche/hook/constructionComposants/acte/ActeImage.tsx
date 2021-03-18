import { LinearProgress } from "@material-ui/core";
import React from "react";
import { getImagesActe } from "../../../../../../api/appels/etatcivilApi";
import { logError } from "../../../../../common/util/LogManager";
import "./sass/ActeImage.scss";

export interface ActeImageProps {
  id?: string;
}

export const ActeImage: React.FC<ActeImageProps> = ({ id }) => {
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    if (id) {
      getImagesActe(id)
        .then((pdf: any) => {
          const documentObjectURL = URL.createObjectURL(
            new Blob([pdf.body], { type: "application/pdf" })
          );

          setUrl(documentObjectURL);
        })
        .catch((error: any) => {
          logError({
            error
          });
        });
    }
  }, [id]);

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {url ? (
        <iframe title="Visionneuse PDF" src={url}></iframe>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};
