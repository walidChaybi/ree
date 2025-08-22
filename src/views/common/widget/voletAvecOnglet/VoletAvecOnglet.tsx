import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { checkDirty } from "@util/Utils";
import React, { useContext, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { RECEContextActions, RECEContextData } from "../../../../contexts/RECEContextProvider";
import "./VoletAvecOnglet.scss";

interface IOnglet {
  titre: string;
  component: JSX.Element;
  iconeWarning?: boolean;
  data?: any;
}

interface VoletOngletProps {
  liste: IOnglet[];
  ongletSelectionne?: number;
  handleChange?: (valeur: number) => void;
  onChangeCallback?: () => void;
  checkDirty?: boolean;
  ongletParDefault?: number;
}

export const VoletAvecOnglet: React.FC<React.PropsWithChildren<VoletOngletProps>> = props => {
  const [ongletSelectionne, setOngletSelectionne] = useState(props.ongletParDefault || 0);
  const { isDirty } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const handleChangeLocalOnglet = (valeur: number) => {
    const estDirty = props.checkDirty && checkDirty(isDirty, setIsDirty);
    if (!props.checkDirty || estDirty) {
      setOngletSelectionne(valeur);
      props.onChangeCallback && props.onChangeCallback();
    }
  };

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    props.handleChange ? props.handleChange(parseInt(newValue)) : handleChangeLocalOnglet(parseInt(newValue));
  };

  return (
    <div className="VoletAvecOnglet">
      <TabContext value={props.ongletSelectionne === undefined ? ongletSelectionne.toString() : props.ongletSelectionne.toString()}>
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
                      {onglet.titre} <MdErrorOutline aria-hidden />
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
