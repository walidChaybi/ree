import React from "react";
import "./sass/AccordionPart.scss";
import { AccordionSubParts } from "./AccordionSubPart";
import {
  AccordionContentPartProps,
  AccordionPartContent
} from "./AccordionPartContent";

export interface AccordionPartProps {
  contentsPart?: AccordionContentPartProps;
  subParts?: AccordionContentPartProps[];
  columnIndex?: string;
}

export const AccordionPart: React.FC<AccordionPartProps> = ({
  contentsPart,
  subParts,
  columnIndex = "1"
}) => {
  return (
    <>
      {subParts != null ? (
        <AccordionSubParts subParts={subParts} columnIndex={columnIndex} />
      ) : (
        contentsPart && (
          <AccordionPartContent {...contentsPart} columnIndex={columnIndex} />
        )
      )}
    </>
  );
};
