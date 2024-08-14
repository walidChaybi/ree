import { RECEContext } from "@core/contexts/RECEContext";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import {
  INavigationApercuRMCAutoParams,
  useNavigationApercuRMCAutoDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_REQUETES_DELIVRANCE_SERVICE
} from "@router/ReceUrls";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { NomComposant } from "@util/habilitation/habilitationsDescription";
import { BoiteAOnglets, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import React, { useCallback, useContext, useState } from "react";
import { MesRequetesPage } from "./MesRequetesPage";
import { RequetesServicePage } from "./RequetesServicePage";
import BoutonPrendreEnChargeAleatoirement from "./contenu/BoutonPrendreEnChargeAleatoirement";
import { CompteurRequete } from "./contenu/CompteurRequete";
import MenuSaisirRequete from "./contenu/MenuSaisirRequete";
import "./scss/EspaceDelivrancePage.scss";

interface LocalProps {
  selectedTab?: number;
}

const getElementEntreDeux = (selectedTabState: number, officier: IOfficier) => {
  return (
    <>
      {gestionnaireFeatureFlag.auMoinUnEstActif(
        FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES,
        FeatureFlag.FF_DELIV_CS
      ) && (
        <div className="BlocBoutons">
          <MenuSaisirRequete indexTabPanel={selectedTabState} />
          <BoutonPrendreEnChargeAleatoirement
            typeRequete={TypeRequete.DELIVRANCE}
          />
        </div>
      )}
    </>
  );
};

const getOnglets = (
  miseAJourCompteur: () => void,
  recuperationParamsRMCAuto: (
    idRequete: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string,
    pasDeTraitementAuto: boolean
  ) => void
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
            setParamsRMCAuto={recuperationParamsRMCAuto}
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
        composant: (
          <RequetesServicePage setParamsRMCAuto={recuperationParamsRMCAuto} />
        ),
        nomHabilitation: "TabPanelRequetesDelivranceService" as NomComposant
      }
    }
  ];
};

const EspaceDelivrancePage: React.FC<LocalProps> = ({ selectedTab }) => {
  const [toggleReloadCompteur, setToggleReloadCompteur] =
    React.useState<boolean>(true);

  const { infosLoginOfficier } = useContext(RECEContext);

  const miseAJourCompteur = () => {
    setToggleReloadCompteur(!toggleReloadCompteur);
  };
  const selectedTabState = selectedTab || 0;

  //**** RMC AUTO ****//
  const [paramsRMCAuto, setParamsRMCAuto] = useState<
    INavigationApercuRMCAutoParams | undefined
  >();
  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  const recuperationParamsRMCAuto = useCallback(
    (
      idRequete: string,
      requete: IRequeteTableauDelivrance,
      urlWithParam: string,
      pasDeTraitementAuto: boolean = false
    ) => {
      setParamsRMCAuto({
        requete,
        urlCourante: urlWithParam,
        pasDeTraitementAuto
      });
    },
    []
  );

  useTitreDeLaFenetre("Délivrance");

  return (
    <div>
      {infosLoginOfficier?.officierDataState && (
        <>
          {selectedTabState === 0 && (
            <CompteurRequete reloadCompteur={toggleReloadCompteur} />
          )}
          <BoiteAOnglets
            selectedTab={selectedTabState}
            onglets={getOnglets(miseAJourCompteur, recuperationParamsRMCAuto)}
            elementEntreTitreEtContenu={getElementEntreDeux(
              selectedTabState,
              infosLoginOfficier.officierDataState
            )}
            titre="Menu espace délivrance"
            classOnglet="ongletPageEspace"
            classOngletPrincipale="headerOngletPageEspace"
          />
        </>
      )}
    </div>
  );
};

export default EspaceDelivrancePage;
