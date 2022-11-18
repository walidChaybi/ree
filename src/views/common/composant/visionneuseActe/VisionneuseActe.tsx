import { HTTP_NOT_FOUND } from "@api/ApiManager";
import { getImagesActe, getTexteActe } from "@api/appels/etatcivilApi";
import { logError } from "@util/LogManager";
import { getLibelle } from "@util/Utils";
import { VisionneuseDocument } from "@widget/document/VisionneuseDocument";
import React, { useEffect, useState } from "react";
import { MimeType } from "../../../../ressources/MimeType";
import "./scss/VisionneuseActe.scss";

export interface ActeImageProps {
  idActe?: string;
  estReecrit?: boolean;
}

export const VisionneuseActe: React.FC<ActeImageProps> = props => {
  const [contenuBlob, setContenuBlob] = useState<Blob>();
  const [error, setError] = useState<string>();
  const [isImage, setIsImage] = useState(true);

  useEffect(() => {
    if (props.idActe) {
      let imagesActe;
      if (isImage) {
        imagesActe = getImagesActe(props.idActe);
      } else {
        imagesActe = getTexteActe(props.idActe);
      }
      imagesActe
        .then((pdf: any) => {
          if (pdf.body.size === 0) {
            setError(
              getLibelle("La visualisation de l'acte n'est pas disponible")
            );
          } else {
            // Tous les documents du RECE sont en base64 sauf ici où l'api renvoit un Blob
            setContenuBlob(pdf.body);
          }
        })
        .catch(erreurAppel => {
          if (erreurAppel?.response.status === HTTP_NOT_FOUND) {
            setError(
              getLibelle("La visualisation de l'acte n'est pas disponible")
            );
          } else {
            logError({
              messageUtilisateur:
                "Impossible d'obtenir les informations de l'acte"
            });
          }
        });
    }
  }, [props.idActe, isImage]);

  const clickSwitch = () => {
    setContenuBlob(undefined);
    setIsImage(!isImage);
  };

  return (
    <div id="docActeViewer" className="DocumentActeViewer">
      {props.estReecrit && (
        <button className="ButtonSwitchActe" onClick={() => clickSwitch()}>
          Texte saisi &lt;-&gt; Image
        </button>
      )}
      {error ? (
        error
      ) : (
        <VisionneuseDocument
          titre="Visionneuse PDF"
          contenuBlob={contenuBlob}
          typeMime={MimeType.APPLI_PDF}
        />
      )}
    </div>
  );
};
