import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import { LibelleEditable } from "@widget/libelleEditable/LibelleEditable";
import React from "react";
import "./scss/AccordionTitle.scss";

interface AccordionTitleProps {
  titre?: string;
  titreOrigine?: string;
  className?: string;
  boutonExpanded?: boolean;
  bouton?: JSX.Element;
  tag?: JSX.Element;
  handleMiseAJourLibelle?: (e: any) => void;
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({ boutonExpanded = true, ...props }) => {
  return (
    <AccordionSummary
      className={["accordionTitle", props.className].join(" ")}
      expandIcon={boutonExpanded && <ExpandMoreIcon />}
      title={props.titre}
      style={{ userSelect: "text" }}
    >
      <div className={[props.bouton ? "MuiSummaryFlex" : "", props.className].join(" ")}>
        {props.tag}
        {props.handleMiseAJourLibelle ? (
          <LibelleEditable
            libelle={props.titre}
            libelleOrigine={props.titreOrigine}
            handleMiseAJourLibelle={props.handleMiseAJourLibelle}
          />
        ) : (
          <>
            <div className="itemHidden" />
            <span className="title">{props.titre}</span>
          </>
        )}
        {props.bouton}
      </div>
    </AccordionSummary>
  );
};
