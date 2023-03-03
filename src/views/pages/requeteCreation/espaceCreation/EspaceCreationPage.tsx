import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { OfficierContext } from "@core/contexts/OfficierContext";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  URL_MES_REQUETES_CREATION,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { getLibelle } from "@util/Utils";
import { BoiteAOnglet, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useState } from "react";
import { BoutonAttribuerRequete } from "./BoutonAttribuerRequete";
import BoutonPrendreEnChargePlusAncienneCreation from "./BoutonPrendreEnChargePlusAncienneCreation";
import MenuSaisirRequeteCreation from "./contenu/MenuSaisirRequeteCreation";
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

const getBlocBoutons = (
  selectedTabState: number,
  setPopinAttribuerAOuvert: Function
) => {
  const ouvrirPopinAttribuerA = () => {
    setPopinAttribuerAOuvert(true);
  };

  return (
    <div className="BlocBoutons">
      <MenuSaisirRequeteCreation indexTabPanel={selectedTabState} />
      {selectedTabState === 1 && (
        <BoutonAttribuerRequete onClick={ouvrirPopinAttribuerA} />
      )}
      <BoutonPrendreEnChargePlusAncienneCreation
        typeRequete={TypeRequete.CREATION}
      />
    </div>
  );
};

const getOnglets = (
  popinAttribuerAOuvert: boolean,
  setPopinAttribuerAOuvert: Function
): IOngletProps[] => {
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
            popinAttribuerAOuvert={popinAttribuerAOuvert}
            setPopinAttribuerAOuvert={setPopinAttribuerAOuvert}
          />
        ),
        nomHabilitation: "TabPanelRequetesCreationService"
      }
    }
  ];
};

const EspaceCreationPage: React.FC<LocalProps> = ({ selectedTab }) => {
  const selectedTabState = selectedTab || 0;
  const [popinAttribuerAOuvert, setPopinAttribuerAOuvert] =
    useState<boolean>(false);

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
                    onglets={getOnglets(
                      popinAttribuerAOuvert,
                      setPopinAttribuerAOuvert
                    )}
                    elementEntreTitreEtContenu={getBlocBoutons(
                      selectedTabState,
                      setPopinAttribuerAOuvert
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
