import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { OfficierContext } from "@core/contexts/OfficierContext";
import { IOfficier } from "@model/agent/IOfficier";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  URL_MES_REQUETES_CREATION,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { BoiteAOnglet, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import BoutonPrendreEnChargePlusAncienneCreation from "./BoutonPrendreEnChargePlusAncienneCreation";
import { MesRequetesCreation } from "./MesRequetesCreation";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { RequetesServiceCreation } from "./RequetesServiceCreation";

interface LocalProps {
  selectedTab?: number;
}

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const getElementEntreDeux = (selectedTabState: number, officier: IOfficier) => (
  <div className="BlocBoutons">
    <BoutonPrendreEnChargePlusAncienneCreation
      typeRequete={TypeRequete.CREATION}
    />
  </div>
);

const getOnglets = (): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de création",
        url: URL_MES_REQUETES_CREATION
      },
      corps: {
        composant: (
          <MesRequetesCreation
            queryParametersPourRequetes={queryParametersPourRequetes}
          />
        )
      }
    },
    {
      enTete: {
        titre: "Les requêtes de création de mon service",
        url: URL_REQUETES_CREATION_SERVICE,
        nomHabilitation: "LinkTabRequetesCreationService"
      },
      corps: {
        composant: (
          <RequetesServiceCreation
            queryParametersPourRequetes={queryParametersPourRequetes}
          />
        ),
        nomHabilitation: "TabPanelRequetesCreationService"
      }
    }
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

export default EspaceCreationPage;
