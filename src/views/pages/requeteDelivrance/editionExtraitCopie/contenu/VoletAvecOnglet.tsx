import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useState } from "react";
import { getLibelle } from "../../../../common/util/Utils";
import { Onglet } from "./Onglet";

interface VoletAvecOngletProps {
  titre: string;
  onglets: Onglet[];

  children?: any;
}

export const VoletAvecOnglet: React.FC<VoletAvecOngletProps> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState<string>("0");

  const handleChange = (event: any, newValue: string) => {
    setOngletSelectionne(newValue);
  };

  return (
    <div className="VoletAvecOnglet">
      <div className="TitreVolet">{getLibelle(props.titre)}</div>
      <TabContext value={ongletSelectionne}>
        <TabList
          onChange={handleChange}
          className="BarreOnglet"
          indicatorColor="secondary"
        >
          {props.onglets.map((onglet, index) => {
            return (
              <Tab key={index} label={onglet.titre} value={index.toString()} />
            );
          })}
        </TabList>
        {props.onglets.map((onglet, index) => {
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
