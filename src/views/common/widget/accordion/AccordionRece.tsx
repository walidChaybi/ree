import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import React from "react";
import { SectionPanel, SectionPanelProps } from "../section/SectionPanel";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionRece.scss";

export interface AccordionReceProps {
  panel?: SectionPanelProps;
  index?: number;
  defaultExpanded: boolean;
  disabled: boolean;
  titre: string;
}

export const AccordionRece: React.FC<AccordionReceProps> = props => {
  return (
    <>
      <Accordion
        defaultExpanded={props.defaultExpanded}
        key={`rece-accordion-${props.index}`}
        className="accordionRece"
        disabled={props.disabled}
      >
        <AccordionTitle title={props.titre} />

        <AccordionDetails>
          {props.panel && (
            <SectionPanel {...props.panel} id={`${props.index}`} />
          )}
          {props.children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
