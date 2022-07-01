import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  title?: string;
  className?: string;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({
  title,
  className
}) => {
  return (
    <AccordionSummary
      className={["accordionTitle", className].join(" ")}
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
    >
      {title}
    </AccordionSummary>
  );
};
