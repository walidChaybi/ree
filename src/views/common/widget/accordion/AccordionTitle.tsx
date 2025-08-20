import AccordionSummary from "@mui/material/AccordionSummary";
import { LibelleEditable } from "@widget/libelleEditable/LibelleEditable";
import React from "react";
import { MdExpandMore } from "react-icons/md";
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
      className={`accordionTitle !rounded-md !bg-bleu !text-center !text-white ${props.className ?? ""}`}
      expandIcon={
        boutonExpanded && (
          <MdExpandMore
            className="text-2xl"
            aria-label="Étendre la section"
          />
        )
      }
      title={props.titre}
      style={{ userSelect: "text" }}
    >
      <div className={`text-center ${props.bouton ? "MuiSummaryFlex" : ""} ${props.className ?? ""}`}>
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
            <span className="title !font-normal">{props.titre}</span>
          </>
        )}
        {props.bouton}
      </div>
    </AccordionSummary>
  );
};
