import React, { Fragment } from "react";
import "./sass/AccordionPanel.scss";
import {
  AccordionPanelAreaProps,
  AccordionPanelArea
} from "./AccordionPanelArea";
export interface AccordionPanelProps {
  panelAreas: AccordionPanelAreaProps[];
  title: string;
  id?: string;
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  panelAreas,
  title,
  id
}) => {
  return (
    <div className={"accrodionPanel"}>
      {panelAreas.map((panelArea, index) => {
        return (
          <Fragment key={`accordion-panel-area-${index}-${title}-${id}`}>
            <AccordionPanelArea id={`${title}-${id}`} parts={panelArea.parts} />
            {index !== panelAreas.length - 1 && (
              <hr
                style={{
                  width: "80%",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
                data-testid={`accordion-panel-hr-${title}-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
