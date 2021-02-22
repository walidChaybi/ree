import React from "react";
import { AccordionPart, AccordionPartProps } from "./AccordionPart";
import "./sass/AccordionPanelArea.scss";

export interface AccordionPanelAreaProps {
  parts?: AccordionPartProps[];
  value?: JSX.Element | JSX.Element[] | string;
  id?: string;
  title?: string;
  nbColonne?: number;
}

export const AccordionPanelArea: React.FC<AccordionPanelAreaProps> = ({
  parts,
  value,
  id = "",
  title,
  nbColonne = 1
}) => {
  const test = nbColonne > 1 ? `nbColonnes${nbColonne}` : "";
  return (
    <div className={`accordionPanelArea ${test}`}>
      {title && <span className="titlePanelArea">{title}</span>}
      {value && <div>{value}</div>}
      {parts &&
        parts.map((part, index) => {
          const classNamePart =
            part.classNameContent == null && nbColonne > 1
              ? getCssColonne(nbColonne, index)
              : part.classNameContent;
          return (
            <AccordionPart
              key={`accordion-panel-area-${index}-${id}`}
              {...part}
              classNameContent={classNamePart}
            />
          );
        })}
    </div>
  );
};

function getCssColonne(nbColonnes: number, indexPart: number): string {
  let className = "";
  if ((indexPart + 1) % nbColonnes === 0) {
    className = `Colonne${nbColonnes}`;
  } else {
    className = `Colonne${(indexPart + 1) % nbColonnes}`;
  }
  return className;
}
