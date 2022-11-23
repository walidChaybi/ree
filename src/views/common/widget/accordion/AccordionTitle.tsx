import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LibelleEditable } from "@widget/libelleEditable/LibelleEditable";
import React from "react";
import "./scss/AccordionTitle.scss";

export interface AccordionTitleProps {
  titre?: string;
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
  return (
    <AccordionSummary
      className={["accordionTitle", props.className].join(" ")}
      expandIcon={boutonExpanded && <ExpandMoreIcon />}
      title={props.titre}
    >
      <div className={props.bouton ? "MuiSummaryFlex" : ""}>
        {props.handleMiseAJourLibelle ? (
          <LibelleEditable
            libelle={props.titre}
            libelleOrigine={props.titreOrigine}
            handleMiseAJourLibelle={props.handleMiseAJourLibelle}
          />
        ) : (
          <>
            <div className="itemHidden" />
            {props.titre}
            {props.bouton}
          </>
        )}
      </div>
    </AccordionSummary>
  );
};
