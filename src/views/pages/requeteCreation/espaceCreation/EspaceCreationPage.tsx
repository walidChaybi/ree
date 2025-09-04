import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoiteAOnglets, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useContext, useState } from "react";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../router/LiensRECE";
import {
  INFO_PAGE_MES_REQUETES_ETABLISSEMENT,
  INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE
} from "../../../../router/infoPages/InfoPagesEspaceEtablissement";
import { BoutonAttribuerRequete } from "./BoutonAttribuerRequete";
import BoutonPrendreEnChargeRequeteSuivanteCreation from "./BoutonPrendreEnChargeRequeteSuivanteCreation";
import { MesRequetesCreation } from "./MesRequetesCreation";
import { RequetesServiceCreation } from "./RequetesServiceCreation";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";

interface LocalProps {
  selectedTab?: number;
}

const queryParametersPourRequetesCreation = {
  statuts: statutsRequetesCreation,
  tri: "alerte",
  sens: "DESC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`,
  sousTypes: Object.values(SousTypeCreation)
    .filter(SousTypeCreation.estSousTypeEtablissement)
    .map(sousType => sousType.nom)
} as IQueryParametersPourRequetes;

const queryParametersPourRequetesCreationService = {
  statuts: statutsRequetesCreation,
  tri: "alerte",
  sens: "DESC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const getBlocBoutons = (selectedTabState: number, setPopinAttribuerAOuvert: Function) => {
  const ouvrirPopinAttribuerA = () => {
    setPopinAttribuerAOuvert(true);
  };

  return (
    <div className="BlocBoutons">
      {selectedTabState === 1 && <BoutonAttribuerRequete onClick={ouvrirPopinAttribuerA} />}
      <BoutonPrendreEnChargeRequeteSuivanteCreation typeRequete={TypeRequete.CREATION} />
    </div>
  );
};

const getOnglets = (popinAttribuerAOuvert: boolean, setPopinAttribuerAOuvert: Function): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes d'établissement",
        url: LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_ETABLISSEMENT.url)
      },
      corps: {
        composant: <MesRequetesCreation queryParametersPourRequetes={queryParametersPourRequetesCreation} />
      }
    },
    {
      enTete: {
        titre: "Les requêtes d'établissement de mon service",
        url: LiensRECE.genererLien(INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE.url),
        nomHabilitation: "LinkTabRequetesCreationService"
      },
      corps: {
        composant: (
          <RequetesServiceCreation
            queryParametersPourRequetes={queryParametersPourRequetesCreationService}
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
  const selectedTabState = selectedTab ?? 0;
  const [popinAttribuerAOuvert, setPopinAttribuerAOuvert] = useState<boolean>(false);

  const { utilisateurs } = useContext(RECEContextData);

  return (
    <div>
      <OperationEnCours visible={!utilisateurs} />
      <BoiteAOnglets
        selectedTab={selectedTabState}
        onglets={getOnglets(popinAttribuerAOuvert, setPopinAttribuerAOuvert)}
        elementEntreTitreEtContenu={getBlocBoutons(selectedTabState, setPopinAttribuerAOuvert)}
        titre="Menu espace création"
        classOnglet="ongletPageEspace"
        classOngletPrincipale="headerOngletPageEspace"
      />
    </div>
  );
};

export default EspaceCreationPage;
