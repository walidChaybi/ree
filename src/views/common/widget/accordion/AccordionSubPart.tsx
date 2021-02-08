import React from "react";
import "./sass/AccordionPart.scss";
import { AccordionPart } from "./AccordionPart";
import { AccordionContentPartProps } from "./AccordionPartContent";

export interface AccordionSubPartProps {
  subParts: AccordionContentPartProps[];
  classNameContent?: string;
}

export const AccordionSubParts: React.FC<AccordionSubPartProps> = ({
  subParts,
  classNameContent
}) => {
  return (
    <div className={`wrapper  ${classNameContent}`}>
      {subParts.map(subPart => (
        <AccordionPart
          key={`subPart-columnIndex-${subPart.title}`}
          contentsPart={{ ...subPart }}
        />
      ))}
    </div>
  );
};
