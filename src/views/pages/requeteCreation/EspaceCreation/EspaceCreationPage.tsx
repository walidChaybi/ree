import React from "react";
import { IQueryParametersPourRequetes } from "../../../../api/appels/requeteApi";
import { IOfficier } from "../../../../model/agent/IOfficier";
import { IOngletProps } from "../../../../model/IOnglet";
import { getLibelle } from "../../../common/util/Utils";
import { BoiteAOnglet } from "../../../common/widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { OfficierContext } from "../../../core/contexts/OfficierContext";
import { URL_MES_REQUETES_CREATION } from "../../../router/ReceUrls";
import { StatutsRequetesCreation } from "./EspaceCreationParams";
import { MesRequetesCreationPage } from "./MesRequetesCreation";
import "./scss/EspaceCreationPage.scss";

interface LocalProps {
  selectedTab?: number;
}

const getElementEntreDeux = (selectedTabState: number, officier: IOfficier) => (
  <div className="BlocBoutons"></div>
);

const parametresCreation = {
  statuts: StatutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const getOnglets = (): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de création",
        url: URL_MES_REQUETES_CREATION
      },
      corps: {
        composant: (
          <MesRequetesCreationPage parametresCreation={parametresCreation} />
        )
      }
    }
    /*{
      enTete: {
        titre: "Les requêtes de création de mon service",
        url: URL_REQUETES_CREATION_SERVICE,
        nomHabilitation: "LinkTabRequetesCreationService" as NomComposant
      },
      corps: {
        composant: (
          <RequetesServicePage setParamsRMCAuto={recuperationParamsRMCAuto} />
        ),
        nomHabilitation: "TabPanelRequetesCreationService" as NomComposant
      }
    }*/
  ];
};

const EspaceCreationPage: React.FC<LocalProps> = ({ selectedTab }) => {
  const selectedTabState = selectedTab || 0;

  return (
    <>
      <title>{getLibelle("Espace création")}</title>
      <div>
        <OfficierContext.Consumer>
          {officier => (
            <>
              {officier && officier.officierDataState && (
                <>
                  <BoiteAOnglet
                    selectedTab={selectedTabState}
                    onglets={getOnglets()}
                    elementEntreTitreEtContenu={getElementEntreDeux(
                      selectedTabState,
                      officier.officierDataState
                    )}
                    titre="Menu espace création"
                    classOnglet="ongletCreation"
                    classOngletPrincipale="headerOngletCreation"
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

export default EspaceCreationPage;
