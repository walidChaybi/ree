import React from "react";
import { AccordionPanel, AccordionPanelProps } from "./AccordionPanel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface AccordionReceProps {
  panels: AccordionPanelProps[];
}

export const AccordionRece: React.FC<AccordionReceProps> = ({ panels }) => {
  const [expanded, setExpanded] = React.useState<number>(-1);

  const handleChange = (index: number) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : -1);
  };

  return (
    <>
      {panels.map((panel, index) => {
        return (
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {"vue du rc"}
            </AccordionSummary>
            <AccordionDetails>
              <AccordionPanel parts={panel.parts} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
