import { ErrorOutline } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";
import "./VoletAvecOnglet.scss";

export interface IOnglet {
  titre: string;
  component: JSX.Element;
  iconeWarning?: boolean;
  data?: any;
}
export interface OngletProps {
  liste: IOnglet[];
  ongletSelectionne: number;
}
export interface VoletOngletProps {
  liste: IOnglet[];
  ongletSelectionne: number;
  handleChange?: (event: any, newValue: string) => void;
}

export const VoletAvecOnglet: React.FC<VoletOngletProps> = props => {
  return (
    <div className="VoletAvecOnglet">
      <TabContext
        value={
          props.ongletSelectionne ? props.ongletSelectionne.toString() : "0"
        }
      >
        <TabList
          onChange={props.handleChange}
          className="BarreOnglet"
          indicatorColor="secondary"
        >
          {props.liste.map((onglet, index) => {
            return (
              <Tab
                key={index}
                label={
                  onglet.iconeWarning ? (
                    <>
                      {onglet.titre} <ErrorOutline />
                    </>
                  ) : (
                    <>{onglet.titre}</>
                  )
                }
                value={index.toString()}
              />
            );
          })}
        </TabList>
        {props.liste.map((onglet, index) => {
          return (
            <TabPanel
              key={index}
              className="ContenuVolet"
              value={index.toString()}
            >
              {onglet.component}
            </TabPanel>
          );
        })}
      </TabContext>
      {props.children}
    </div>
  );
};
