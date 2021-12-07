import { LinearProgress } from "@material-ui/core";
import { MimeType } from "file-type";
import React, { useEffect, useState } from "react";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { base64toBlob } from "../../../../../common/util/FileUtils";
import { soustypeRDDouRDC } from "../../../../../common/util/RequetesUtils";
import { getLibelle } from "../../../../../common/util/Utils";
import "../../../../../common/widget/document/scss/VisionneuseDocument.scss";
import { MenuCourrier } from "./MenuCourrier";

interface IVisionneuseDocumentProps {
  requete: IRequeteDelivrance;
  contenu?: string; // Base64
  typeMime?: MimeType;
}

export const VisionneuseApercuTraitement: React.FC<IVisionneuseDocumentProps> = props => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (props.contenu && props.typeMime) {
      setUrl(base64toBlob(props.contenu, props.typeMime));
    }
  }, [props.contenu, props.typeMime]);

  return (
    <div className={"VisionneuseDocument"}>
      <div className="Fieldset">
        <div className="Titre">
          <span>{getLibelle("Aperçu des documents")}</span>
          {soustypeRDDouRDC(props.requete.sousType) && (
            <MenuCourrier requete={props.requete}></MenuCourrier>
          )}
        </div>
        {url ? (
          <iframe title={getLibelle("Aperçu des documents")} src={url}></iframe>
        ) : props.contenu === "" ? (
          <p className="messagePasDoc">
            {getLibelle("Aucun document à afficher")}
          </p>
        ) : (
          <LinearProgress className="ProgressBar" />
        )}
      </div>
    </div>
  );
};
