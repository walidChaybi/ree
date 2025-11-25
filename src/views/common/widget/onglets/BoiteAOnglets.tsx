import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";

import WithHabilitation from "@util/habilitation/WithHabilitation";
import { NomComposant } from "@util/habilitation/habilitationsDescription";
import React from "react";
import { useNavigate } from "react-router";
import { LinkTab } from "./LinkTab";
import { TabPanel } from "./TabPanel";

interface EnTeteOnglet {
  titre: string;
  url: string;
  nomHabilitation?: NomComposant;
}

interface CorpsOnglet {
  composant: JSX.Element;
  nomHabilitation?: NomComposant;
}

export interface IOngletProps {
  enTete: EnTeteOnglet;
  corps: CorpsOnglet;
}

const TabPanelRequetesDelivranceServiceWithHabilitation = WithHabilitation(TabPanel, "TabPanelRequetesDelivranceService");

const LinkTabRequetesDelivranceServiceWithHabilitation = WithHabilitation(LinkTab, "LinkTabRequetesDelivranceService");

const TabPanelRequetesInfoServiceWithHabilitation = WithHabilitation(TabPanel, "TabPanelRequetesInfoService");

const LinkTabRequetesInfoServiceWithHabilitation = WithHabilitation(LinkTab, "LinkTabRequetesInfoService");

const TabPanelRequetesCreationServiceWithHabilitation = WithHabilitation(TabPanel, "TabPanelRequetesCreationService");

const LinkTabRequetesCreationServiceWithHabilitation = WithHabilitation(LinkTab, "LinkTabRequetesCreationService");

interface IBoiteAOngletsProps {
  onglets: IOngletProps[];
  elementEntreTitreEtContenu?: JSX.Element;
  selectedTab: number;
  titre: string;
  classOngletPrincipale: string;
  classOnglet: string;
}

const a11yProps = (index: any) => {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
};

export const BoiteAOnglets: React.FC<IBoiteAOngletsProps> = props => {
  const [selectedTabState, setSelectedTabState] = React.useState<number>(props.selectedTab);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    navigate(props.onglets[newValue]?.enTete.url);
    setSelectedTabState(newValue);
  };

  return (
    <>
      <AppBar
        position="static"
        className={props.classOngletPrincipale}
      >
        <Tabs
          variant="fullWidth"
          value={selectedTabState}
          onChange={handleChange}
          aria-label={props.titre}
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
                    label={onglet.enTete.titre}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );

              case "LinkTabRequetesInfoService":
                return (
                  <LinkTabRequetesInfoServiceWithHabilitation
                    key={index}
                    label={onglet.enTete.titre}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );

              case "LinkTabRequetesCreationService":
                return (
                  <LinkTabRequetesCreationServiceWithHabilitation
                    key={index}
                    label={onglet.enTete.titre}
                    href={onglet.enTete.url}
                    {...a11yProps(index)}
                  />
                );
              default:
                return (
                  <LinkTab
                    key={index}
                    label={onglet.enTete.titre}
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
              <TabPanel
                value={selectedTabState}
                index={index}
                key={index}
              >
                {onglet.corps.composant}
              </TabPanel>
            );
        }
      })}
    </>
  );
};
