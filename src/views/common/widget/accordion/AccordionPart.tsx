import React from "react";
import { AccordionContent, AccordionContentProps } from "./AccordionContent";
import "./sass/AccordionPart.scss";
export interface AccordionPartProps {
  contents: AccordionContentProps[];
  title: string;
  columnIndex?: number;
}

export const AccordionPart: React.FC<AccordionPartProps> = ({
  contents,
  title,
  columnIndex = 1
}) => {
  return (
    <div className="wrapper part" style={{ gridColumn: columnIndex }}>
      <span className="titlePart">{title}</span>
      {contents.map((content, index) => {
        return (
          <AccordionContent
            key={`content-${title}-${index}`}
            {...content}
            row={index + 1}
          />
        );
      })}
    </div>
  );
};
