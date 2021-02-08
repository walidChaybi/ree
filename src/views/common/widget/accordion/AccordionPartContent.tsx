import React from "react";
import { AccordionContent, AccordionContentProps } from "./AccordionContent";

export interface AccordionContentPartProps {
  contents: AccordionContentProps[];
  title?: string;
  classNameContent?: string;
}

export const AccordionPartContent: React.FC<AccordionContentPartProps> = ({
  contents,
  title,
  classNameContent
}) => {
  return (
    <div className={`wrapper ${classNameContent}`}>
      {title && <span className="titlePart">{title}</span>}
      {contents.map((content, index) => {
        return (
          <AccordionContent
            key={`content-${title}-${index}`}
            {...content}
            row={title != null ? index + 1 : index}
          />
        );
      })}
    </div>
  );
};
