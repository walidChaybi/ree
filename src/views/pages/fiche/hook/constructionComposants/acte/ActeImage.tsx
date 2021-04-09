import React, { useEffect, useState } from "react";
import { LinearProgress } from "@material-ui/core";
import {
  getImagesActe,
  getTexteActe
} from "../../../../../../api/appels/etatcivilApi";
import { logError } from "../../../../../common/util/LogManager";
import "./sass/ActeImage.scss";

export interface ActeImageProps {
  id?: string;
  estReecrit?: boolean;
}

export const ActeImage: React.FC<ActeImageProps> = ({ id, estReecrit }) => {
  const [url, setUrl] = useState<string>();
  const [error, setError] = useState<string>();
  const [isImage, setIsImage] = useState(true);

  useEffect(() => {
    if (id) {
      if (isImage) {
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
      } else {
        getTexteActe(id)
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
    }
  }, [id, isImage]);

  const clickSwitch = () => {
    setUrl("");
    setIsImage(!isImage);
  };

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {estReecrit ? (
        <button className="ButtonSwitchActe" onClick={() => clickSwitch()}>
          Texte saisi &lt;-&gt; Image
        </button>
      ) : (
        <div></div>
      )}
      {url ? (
        <iframe title="Visionneuse PDF" src={url}></iframe>
      ) : error ? (
        <span>Une erreur s'est produite</span>
      ) : (
        <LinearProgress className="ProgressBar" />
      )}
    </div>
  );
};
