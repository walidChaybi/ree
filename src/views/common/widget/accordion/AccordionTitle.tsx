import React from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  title: string;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({ title }) => {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      className="accordionTitle"
    >
      {title}
    </AccordionSummary>
  );
};
