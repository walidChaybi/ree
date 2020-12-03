import React from "react";
import { AccordionPart, AccordionPartProps } from "./AccordionPart";
import "./sass/AccordionPanelArea.scss";

export interface AccordionPanelAreaProps {
  parts: AccordionPartProps[];
  id?: string;
}

export const AccordionPanelArea: React.FC<AccordionPanelAreaProps> = ({
  parts,
  id = ""
}) => {
  return (
    <div className="accordionPanelArea">
      {parts.map((part, index) => {
        return (
          <AccordionPart
            key={`accordion-panel-area-${index}-${id}`}
            {...part}
            columnIndex={
              part.columnIndex != null ? part.columnIndex : index + 1
            }
          />
        );
      })}
    </div>
  );
};
