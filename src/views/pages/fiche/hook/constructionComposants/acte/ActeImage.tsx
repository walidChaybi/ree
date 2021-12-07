import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getImagesActe,
  getTexteActe
} from "../../../../../../api/appels/etatcivilApi";
import { logError } from "../../../../../common/util/LogManager";
import { getLibelle } from "../../../../../common/util/Utils";
import "./scss/ActeImage.scss";

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
      let imagesActe;
      if (isImage) {
        imagesActe = getImagesActe(id);
      } else {
        imagesActe = getTexteActe(id);
      }
      imagesActe
        .then((pdf: any) => {
          if (pdf.body.size === 0) {
            setError(
              getLibelle("La visualisation de l'acte n'est pas disponible")
            );
          } else {
            const documentObjectURL = URL.createObjectURL(
              new Blob([pdf.body], { type: "application/pdf" })
            );
            setUrl(documentObjectURL);
          }
        })
        .catch((err: any) => {
          logError({
            error: err
          });
          setError(getLibelle("Une erreur s'est produite"));
        });
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
        <span>{error}</span>
      ) : (
        <LinearProgress className="ProgressBar" />
      )}
    </div>
  );
};
