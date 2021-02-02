import React from "react";
import "./sass/AccordionPart.scss";
import { AccordionPart } from "./AccordionPart";
import { AccordionContentPartProps } from "./AccordionPartContent";

export interface AccordionSubPartProps {
  subParts: AccordionContentPartProps[];
  columnIndex: string;
}

export const AccordionSubParts: React.FC<AccordionSubPartProps> = ({
  subParts,
  columnIndex
}) => {
  return (
    <div className={`wrapper part `} style={{ gridColumn: columnIndex }}>
      {subParts.map(subPart => (
        <AccordionPart
          key={`subPart-columnIndex-${subPart.title}`}
          contentsPart={{ ...subPart }}
          columnIndex={"1"}
        />
      ))}
    </div>
  );
};
