import React from "react";
import { AccordionContent, AccordionContentProps } from "./AccordionContent";
import "./sass/AccordionPart.scss";
export interface AccordionPartProps {
  contents: AccordionContentProps[];
  title: string;
  columnIndex?: number;
  classNameContent?: string;
}

export const AccordionPart: React.FC<AccordionPartProps> = ({
  contents,
  title,
  columnIndex = 1,
  classNameContent
}) => {
  return (
    <div className="wrapper part" style={{ gridColumn: columnIndex }}>
      <span className="titlePart">{title}</span>
      {contents.map((content, index) => {
        return (
          <AccordionContent
            className={classNameContent}
            key={`content-${title}-${index}`}
            {...content}
            row={index + 1}
          />
        );
      })}
    </div>
  );
};
