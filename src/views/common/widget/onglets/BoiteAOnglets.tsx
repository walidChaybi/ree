import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useHistory } from "react-router-dom";
import { IOngletProps } from "../../../../model/IOnglet";
import WithHabilitation from "../../util/habilitation/WithHabilitation";
import { getLibelle } from "../../util/Utils";
import { LinkTab } from "./LinkTab";
import { TabPanel } from "./TabPanel";

const TabPanelMesRequetesWithHabilitation = WithHabilitation(
  TabPanel,
  "TabPanelMesRequetes"
);

const LinkTabMesRequeteWithHabilitation = WithHabilitation(
  LinkTab,
  "LinkTabMesRequetes"
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
              case "LinkTabMesRequetes":
                // On est obligé de créer le composant LinkPanel_XXX_WithHabilitation à l'avance
                // car s'il est créé dynamiquement le composant parent (RequetesServicePage)
                // est démonté et remonté intempestivement plusieurs fois
                return (
                  <LinkTabMesRequeteWithHabilitation
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
          case "TabPanelMesRequetes":
            // On est obligé de créer le composant TabPanel_XXX_WithHabilitation à l'avance
            // car s'il est créé dynamiquement le composant parent (RequetesServicePage)
            // est démonté et remonté intempestivement plusieurs fois
            return (
              <TabPanelMesRequetesWithHabilitation
                value={selectedTabState}
                index={index}
                key={index}
              >
                {onglet.corps.composant}
              </TabPanelMesRequetesWithHabilitation>
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
