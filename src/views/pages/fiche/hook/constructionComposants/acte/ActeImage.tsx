import React, { useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import { getImagesActe } from "../../../../../../api/appels/etatcivilApi";
import { logError } from "../../../../../common/util/LogManager";
import "./sass/ActeImage.scss";

export interface ActeImageProps {
  id?: string;
}

export const ActeImage: React.FC<ActeImageProps> = ({ id }) => {
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (id) {
      getImagesActe(id)
        .then((pdf: any) => {
          const documentObjectURL = URL.createObjectURL(
            new Blob([pdf.body], { type: "application/pdf" })
          );
          setUrl(documentObjectURL);
        })
        .catch((err: any) => {
          logError({
            error: err
          });
          setError(err);
        });
    }
  }, [id]);

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {url ? (
        <iframe title="Visionneuse PDF" src={url}></iframe>
      ) : error ? (
        <span>Une erreur s'est produite</span>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};
