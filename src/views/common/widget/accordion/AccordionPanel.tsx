import React from "react";
import { DataAccordion, AccordionContent } from "./AccordionPart";

export interface AccordionPart {
  contents: DataAccordion[];
  title: string;
}

export const AccordionPanel: React.FC<AccordionPart> = ({ contents }) => {
  return (
    <div>
      {contents.map(content => {
        return <AccordionContent {...content} />;
      })}
    </div>
  );
};
