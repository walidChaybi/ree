import React from "react";
import { Title } from "../../core/title/Title";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { RequetesServicePage } from "./RequetesServicePage";
import "./sass/RequetesPage.scss";
import { AppUrls } from "../../router/UrlManager";
import { useHistory } from "react-router-dom";
import { OfficierContext } from "../../core/contexts/OfficierContext";
import { MesRequetesDelivrancePage } from "./MesRequetesDelivrancePage";
import { CompteurRequete } from "./contenu/CompteurRequete";
import { getText } from "../../common/widget/Text";
import { Droit } from "../../../model/Droit";
import { officierHabiliter } from "../../common/util/Habilitation";

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
  disabled?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
      className={props.disabled ? "tab-disabled" : ""}
    />
  );
}

interface LocalProps {
  selectedTab?: number;
}

const RequetesPage: React.FC<LocalProps> = ({ selectedTab }) => {
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
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <>
                  {selectedTabState === 0 && (
                    <CompteurRequete officier={officier.officierDataState} />
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
                      <LinkTab
                        label={getText("pages.delivrance.onglets.mesRequetes")}
                        href={AppUrls.MesRequetesUrl}
                        {...a11yProps(0)}
                      />
                      <LinkTab
                        label={getText("pages.delivrance.onglets.monService")}
                        href={AppUrls.RequetesServiceUrl}
                        {...a11yProps(1)}
                        disabled={
                          !officierHabiliter(
                            officier.officierDataState,
                            Droit.Attribuer
                          )
                        }
                      />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={selectedTabState} index={0}>
                    {selectedTabState === 0 && (
                      <MesRequetesDelivrancePage
                        officier={officier.officierDataState}
                      />
                    )}
                  </TabPanel>
                  {officierHabiliter(
                    officier.officierDataState,
                    Droit.Attribuer
                  ) && (
                    <TabPanel value={selectedTabState} index={1}>
                      {selectedTabState === 1 && (
                        <RequetesServicePage
                          officier={officier.officierDataState}
                        />
                      )}
                    </TabPanel>
                  )}
                </>
              )}
            </>
          )}
        </OfficierContext.Consumer>
      </div>
    </>
  );
};

export default RequetesPage;
