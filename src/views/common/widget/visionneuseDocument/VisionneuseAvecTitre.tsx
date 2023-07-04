import React from "react";
import { Fieldset } from "../fieldset/Fieldset";
import { VisionneuseDocument } from "./VisionneuseDocument";

interface IVisionneuseDocumentProps {
  titre: string;
  contenuBase64?: string;
  typeMime: string;
  children?: JSX.Element;
}

export const VisionneuseAvecTitre: React.FC<
  IVisionneuseDocumentProps
> = props => {
  return (
    <Fieldset titre={props.titre}>
      {props.children}
      <VisionneuseDocument
        contenuBase64={props.contenuBase64}
        typeMime={props.typeMime}
        infoBulle={props.titre}
      ></VisionneuseDocument>
    </Fieldset>
  );
};
