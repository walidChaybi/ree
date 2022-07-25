import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useHistory } from "react-router-dom";
import { IOngletProps } from "../../../../model/IOnglet";
import WithHabilitation from "../../util/habilitation/WithHabilitation";
import { getLibelle } from "../../util/Utils";
import { LinkTab } from "./LinkTab";
import { TabPanel } from "./TabPanel";

const TabPanelRequetesDelivranceServiceWithHabilitation = WithHabilitation(
  TabPanel,
  "TabPanelRequetesDelivranceService"
);

const LinkTabRequetesDelivranceServiceWithHabilitation = WithHabilitation(
  LinkTab,
  "LinkTabRequetesDelivranceService"
);

const TabPanelRequetesInfoServiceWithHabilitation = WithHabilitation(
  TabPanel,
  "TabPanelRequetesInfoService"
);

const LinkTabRequetesInfoServiceWithHabilitation = WithHabilitation(
  LinkTab,
  "LinkTabRequetesInfoService"
);

const TabPanelRequetesCreationServiceWithHabilitation = WithHabilitation(
  TabPanel,
  "TabPanelRequetesCreationService"
);

const LinkTabRequetesCreationServiceWithHabilitation = WithHabilitation(
  LinkTab,
  "LinkTabRequetesCreationService"
);

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
            switch (onglet.enTete.nomHabilitation) {
              case "LinkTabRequetesDelivranceService":
                // On est obligé de créer le composant LinkPanel_XXX_WithHabilitation à l'avance
                // car s'il est créé dynamiquement le composant parent (RequetesServicePage)
                // est démonté et remonté intempestivement plusieurs fois
                return (
                  <LinkTabRequetesDelivranceServiceWithHabilitation
                    key={index}
                    label={getLibelle(onglet.enTete.titre)}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );

              case "LinkTabRequetesInfoService":
                return (
                  <LinkTabRequetesInfoServiceWithHabilitation
                    key={index}
                    label={getLibelle(onglet.enTete.titre)}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );

              case "LinkTabRequetesCreationService":
                return (
                  <LinkTabRequetesCreationServiceWithHabilitation
                    key={index}
                    label={getLibelle(onglet.enTete.titre)}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );
              default:
                return (
                  <LinkTab
                    key={index}
                    label={getLibelle(onglet.enTete.titre)}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );
            }
          })}
        </Tabs>
      </AppBar>

      {props.elementEntreTitreEtContenu}

      {props.onglets.map((onglet, index) => {
        switch (onglet.corps.nomHabilitation) {
          case "TabPanelRequetesDelivranceService":
            // On est obligé de créer le composant TabPanel_XXX_WithHabilitation à l'avance
            // car s'il est créé dynamiquement le composant parent (RequetesServicePage)
            // est démonté et remonté intempestivement plusieurs fois
            return (
              <TabPanelRequetesDelivranceServiceWithHabilitation
                value={selectedTabState}
                index={index}
                key={index}
              >
                {onglet.corps.composant}
              </TabPanelRequetesDelivranceServiceWithHabilitation>
            );
          case "TabPanelRequetesInfoService":
            return (
              <TabPanelRequetesInfoServiceWithHabilitation
                value={selectedTabState}
                index={index}
                key={index}
              >
                {onglet.corps.composant}
              </TabPanelRequetesInfoServiceWithHabilitation>
            );

          case "TabPanelRequetesCreationService":
            return (
              <TabPanelRequetesCreationServiceWithHabilitation
                value={selectedTabState}
                index={index}
                key={index}
              >
                {onglet.corps.composant}
              </TabPanelRequetesCreationServiceWithHabilitation>
            );
          default:
            return (
              <TabPanel value={selectedTabState} index={index} key={index}>
                {onglet.corps.composant}
              </TabPanel>
            );
        }
      })}
    </>
  );
};
