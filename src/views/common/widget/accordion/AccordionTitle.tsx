import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  title: string;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({ title }) => {
  return (
    <AccordionSummary
      className="accordionTitle"
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
    >
      {title}
    </AccordionSummary>
  );
};
