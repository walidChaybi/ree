import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import { getLibelle } from "../../../common/widget/Text";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import {
  IUrlData,
  URL_MES_REQUETES_V2,
  URL_REQUETES_SERVICE_V2
} from "../../../router/ReceUrls";
import { navigationApercu } from "../../apercuRequete/v2/ApercuRequeteUtils";
import {
  IRMCAutoParams,
  useRMCAutoHook
} from "../../rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoHook";
import { CompteurRequete } from "./contenu/CompteurRequeteV2";
import {
  LinkTabMesRequetes,
  LinkTabMesRequetesDeServiceWithHabilitation
} from "./contenu/LinkTabMesRequetesV2";
import MenuSaisirRequete from "./contenu/MenuSaisirRequeteV2";
import { MesRequetesPageV2 } from "./MesRequetesPageV2";
import { RequetesServicePageV2 } from "./RequetesServicePageV2";
import "./scss/EspaceDelivrancePageV2.scss";

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
      className="TabPanelV2"
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

interface LocalProps {
  selectedTab?: number;
}

const EspaceDelivrancePageV2: React.FC<LocalProps> = ({ selectedTab }) => {
  const history = useHistory();
  const [selectedTabState, setSelectedTabState] = React.useState<number>(
    selectedTab || 0
  );

  const [reloadCompteur, setReloadCompteur] = React.useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let targetUri: string = URL_MES_REQUETES_V2;
    if (newValue === 1) {
      targetUri = URL_REQUETES_SERVICE_V2;
    }
    history.push(targetUri);
    setSelectedTabState(newValue);
  };

  const miseAJourCompteur = () => {
    setReloadCompteur(!reloadCompteur);
  };

  //**** RMC AUTO ****//
  const [paramsRMCAuto, setParamsRMCAuto] = useState<IRMCAutoParams>(
    {} as IRMCAutoParams
  );

  const recuperationParamsRMCAuto = (
    idRequete: string,
    dataRequetes: any[],
    urlWithParam: string,
    idx: number
  ) => {
    const navigation = navigationApercu(urlWithParam, dataRequetes, idx);
    if (navigation.isRmcAuto) {
      setParamsRMCAuto({
        idRequete,
        dataRequetes,
        urlWithParam
      });
    } else if (navigation.url) {
      history.push(navigation.url, dataRequetes);
    }
  };

  const rmcAutoUrlData: IUrlData = useRMCAutoHook(paramsRMCAuto);

  useEffect(() => {
    if (rmcAutoUrlData.url && rmcAutoUrlData.data) {
      history.push(rmcAutoUrlData.url, rmcAutoUrlData.data);
    }
  }, [rmcAutoUrlData, history]);

  return (
    <>
      <title>{getLibelle("Espace délivrance")}</title>
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
                      aria-label={getLibelle("Menu espace délivrance")}
                      className="ongletDelivrance"
                      indicatorColor="primary"
                    >
                      <LinkTabMesRequetes
                        label={getLibelle("Mes requêtes de délivrance")}
                        {...a11yProps(0)}
                      />
                      <LinkTabMesRequetesDeServiceWithHabilitation
                        label={getLibelle("Requêtes de mon service")}
                        href={URL_REQUETES_SERVICE_V2}
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </AppBar>

                  <div className="BlocBoutons">
                    <MenuSaisirRequete indexTabPanel={selectedTabState} />
                  </div>

                  <TabPanel value={selectedTabState} index={0}>
                    {selectedTabState === 0 && (
                      <MesRequetesPageV2
                        miseAJourCompteur={miseAJourCompteur}
                        setParamsRMCAuto={recuperationParamsRMCAuto}
                      />
                    )}
                  </TabPanel>

                  <TabPanelWithHabilitation value={selectedTabState} index={1}>
                    {selectedTabState === 1 && (
                      <RequetesServicePageV2
                        setParamsRMCAuto={recuperationParamsRMCAuto}
                      />
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

export default EspaceDelivrancePageV2;
