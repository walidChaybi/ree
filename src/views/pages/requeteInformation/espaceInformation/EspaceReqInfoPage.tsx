import React from "react";
import { IQueryParametersPourRequetes } from "../../../../api/appels/requeteApi";
import { IOngletProps } from "../../../../model/IOnglet";
import { NomComposant } from "../../../common/util/habilitation/habilitationsDescription";
import { getLibelle } from "../../../common/util/Utils";
import { BoiteAOnglet } from "../../../common/widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import {
  URL_MES_REQUETES_INFORMATION,
  URL_REQUETES_INFORMATION_SERVICE
} from "../../../router/ReceUrls";
import { BoutonPrendreEnChargeAleatoirementRequeteInformation } from "./BoutonPrendreEnChargeAleatoirementRequeteInformation";
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
        nomHabilitation: "LinkTabMesRequetesInfo" as NomComposant
      },
      corps: {
        composant: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />,
        nomHabilitation: "TabPanelMesRequetesInfo" as NomComposant
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
                          <BoutonPrendreEnChargeAleatoirementRequeteInformation />
                        </div>
                      </div>
                    }
                    titre="Menu espace requête d'information"
                    classOnglet="ongletInformation"
                    classOngletPrincipale="headerOngletInformation"
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
