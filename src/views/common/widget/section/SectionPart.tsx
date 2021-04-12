import React from "react";
import "./scss/SectionPart.scss";
import { SectionSubParts } from "./SectionSubParts";
import {
  SectionContentPartProps,
  SectionPartContent
} from "./SectionPartContent";

export interface SectionPartProps {
  contentsPart?: SectionContentPartProps;
  subParts?: SectionContentPartProps[];
  classNameContent?: string;
}

export const SectionPart: React.FC<SectionPartProps> = ({
  contentsPart,
  subParts,
  classNameContent = ""
}) => {
  return (
    <>
      {subParts != null ? (
        <SectionSubParts
          subParts={subParts}
          classNameContent={classNameContent}
        />
      ) : (
        contentsPart && (
          <SectionPartContent
            {...contentsPart}
            classNameContent={classNameContent}
          />
        )
      )}
    </>
  );
};
