import { RECEContext } from "@core/contexts/RECEContext";
import { ErrorOutline } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { checkDirty } from "@util/Utils";
import React, { useContext, useState } from "react";
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
  ongletSelectionne?: number;
  handleChange?: (valeur: number) => void;
  onChangeCallback?: () => void;
  checkDirty?: boolean;
  ongletParDefault?: number;
}

export const VoletAvecOnglet: React.FC<VoletOngletProps> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(
    props.ongletParDefault || 0
  );
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const handleChangeLocalOnglet = (valeur: number) => {
    const estDirty = props.checkDirty && checkDirty(isDirty, setIsDirty);
    if (!props.checkDirty || estDirty) {
      setOngletSelectionne(valeur);
      props.onChangeCallback && props.onChangeCallback();
    }
  };

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    props.handleChange
      ? props.handleChange(parseInt(newValue))
      : handleChangeLocalOnglet(parseInt(newValue));
  };

  return (
    <div className="VoletAvecOnglet">
      <TabContext
        value={
          props.ongletSelectionne === undefined
            ? ongletSelectionne.toString()
            : props.ongletSelectionne.toString()
        }
      >
        <TabList
          onChange={handleChange}
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
