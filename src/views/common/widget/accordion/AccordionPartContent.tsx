import React from "react";
import { AccordionContent, AccordionContentProps } from "./AccordionContent";

export interface AccordionContentPartProps {
  contents: AccordionContentProps[];
  title?: string;
  rowIndex?: string;
  classNameContent?: string;
  classNamePart?: string;
  columnIndex?: string;
}

export const AccordionPartContent: React.FC<AccordionContentPartProps> = ({
  contents,
  title,
  classNameContent,
  classNamePart,
  columnIndex = "1"
}) => {
  return (
    <div
      className={`wrapper part ${classNamePart}`}
      style={{ gridColumn: columnIndex }}
    >
      {title && <span className="titlePart">{title}</span>}
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
