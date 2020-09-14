import React from "react";
import { Title } from "../../core/title/Title";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { MesRequetesPage } from "./MesRequetesPage";
import { RequetesServicePage } from "./RequetesServicePage";
import "./sass/DelivrancePage.scss";
import { AppUrls } from "../../router/UrlManager";
import { useHistory } from "react-router-dom";
import { OfficierContext } from "../../core/contexts/OfficierContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const paddingBox = 3;

  return (
    <div
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

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

interface LocalProps {
  selectedTab?: number;
}

const DelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
  const history = useHistory();
  const [selectedTabState, setSelectedTabState] = React.useState<number>(
    selectedTab || 0
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let targetUri: string = AppUrls.ctxMesRequetesUrl;
    if (newValue === 1) {
      targetUri = AppUrls.ctxRequetesServiceUrl;
    }
    history.push(targetUri);
    setSelectedTabState(newValue);
  };

  return (
    <>
      <Title titleId={"pages.delivrance.titre"} />
      <div>
        <AppBar position="static" className="headerOngletDelivrance">
          <Tabs
            variant="fullWidth"
            value={selectedTabState}
            onChange={handleChange}
            aria-label="Menu espace délivrance"
            className="ongletDelivrance"
            indicatorColor="primary"
          >
            <LinkTab
              label="Mes requêtes de délivrance"
              href="/mesrequetes"
              {...a11yProps(0)}
            />
            <LinkTab
              label="Requêtes de mon service"
              href="/requetesservice"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={selectedTabState} index={0}>
          {selectedTabState === 0 && (
            <OfficierContext.Consumer>
              {officier => (
                <MesRequetesPage officier={officier?.officierDataState} />
              )}
            </OfficierContext.Consumer>
          )}
        </TabPanel>
        <TabPanel value={selectedTabState} index={1}>
          {selectedTabState === 1 && (
            <OfficierContext.Consumer>
              {officier => (
                <RequetesServicePage officier={officier?.officierDataState} />
              )}
            </OfficierContext.Consumer>
          )}
        </TabPanel>
      </div>
    </>
  );
};

export default DelivrancePage;
