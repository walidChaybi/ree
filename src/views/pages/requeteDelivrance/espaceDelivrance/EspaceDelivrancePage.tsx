import React, { useCallback, useState } from "react";
import { IOfficier } from "../../../../model/agent/IOfficier";
import { IOngletProps } from "../../../../model/IOnglet";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAuto
} from "../../../common/hook/navigationApercuRequeteRmcAuto/NavigationApercuRMCAutoHook";
import { NomComposant } from "../../../common/util/habilitation/habilitationsDescription";
import { getLibelle } from "../../../common/util/Utils";
import { BoiteAOnglet } from "../../../common/widget/onglets/BoiteAOnglets";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import {
  URL_MES_REQUETES,
  URL_REQUETES_SERVICE
} from "../../../router/ReceUrls";
import BoutonPrendreEnChargeAleatoirement from "./contenu/BoutonPrendreEnChargeAleatoirement";
import { CompteurRequete } from "./contenu/CompteurRequete";
import MenuSaisirRequete from "./contenu/MenuSaisirRequete";
import { MesRequetesPage } from "./MesRequetesPage";
import { RequetesServicePage } from "./RequetesServicePage";
import "./scss/EspaceDelivrancePage.scss";

interface LocalProps {
  selectedTab?: number;
}

const getElementEntreDeux = (selectedTabState: number, officier: IOfficier) => (
  <div className="BlocBoutons">
    <MenuSaisirRequete indexTabPanel={selectedTabState} />
    <BoutonPrendreEnChargeAleatoirement />
  </div>
);

const getOnglets = (
  miseAJourCompteur: () => void,
  recuperationParamsRMCAuto: (
    idRequete: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string
  ) => void
): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de délivrance",
        url: URL_MES_REQUETES
      },
      corps: {
        composant: (
          <MesRequetesPage
            miseAJourCompteur={miseAJourCompteur}
            setParamsRMCAuto={recuperationParamsRMCAuto}
          />
        )
      }
    },
    {
      enTete: {
        titre: "Requêtes de mon service",
        url: URL_REQUETES_SERVICE,
        nomHabilitation: "LinkTabMesRequetes" as NomComposant
      },
      corps: {
        composant: (
          <RequetesServicePage setParamsRMCAuto={recuperationParamsRMCAuto} />
        ),
        nomHabilitation: "TabPanelMesRequetes" as NomComposant
      }
    }
  ];
};

const EspaceDelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
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

  const recuperationParamsRMCAuto = useCallback(
    (
      idRequete: string,
      requete: IRequeteTableauDelivrance,
      urlWithParam: string
    ) => {
      setParamsRMCAuto({
        requete,
        urlCourante: urlWithParam
      });
    },
    []
  );

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
                      selectedTabState,
                      officier.officierDataState
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

export default EspaceDelivrancePage;
