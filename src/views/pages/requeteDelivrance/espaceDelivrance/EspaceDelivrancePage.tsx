import { RECEContextData } from "@core/contexts/RECEContext";
import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_DELIVRANCE, URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { NomComposant } from "@util/habilitation/habilitationsDescription";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoiteAOnglets, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import React, { useCallback, useContext, useState } from "react";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import { MesRequetesPage } from "./MesRequetesPage";
import { RequetesServicePage } from "./RequetesServicePage";
import BoutonPrendreEnChargeAleatoirement from "./contenu/BoutonPrendreEnChargeAleatoirement";
import { CompteurRequete } from "./contenu/CompteurRequete";
import MenuSaisirRequete from "./contenu/MenuSaisirRequete";
import "./scss/EspaceDelivrancePage.scss";

interface LocalProps {
  selectedTab?: number;
}

const getElementEntreDeux = (selectedTabState: number) => {
  return (
    <>
      {gestionnaireFeatureFlag.auMoinUnEstActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES, FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION) && (
        <div className="BlocBoutons">
          <MenuSaisirRequete indexTabPanel={selectedTabState} />
          <BoutonPrendreEnChargeAleatoirement typeRequete={TypeRequete.DELIVRANCE} />
        </div>
      )}
    </>
  );
};

const getOnglets = (
  miseAJourCompteur: () => void,
  setNavigationApercuDelivranceParams: (requete: IRequeteTableauDelivrance, urlWithParam: string) => void
): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de délivrance",
        url: URL_MES_REQUETES_DELIVRANCE
      },
      corps: {
        composant: (
          <MesRequetesPage
            miseAJourCompteur={miseAJourCompteur}
            setNavigationApercuDelivranceParams={setNavigationApercuDelivranceParams}
          />
        )
      }
    },
    {
      enTete: {
        titre: "Les requêtes de délivrance de mon service",
        url: URL_REQUETES_DELIVRANCE_SERVICE,
        nomHabilitation: "LinkTabRequetesDelivranceService" as NomComposant
      },
      corps: {
        composant: <RequetesServicePage setNavigationApercuDelivranceParams={setNavigationApercuDelivranceParams} />,
        nomHabilitation: "TabPanelRequetesDelivranceService" as NomComposant
      }
    }
  ];
};

const EspaceDelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
  const [toggleReloadCompteur, setToggleReloadCompteur] = useState<boolean>(true);

  const { decrets } = useContext(RECEContextData);

  const miseAJourCompteur = () => {
    setToggleReloadCompteur(!toggleReloadCompteur);
  };
  const selectedTabState = selectedTab ?? 0;

  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);

  const recuperationParamsRMCAuto = useCallback((requete: IRequeteTableauDelivrance, urlWithParam: string) => {
    setNavigationApercuDelivranceParams({
      requete,
      urlCourante: urlWithParam
    });
  }, []);

  useTitreDeLaFenetre("Délivrance");

  return (
    <div>
      <OperationEnCours visible={!decrets} />
      {selectedTabState === 0 && <CompteurRequete reloadCompteur={toggleReloadCompteur} />}
      <BoiteAOnglets
        selectedTab={selectedTabState}
        onglets={getOnglets(miseAJourCompteur, recuperationParamsRMCAuto)}
        elementEntreTitreEtContenu={getElementEntreDeux(selectedTabState)}
        titre="Menu espace délivrance"
        classOnglet="ongletPageEspace"
        classOngletPrincipale="headerOngletPageEspace"
      />
    </div>
  );
};

export default EspaceDelivrancePage;
