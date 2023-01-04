import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LibelleEditable } from "@widget/libelleEditable/LibelleEditable";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  titre?: string | JSX.Element;
  tooltip?: string;
  titreOrigine?: string;
  className?: string;
  boutonExpanded?: boolean;
  bouton?: JSX.Element;
  handleMiseAJourLibelle?: (e: any) => void;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({
  boutonExpanded = true,
  ...props
}) => {
  const getTitreAccordion = (): string | undefined => {
    let titre;

    if (props.tooltip) {
      titre = props.tooltip;
    } else if (props.titre && typeof props.titre === "string") {
      titre = props.titre;
    }

    return titre;
  };

  return (
    <AccordionSummary
      className={["accordionTitle", props.className].join(" ")}
      expandIcon={boutonExpanded && <ExpandMoreIcon />}
      title={getTitreAccordion()}
      style={{ userSelect: "text" }}
    >
      <div className={props.bouton ? "MuiSummaryFlex" : ""}>
        {props.handleMiseAJourLibelle ? (
          <LibelleEditable
            libelle={getTitreAccordion()}
            libelleOrigine={props.titreOrigine}
            handleMiseAJourLibelle={props.handleMiseAJourLibelle}
          />
        ) : (
          <>
            <div className="itemHidden" />
            {props.titre}
          </>
        )}
        {props.bouton}
      </div>
    </AccordionSummary>
  );
};
