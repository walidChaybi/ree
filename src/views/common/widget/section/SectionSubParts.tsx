import React from "react";
import "./scss/SectionPart.scss";
import { SectionPart } from "./SectionPart";
import { SectionContentPartProps } from "./SectionPartContent";

export interface SectionSubPartProps {
  subParts: SectionContentPartProps[];
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
          contentsPart={{ ...subPart }}
        />
      ))}
    </div>
  );
};
