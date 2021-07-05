import React from "react";
import { SectionContent, SectionContentProps } from "./SectionContent";

export interface SectionPartContentProps {
  contents: SectionContentProps[];
  title?: string;
  classNameContent?: string;
}

export const SectionPartContent: React.FC<SectionPartContentProps> = ({
  contents,
  title,
  classNameContent
}) => {
  return (
    <div className={`wrapper ${classNameContent}`}>
      {title && <span className="TitlePart">{title}</span>}
      {contents.map((content, index) => {
        return (
          <SectionContent
            key={`content-${title}-${index}`}
            {...content}
            row={title != null ? index + 1 : index}
          />
        );
      })}
    </div>
  );
};
