import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_CREATION, URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoiteAOnglets, IOngletProps } from "@widget/onglets/BoiteAOnglets";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useContext, useState } from "react";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import { BoutonAttribuerRequete } from "./BoutonAttribuerRequete";
import BoutonPrendreEnChargeRequeteSuivanteCreation from "./BoutonPrendreEnChargeRequeteSuivanteCreation";
import { MesRequetesCreation } from "./MesRequetesCreation";
import { RequetesServiceCreation } from "./RequetesServiceCreation";
import MenuSaisirRequeteCreation from "./contenu/MenuSaisirRequeteCreation";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";

interface LocalProps {
  selectedTab?: number;
}

const queryParametersPourRequetesCreation = {
  statuts: statutsRequetesCreation,
  tri: "alerte",
  sens: "DESC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
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
      <MenuSaisirRequeteCreation indexTabPanel={selectedTabState} />
      {selectedTabState === 1 && <BoutonAttribuerRequete onClick={ouvrirPopinAttribuerA} />}
      <BoutonPrendreEnChargeRequeteSuivanteCreation typeRequete={TypeRequete.CREATION} />
    </div>
  );
};

const getOnglets = (popinAttribuerAOuvert: boolean, setPopinAttribuerAOuvert: Function): IOngletProps[] => {
  return [
    {
      enTete: {
        titre: "Mes requêtes de création",
        url: URL_MES_REQUETES_CREATION
      },
      corps: {
        composant: <MesRequetesCreation queryParametersPourRequetes={queryParametersPourRequetesCreation} />
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
  const selectedTabState = selectedTab || 0;
  const [popinAttribuerAOuvert, setPopinAttribuerAOuvert] = useState<boolean>(false);

  const { utilisateurConnecte, utilisateurs } = useContext(RECEContextData);

  useTitreDeLaFenetre("Espace création");

  return (
    <div>
      {utilisateurConnecte && (
        <>
          <OperationEnCours visible={!utilisateurs} />
          <BoiteAOnglets
            selectedTab={selectedTabState}
            onglets={getOnglets(popinAttribuerAOuvert, setPopinAttribuerAOuvert)}
            elementEntreTitreEtContenu={getBlocBoutons(selectedTabState, setPopinAttribuerAOuvert)}
            titre="Menu espace création"
            classOnglet="ongletPageEspace"
            classOngletPrincipale="headerOngletPageEspace"
          />
        </>
      )}
    </div>
  );
};

export default EspaceCreationPage;
