import { MimeType } from "file-type";
import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import "./scss/VisionneuseDocument.scss";
import { VisionneuseDocument } from "./VisionneuseDocument";

interface IVisionneuseDocumentProps {
  titre: string;
  contenu?: string; // Base64
  typeMime?: MimeType;
  children?: JSX.Element;
}

export const VisionneuseAvecTitre: React.FC<IVisionneuseDocumentProps> =
  props => {
    return (
      <Fieldset titre={props.titre}>
        {props.children}
        <VisionneuseDocument {...props}></VisionneuseDocument>
      </Fieldset>
    );
  };
