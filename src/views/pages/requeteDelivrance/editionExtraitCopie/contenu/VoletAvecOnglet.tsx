import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useCallback, useEffect, useState } from "react";
import { IOnglet } from "../../../../../model/requete/IOnglet";
import { checkDirty } from "../EditionExtraitCopieUtils";

interface VoletAvecOngletProps {
  titre: string;
  onglets: OngletProps;
  children?: any;
  isDirty?: boolean;
  setIsDirty?: any;
}

export interface OngletProps {
  liste: IOnglet[];
  ongletSelectionne: number;
}

export const VoletAvecOnglet: React.FC<VoletAvecOngletProps> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState<number>();
  const [onglets, setOnglets] = useState<IOnglet[]>(props.onglets.liste);

  useEffect(() => {
    if (
      ongletSelectionne === undefined &&
      props.onglets.ongletSelectionne >= 0
    ) {
      setOngletSelectionne(props.onglets.ongletSelectionne);
    }
    setOnglets(props.onglets.liste);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onglets]);

  const handleChange = useCallback(
    (event: any, newValue: string) => {
      if (props.isDirty !== undefined && props.setIsDirty) {
        if (checkDirty(props.isDirty, props.setIsDirty)) {
          setOngletSelectionne(parseInt(newValue));
        }
      } else {
        setOngletSelectionne(parseInt(newValue));
      }
    },
    [props]
  );

  return (
    <div className="VoletAvecOnglet">
      <TabContext
        value={ongletSelectionne ? ongletSelectionne.toString() : "0"}
      >
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
