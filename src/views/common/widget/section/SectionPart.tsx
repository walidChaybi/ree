import React from "react";
import "./scss/SectionPart.scss";
import {
  SectionPartContent,
  SectionPartContentProps
} from "./SectionPartContent";
import { SectionSubParts } from "./SectionSubParts";

export interface SectionPartProps {
  partContent?: SectionPartContentProps;
  subParts?: SectionPartContentProps[];
  classNameContent?: string;
}

export const SectionPart: React.FC<SectionPartProps> = ({
  partContent,
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
        partContent && (
          <SectionPartContent
            {...partContent}
            classNameContent={classNameContent}
          />
        )
      )}
    </>
  );
};
