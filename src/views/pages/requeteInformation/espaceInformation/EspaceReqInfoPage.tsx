import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { OfficierContext } from "@core/contexts/OfficierContext";
import { IOngletProps } from "@model/IOnglet";
import {
  URL_MES_REQUETES_INFORMATION,
  URL_REQUETES_INFORMATION_SERVICE
} from "@router/ReceUrls";
import { NomComposant } from "@util/habilitation/habilitationsDescription";
import { getLibelle } from "@util/Utils";
import { BoiteAOnglet } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { BoutonPrendreEnChargeAleatoirementInformation } from "./BoutonPrendreEnChargeAleatoirementInformation";
import { StatutsRequetesInformation } from "./EspaceReqInfoParams";
import { MesRequetesInformationPage } from "./MesRequetesInformation";
import { ReqInfoServicePage } from "./ReqInfoServicePage";
import "./scss/EspaceInformationPage.scss";
interface LocalProps {
  selectedTab?: number;
}

const parametresReqInfo = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const getOnglets = (): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes d'information",
        url: URL_MES_REQUETES_INFORMATION
      },
      corps: {
        composant: (
          <MesRequetesInformationPage parametresReqInfo={parametresReqInfo} />
        )
      }
    },
    {
      enTete: {
        titre: "Les requêtes d'information de mon service",
        url: URL_REQUETES_INFORMATION_SERVICE,
        nomHabilitation: "LinkTabRequetesInfoService" as NomComposant
      },
      corps: {
        composant: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />,
        nomHabilitation: "TabPanelRequetesInfoService" as NomComposant
      }
    }
  ];
};

const EspaceInformationPage: React.FC<LocalProps> = ({ selectedTab }) => {
  const selectedTabState = selectedTab || 0;
  return (
    <>
      <title>{getLibelle("Espace information")}</title>
      <div>
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <>
                  {selectedTabState === 0}
                  <BoiteAOnglet
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
                </>
              )}
            </>
          )}
        </OfficierContext.Consumer>
      </div>
    </>
  );
};

export default EspaceInformationPage;
