import React from "react";
import { AccordionContent, AccordionContentProps } from "./AccordionContent";

export interface AccordionPartProps {
  contents: AccordionContentProps[];
  title: string;
}

export const AccordionPart: React.FC<AccordionPartProps> = ({
  contents,
  title
}) => {
  return (
    <>
      <div>{title}</div>
      {contents.map(content => {
        return <AccordionContent {...content} />;
      })}
    </>
  );
};
