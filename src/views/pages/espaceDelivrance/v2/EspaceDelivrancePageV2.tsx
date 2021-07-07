import React, { useState } from "react";
import { IOngletProps } from "../../../../model/IOnglet";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuRMCAutoHook";
import { NomComposant } from "../../../common/util/habilitation/habilitationsDescription";
import { BoiteAOnglet } from "../../../common/widget/onglets/BoiteAOnglets";
import { getLibelle } from "../../../common/widget/Text";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import {
  URL_MES_REQUETES_V2,
  URL_REQUETES_SERVICE_V2
} from "../../../router/ReceUrls";
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
  const [reloadCompteur, setReloadCompteur] = React.useState<boolean>(true);
  const miseAJourCompteur = () => {
    setReloadCompteur(!reloadCompteur);
  };
  const selectedTabState = selectedTab || 0;

  //**** RMC AUTO ****//
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  useNavigationApercuRMCAuto(paramsRMCAuto);

  const recuperationParamsRMCAuto = (
    idRequete: string,
    dataRequetes: any[],
    urlWithParam: string,
    idx: number
  ) => {
    const requete = dataRequetes[idx];
    setParamsRMCAuto({
      requete,
      dataRequetes,
      urlCourante: urlWithParam
    });
  };

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
