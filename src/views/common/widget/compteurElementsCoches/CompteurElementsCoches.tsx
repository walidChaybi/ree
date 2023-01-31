import { getLibelle } from "@util/Utils";
import React from "react";

import "./CompteurElementsCoches.scss";

interface CompteurElementsCochesProps {
  nombreElements: number;
}

export const CompteurElementsCoches: React.FC<
  CompteurElementsCochesProps
> = props => {
  return (
    <div className="ElementsCoches">
      {getLibelle(`${props.nombreElements} élément(s) coché(s)`)}
    </div>
  );
};
