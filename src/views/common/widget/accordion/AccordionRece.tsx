import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useEffect, useState } from "react";
import { SectionPanel, SectionPanelProps } from "../section/SectionPanel";
import { AccordionTitle } from "./AccordionTitle";
import "./scss/AccordionRece.scss";

export interface AccordionReceProps {
  panel?: SectionPanelProps;
  index?: number;
  expanded: boolean;
  expandedPossible?: boolean;
  disabled?: boolean;
  titre?: string;
  className?: AccordionReceClassNameProps;
  bouton?: JSX.Element;
  tag?: JSX.Element;
}
export interface AccordionReceClassNameProps {
  container?: string;
  content?: string;
  title?: string;
}

export const AccordionRece: React.FC<
  React.PropsWithChildren<AccordionReceProps>
> = ({ expandedPossible = true, ...props }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(props.expanded);

  useEffect(() => {
    setIsExpanded(props.expanded);
  }, [props.expanded]);

  const handleChange = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={props.className?.container}>
      <Accordion
        key={`rece-accordion-${props.index}`}
        className="accordionRece"
        expanded={expandedPossible && isExpanded}
        disabled={props.disabled}
        onChange={handleChange}
        TransitionProps={{ timeout: 0 }}
      >
        <AccordionTitle
          titre={props.titre}
          className={props.className?.title}
          bouton={props.bouton}
          boutonExpanded={expandedPossible}
          tag={props.tag}
        />
        <AccordionDetails>
          {props.panel && (
            <SectionPanel {...props.panel} id={`${props.index}`} />
          )}
          <div className={props.className?.content}>{props.children}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
