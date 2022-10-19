import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LibelleEditable } from "@widget/libelleEditable/LibelleEditable";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  title?: string;
  className?: string;
  boutonExpanded?: boolean;
  bouton?: JSX.Element;
  handleMiseAJourLibelle?: (e: any) => void;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({
  boutonExpanded = true,
  ...props
}) => {
  return (
    <AccordionSummary
      className={["accordionTitle", props.className].join(" ")}
      expandIcon={boutonExpanded && <ExpandMoreIcon />}
      title={props.title}
    >
      <div className={props.bouton ? "MuiSummaryFlex" : ""}>
        {props.bouton && <div className="itemHidden"></div>}
        <LibelleEditable
          libelle={props.title}
          handleMiseAJourLibelle={props.handleMiseAJourLibelle}
        />
        {props.bouton}
      </div>
    </AccordionSummary>
  );
};
