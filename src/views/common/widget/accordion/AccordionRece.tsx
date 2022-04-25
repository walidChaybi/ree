import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import React, { useEffect, useState } from "react";
import { SectionPanel, SectionPanelProps } from "../section/SectionPanel";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionRece.scss";

export interface AccordionReceProps {
  panel?: SectionPanelProps;
  index?: number;
  expanded: boolean;
  disabled?: boolean;
  titre: string;
}

export const AccordionRece: React.FC<AccordionReceProps> = ({
  children,
  panel,
  index,
  expanded,
  disabled,
  titre
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const handleChange = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Accordion
        key={`rece-accordion-${index}`}
        className="accordionRece"
        expanded={isExpanded}
        disabled={disabled}
        onChange={handleChange}
        TransitionProps={{ timeout: 0 }}
      >
        <AccordionTitle title={titre} />
        <AccordionDetails>
          {panel && <SectionPanel {...panel} id={`${index}`} />}
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
