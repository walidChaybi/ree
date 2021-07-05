import React from "react";
import "./scss/SectionPart.scss";
import { SectionPart } from "./SectionPart";
import { SectionPartContentProps } from "./SectionPartContent";

export interface SectionSubPartProps {
  subParts: SectionPartContentProps[];
  classNameContent?: string;
}

export const SectionSubParts: React.FC<SectionSubPartProps> = ({
  subParts,
  classNameContent
}) => {
  return (
    <div className={`wrapper  ${classNameContent}`}>
      {subParts.map(subPart => (
        <SectionPart
          key={`subPart-columnIndex-${subPart.title}`}
          partContent={{ ...subPart }}
        />
      ))}
    </div>
  );
};
