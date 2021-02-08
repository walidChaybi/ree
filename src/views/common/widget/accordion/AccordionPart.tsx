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
  classNameContent?: string;
}

export const AccordionPart: React.FC<AccordionPartProps> = ({
  contentsPart,
  subParts,
  classNameContent = ""
}) => {
  return (
    <>
      {subParts != null ? (
        <AccordionSubParts
          subParts={subParts}
          classNameContent={classNameContent}
        />
      ) : (
        contentsPart && (
          <AccordionPartContent
            {...contentsPart}
            classNameContent={classNameContent}
          />
        )
      )}
    </>
  );
};
