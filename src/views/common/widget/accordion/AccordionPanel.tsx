import React from "react";
import "./sass/AccordionPanel.scss";
import {
  AccordionPanelAreaProps,
  AccordionPanelArea
} from "./AccordionPanelArea";
export interface AccordionPanelProps {
  panelAreas: AccordionPanelAreaProps[];
  title: string;
}

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  panelAreas,
  title
}) => {
  return (
    <div className={"accrodionPanel"}>
      {panelAreas.map((panelArea, index) => {
        return (
          <>
            <AccordionPanelArea
              key={`accordion-panel-area-${index}-${title}`}
              id={title}
              parts={panelArea.parts}
            />
            {index !== panelAreas.length - 1 && (
              <hr
                style={{
                  width: "80%",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
