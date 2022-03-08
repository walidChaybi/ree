import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { IOnglet } from "../../../../../model/requete/IOnglet";

interface VoletAvecOngletProps {
  titre: string;
  onglets: OngletProps;
  children?: any;
}

export interface OngletProps {
  liste: IOnglet[];
  ongletSelectionne: number;
}

export const VoletAvecOnglet: React.FC<VoletAvecOngletProps> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState<string>(
    props.onglets.ongletSelectionne.toString()
  );
  const [onglets, setOnglets] = useState<IOnglet[]>(props.onglets.liste);

  useEffect(() => {
    setOngletSelectionne(props.onglets.ongletSelectionne.toString());
    setOnglets(props.onglets.liste);
  }, [props.onglets]);

  const handleChange = (event: any, newValue: string) => {
    setOngletSelectionne(newValue);
  };

  return (
    <div className="VoletAvecOnglet">
      <TabContext value={ongletSelectionne}>
        <TabList
          onChange={handleChange}
          className="BarreOnglet"
          indicatorColor="secondary"
        >
          {onglets.map((onglet, index) => {
            return (
              <Tab key={index} label={onglet.titre} value={index.toString()} />
            );
          })}
        </TabList>
        {onglets.map((onglet, index) => {
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
