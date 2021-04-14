import React from "react";
import { SectionPanel, SectionPanelProps } from "../section/SectionPanel";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionRece.scss";

export interface AccordionReceProps {
  panels: SectionPanelProps[];
}

export const AccordionRece: React.FC<AccordionReceProps> = ({ panels }) => {
  return (
    <>
      {panels.map((panel, index) => {
        return (
          <Accordion
            defaultExpanded={index === 0}
            key={`rece-accordion-${index}`}
            className="accordionRece"
            disabled={panel.panelAreas.every(pa => !pa.value && !pa.parts)}
          >
            <AccordionTitle title={panel.title} />

            <AccordionDetails>
              <SectionPanel {...panel} id={`${index}`} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
