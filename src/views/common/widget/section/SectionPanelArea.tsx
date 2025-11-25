import React from "react";
import { SectionPart, SectionPartProps } from "./SectionPart";
import "./scss/SectionPanelArea.scss";

export interface SectionPanelAreaProps {
  parts?: SectionPartProps[];
  value?: JSX.Element | JSX.Element[] | string;
  id?: string;
  title?: string;
  nbColonne?: number;
}

export const SectionPanelArea: React.FC<SectionPanelAreaProps> = ({ parts, value, id = "", title, nbColonne = 1 }) => {
  const cssGrid = nbColonne > 1 ? `nbColonnes${nbColonne}` : "";
  return (
    <div className={`SectionPanelArea ${cssGrid}`}>
      {title && <span className="TitlePanelArea">{title}</span>}
      {value && <div>{value}</div>}
      {parts &&
        parts.map((part, index) => {
          const classNamePart = part.classNameContent == null && nbColonne > 1 ? getCssColonne(nbColonne, index) : part.classNameContent;
          return (
            <SectionPart
              key={`section-panel-area-${index}-${id}`}
              {...part}
              classNameContent={classNamePart}
            />
          );
        })}
    </div>
  );
};

const getCssColonne = (nbColonnes: number, indexPart: number): string => {
  let className = "";
  if ((indexPart + 1) % nbColonnes === 0) {
    className = `Colonne${nbColonnes}`;
  } else {
    className = `Colonne${(indexPart + 1) % nbColonnes}`;
  }
  return className;
};
