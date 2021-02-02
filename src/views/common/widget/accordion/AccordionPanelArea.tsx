import React from "react";
import { AccordionPart, AccordionPartProps } from "./AccordionPart";
import "./sass/AccordionPanelArea.scss";

export interface AccordionPanelAreaProps {
  parts: AccordionPartProps[];
  id?: string;
  title?: string;
  className?: string;
}

export const AccordionPanelArea: React.FC<AccordionPanelAreaProps> = ({
  parts,
  id = "",
  title,
  className = "defaultAccordionColumn"
}) => {
  return (
    <div className={`accordionPanelArea ${className}`}>
      {title && <span className="titlePanelArea">{title}</span>}
      {parts.map((part, index) => {
        return (
          <AccordionPart
            key={`accordion-panel-area-${index}-${id}`}
            {...part}
            columnIndex={
              part.columnIndex != null ? part.columnIndex : String(index + 1)
            }
          />
        );
      })}
    </div>
  );
};
