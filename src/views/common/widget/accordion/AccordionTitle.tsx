import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  title?: string;
  className?: string;
  bouton?: JSX.Element;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = props => {
  return (
    <AccordionSummary
      className={["accordionTitle", props.className].join(" ")}
      expandIcon={<ExpandMoreIcon />}
      title={props.title}
    >
      <div className={props.bouton ? "MuiSummaryFlex" : ""}>
        {props.bouton && <div className="itemHidden"></div>}
        {props.title}
        {props.bouton}
      </div>
    </AccordionSummary>
  );
};
