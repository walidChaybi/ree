import React from "react";
import { AccordionPartProps, AccordionPart } from "./AccordionPart";

export interface AccordionPanelProps {
  parts: AccordionPartProps[];
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return <AccordionPart {...part} />;
      })}
    </div>
  );
};
