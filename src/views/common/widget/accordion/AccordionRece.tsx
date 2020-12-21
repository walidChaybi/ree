import React from "react";
import { AccordionPanel, AccordionPanelProps } from "./AccordionPanel";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { AccordionTitle } from "./AccordionTitle";
import "./sass/AccordionRece.scss";

export interface AccordionReceProps {
  panels: AccordionPanelProps[];
}

export const AccordionRece: React.FC<AccordionReceProps> = ({ panels }) => {
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const handleChange = () => (event: any) => {
    setExpanded(!expanded);
  };

  return (
    <>
      {panels.map((panel, index) => {
        return (
          <Accordion
            expanded={expanded}
            onChange={handleChange()}
            key={`rece-accordion-${index}`}
            className="accordionRece"
          >
            <AccordionTitle title={panel.title} />

            <AccordionDetails>
              <AccordionPanel {...panel} id={`${index}`} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
