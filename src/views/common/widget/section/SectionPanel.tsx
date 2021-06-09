import React, { Fragment } from "react";
import "./scss/SectionPanel.scss";
import { SectionPanelArea, SectionPanelAreaProps } from "./SectionPanelArea";
export interface SectionPanelProps {
  panelAreas: SectionPanelAreaProps[];
  title: string;
  id?: string;
  url?: string;
}

export const SectionPanel: React.FC<SectionPanelProps> = ({
  panelAreas,
  title,
  id
}) => {
  return (
    <div className={"SectionPanel"}>
      {panelAreas.map((panelArea, index) => {
        return (
          <Fragment key={`section-panel-area-${index}-${title}-${id}`}>
            <SectionPanelArea
              id={`${title}-${id}`}
              parts={panelArea.parts}
              value={panelArea.value}
              title={panelArea.title}
              nbColonne={panelArea.nbColonne}
            />
            {index !== panelAreas.length - 1 && (
              <hr
                className={"SectionPanelAreaSeparation"}
                data-testid={`section-panel-hr-${title}-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
