import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useHistory } from "react-router-dom";
import { IOngletProps } from "../../../../model/IOnglet";
import WithHabilitation from "../../util/habilitation/WithHabilitation";
import { getLibelle } from "../Text";
import { LinkTab } from "./LinkTabV2";
import { TabPanel } from "./TabPanel";

export interface IBoiteAOngletsProps {
  onglets: IOngletProps[];
  elementEntreTitreEtContenu?: JSX.Element;
  selectedTab: number;
  titre: string;
  classOngletPrincipale: string;
  classOnglet: string;
}

export function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

export const BoiteAOnglet: React.FC<IBoiteAOngletsProps> = props => {
  const history = useHistory();
  const [selectedTabState, setSelectedTabState] = React.useState<number>(
    props.selectedTab
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    history.push(props.onglets[newValue]?.enTete.url);
    setSelectedTabState(newValue);
  };

  return (
    <>
      <AppBar position="static" className={props.classOngletPrincipale}>
        <Tabs
          variant="fullWidth"
          value={selectedTabState}
          onChange={handleChange}
          aria-label={getLibelle(props.titre)}
          className={props.classOnglet}
          indicatorColor="primary"
        >
          {props.onglets.map((onglet, index) => {
            const LinkTabWithHabilitation = WithHabilitation(
              LinkTab,
              onglet.enTete.nomHabilitation!
            );
            return onglet.enTete.nomHabilitation ? (
              <LinkTabWithHabilitation
                key={index}
                label={getLibelle(onglet.enTete.titre)}
                href={onglet.enTete.url}
                {...a11yProps(index)}
              />
            ) : (
              <LinkTab
                key={index}
                label={getLibelle(onglet.enTete.titre)}
                href={onglet.enTete.url}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>

      {props.elementEntreTitreEtContenu}

      {props.onglets.map((onglet, index) => {
        const TabPanelWithHabilitation = WithHabilitation(
          TabPanel,
          onglet.corps.nomHabilitation!
        );
        return onglet.corps.nomHabilitation ? (
          <TabPanelWithHabilitation
            value={selectedTabState}
            index={index}
            key={index}
          >
            {onglet.corps.composant}
          </TabPanelWithHabilitation>
        ) : (
          <TabPanel value={selectedTabState} index={index} key={index}>
            {onglet.corps.composant}
          </TabPanel>
        );
      })}
    </>
  );
};
