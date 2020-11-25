import React from "react";
import { Title } from "../../core/title/Title";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { RequetesServicePage } from "./RequetesServicePage";
import "./sass/EspaceDelivrancePage.scss";
import { URL_MES_REQUETES, URL_REQUETES_SERVICE } from "../../router/ReceUrls";
import { useHistory } from "react-router-dom";
import { OfficierContext } from "../../core/contexts/OfficierContext";
import { MesRequetesPage } from "./MesRequetesPage";
import { CompteurRequete } from "./contenu/CompteurRequete";
import { getText } from "../../common/widget/Text";
import {
  LinkTabMesRequetesWithHabilitation,
  LinkTabMesRequetes,
  a11yProps
} from "./contenu/LinkTabMesRequetes";
import { TabPanel } from "./contenu/TabPanel";

interface LocalProps {
  selectedTab?: number;
}

const EspaceDelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
  const history = useHistory();
  const [selectedTabState, setSelectedTabState] = React.useState<number>(
    selectedTab || 0
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let targetUri: string = URL_MES_REQUETES;
    if (newValue === 1) {
      targetUri = URL_REQUETES_SERVICE;
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
                      <LinkTabMesRequetes
                        label={getText("pages.delivrance.onglets.mesRequetes")}
                        {...a11yProps(0)}
                      />
                      <LinkTabMesRequetesWithHabilitation
                        label={getText("pages.delivrance.onglets.monService")}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>

                  <TabPanel value={selectedTabState} index={0}>
                    {selectedTabState === 0 && (
                      <MesRequetesPage officier={officier.officierDataState} />
                    )}
                  </TabPanel>
                  <TabPanel value={selectedTabState} index={1}>
                    {selectedTabState === 1 && (
                      <RequetesServicePage
                        officier={officier.officierDataState}
                      />
                    )}
                  </TabPanel>
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
