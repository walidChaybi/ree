import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IOngletProps } from "../../../../model/IOnglet";
import { NomComposant } from "../../../common/util/habilitation/habilitationsDescription";
import { BoiteAOnglet } from "../../../common/widget/onglets/BoiteAOnglets";
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
import MenuSaisirRequete from "./contenu/MenuSaisirRequeteV2";
import { MesRequetesPageV2 } from "./MesRequetesPageV2";
import { RequetesServicePageV2 } from "./RequetesServicePageV2";
import "./scss/EspaceDelivrancePageV2.scss";

interface LocalProps {
  selectedTab?: number;
}

const getElementEntreDeux = (selectedTabState: number) => (
  <div className="BlocBoutons">
    <MenuSaisirRequete indexTabPanel={selectedTabState} />
  </div>
);

const getOnglets = (
  miseAJourCompteur: () => void,
  recuperationParamsRMCAuto: (
    idRequete: string,
    dataRequetes: any[],
    urlWithParam: string,
    idx: number
  ) => void
): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de délivrance",
        url: URL_MES_REQUETES_V2
      },
      corps: {
        composant: (
          <MesRequetesPageV2
            miseAJourCompteur={miseAJourCompteur}
            setParamsRMCAuto={recuperationParamsRMCAuto}
          />
        )
      }
    },
    {
      enTete: {
        titre: "Requêtes de mon service",
        url: URL_REQUETES_SERVICE_V2,
        nomHabilitation: "LinkTabMesRequetes" as NomComposant
      },
      corps: {
        composant: (
          <RequetesServicePageV2 setParamsRMCAuto={recuperationParamsRMCAuto} />
        ),
        nomHabilitation: "TabPanelMesRequetes" as NomComposant
      }
    }
  ];
};

const EspaceDelivrancePageV2: React.FC<LocalProps> = ({ selectedTab }) => {
  const history = useHistory();
  const [reloadCompteur, setReloadCompteur] = React.useState<boolean>(true);
  const miseAJourCompteur = () => {
    setReloadCompteur(!reloadCompteur);
  };
  const selectedTabState = selectedTab || 0;

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
    const requete = dataRequetes[idx];
    const navigation = navigationApercu(urlWithParam, requete);
    if (navigation.isRmcAuto) {
      setParamsRMCAuto({
        requete,
        dataRequetes,
        urlCourante: urlWithParam
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
                  <BoiteAOnglet
                    selectedTab={selectedTabState}
                    onglets={getOnglets(
                      miseAJourCompteur,
                      recuperationParamsRMCAuto
                    )}
                    elementEntreTitreEtContenu={getElementEntreDeux(
                      selectedTabState
                    )}
                    titre="Menu espace délivrance"
                    classOnglet="ongletDelivrance"
                    classOngletPrincipale="headerOngletDelivrance"
                  />
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
