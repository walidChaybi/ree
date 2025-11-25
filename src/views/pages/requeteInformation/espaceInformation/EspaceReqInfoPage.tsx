import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { BoiteAOnglets, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { TableauMesRequetesInformation } from "../../../../composants/pages/requetesInformation/mesRequetes/TableauMesRequetesInformation";
import LiensRECE from "../../../../router/LiensRECE";
import {
  INFO_PAGE_MES_REQUETES_INFORMATION,
  INFO_PAGE_REQUETES_INFORMATION_SERVICE
} from "../../../../router/infoPages/InfoPagesEspaceInformation";
import BoutonPrendreEnChargeAleatoirementInformation from "./BoutonPrendreEnChargeAleatoirementInformation";
import { StatutsRequetesInformation } from "./EspaceReqInfoParams";
import { ReqInfoServicePage } from "./ReqInfoServicePage";
import "./scss/EspaceInformationPage.scss";

interface IEspaceInformationPageProps {
  selectedTab?: number;
}

const parametresReqInfo: IQueryParametersPourRequetes = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
};

const getOnglets = (): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes d'information",
        url: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_INFORMATION.url)
      },
      corps: {
        composant: <TableauMesRequetesInformation />
      }
    },
    {
      enTete: {
        titre: "Les requêtes d'information de mon service",
        url: LiensRECE.genererLien(INFO_PAGE_REQUETES_INFORMATION_SERVICE.url),
        nomHabilitation: "LinkTabRequetesInfoService"
      },
      corps: {
        composant: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />,
        nomHabilitation: "TabPanelRequetesInfoService"
      }
    }
  ];
};

const EspaceInformationPage: React.FC<IEspaceInformationPageProps> = ({ selectedTab }) => {
  const selectedTabState = selectedTab ?? 0;

  return (
    <div>
      {selectedTabState === 0}
      <BoiteAOnglets
        selectedTab={selectedTabState}
        onglets={getOnglets()}
        elementEntreTitreEtContenu={
          <div className="EspaceInformationPage">
            <div className="BoutonPrendreEnChargeAleatoirementRequeteInformation">
              <BoutonPrendreEnChargeAleatoirementInformation />
            </div>
          </div>
        }
        titre="Menu espace requête d'information"
        classOnglet="ongletPageEspace"
        classOngletPrincipale="headerOngletPageEspace"
      />
      <BoutonRetour />
    </div>
  );
};

export default EspaceInformationPage;
