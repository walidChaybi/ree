import React from "react";
import { Title } from "../../core/title/Title";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import { RequetesServicePage } from "./RequetesServicePage";
import "./scss/EspaceDelivrancePage.scss";
import { useHistory } from "react-router-dom";
import { OfficierContext } from "../../core/contexts/OfficierContext";
import { MesRequetesPage } from "./MesRequetesPage";
import { CompteurRequete } from "./contenu/CompteurRequete";
import { getText } from "../../common/widget/Text";
import { URL_MES_REQUETES, URL_REQUETES_SERVICE } from "../../router/ReceUrls";
import { getUrlWithParam } from "../../common/util/route/routeUtil";
import MenuSaisirRequete from "./contenu/MenuSaisirRequete";
import {
  LinkTabMesRequetesDeServiceWithHabilitation,
  LinkTabMesRequetes
} from "./contenu/LinkTabMesRequetes";
import WithHabilitation from "../../common/util/habilitation/WithHabilitation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const paddingBox = 3;

  return (
    <div
      className="TabPanel"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={paddingBox}>{children}</Box>}
    </div>
  );
}

export const TabPanelWithHabilitation = WithHabilitation(
  TabPanel,
  "TabPanelMesRequetes"
);

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
  disabled?: boolean;
}

interface LocalProps {
  selectedTab?: number;
}

const EspaceDelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
  const history = useHistory();
  const [selectedTabState, setSelectedTabState] = React.useState<number>(
    selectedTab || 0
  );

  const [reloadCompteur, setReloadCompteur] = React.useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let targetUri: string = URL_MES_REQUETES;
    if (newValue === 1) {
      targetUri = URL_REQUETES_SERVICE;
    }
    history.push(targetUri);
    setSelectedTabState(newValue);
  };

  const miseAJourCompteur = () => {
    setReloadCompteur(!reloadCompteur);
  };

  const getUrlBack = (
    identifiantRequete: string,
    data: any,
    urlWithParam: string
  ) => {
    if (identifiantRequete && data) {
      const url = getUrlWithParam(urlWithParam, identifiantRequete);
      history.push(url, {
        data
      });
    }
  };

  return (
    <>
      <Title titleId={"pages.delivrance.titre"} />
      <div>
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <>
                  {selectedTabState === 0 && (
                    <CompteurRequete reloadCompteur={reloadCompteur} />
                  )}
                  <AppBar position="static" className="headerOngletDelivrance">
                    <Tabs
                      variant="fullWidth"
                      value={selectedTabState}
                      onChange={handleChange}
                      aria-label={getText("pages.delivrance.onglets.menu")}
                      className="ongletDelivrance"
                      indicatorColor="primary"
                    >
                      <LinkTabMesRequetes
                        label={getText("pages.delivrance.onglets.mesRequetes")}
                        {...a11yProps(0)}
                      />
                      <LinkTabMesRequetesDeServiceWithHabilitation
                        label={getText("pages.delivrance.onglets.monService")}
                        href={URL_REQUETES_SERVICE}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>

                  <div className="BlocBoutons">
                    <MenuSaisirRequete indexTabPanel={selectedTabState} />
                  </div>

                  <TabPanel value={selectedTabState} index={0}>
                    {selectedTabState === 0 && (
                      <MesRequetesPage
                        miseAJourCompteur={miseAJourCompteur}
                        getUrlBack={getUrlBack}
                      />
                    )}
                  </TabPanel>

                  <TabPanelWithHabilitation value={selectedTabState} index={1}>
                    {selectedTabState === 1 && (
                      <RequetesServicePage getUrlBack={getUrlBack} />
                    )}
                  </TabPanelWithHabilitation>
                </>
              )}
            </>
          )}
        </OfficierContext.Consumer>
      </div>
    </>
  );
};

export default EspaceDelivrancePage;
