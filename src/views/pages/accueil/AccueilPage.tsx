import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faGavel,
  faPlusCircle,
  faSearch,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import logoRece from "../../../img/logo-rece.svg";
import { IOfficier } from "../../../model/agent/IOfficier";
import { getLibelle } from "../../common/util/Utils";
import {
  OfficierContext,
  OfficierContextProps
} from "../../core/contexts/OfficierContext";
import "../accueil/scss/AccueilPage.scss";
import {
  BoutonAccueilCommunication,
  BoutonAccueilEspaceCreation,
  BoutonAccueilEspaceDelivrance,
  BoutonAccueilEspaceMiseAjour,
  BoutonAccueilRechercheActe,
  BoutonAccueilRechercheActeOuInscription,
  BoutonAccueilRechercheRequete,
  BoutonAccueilTableau
} from "./BoutonAccueil";

export const AccueilPage: React.FC = () => {
  return (
    <div className="AccueilPage">
      <title>{getLibelle("Accueil")}</title>

      <img src={logoRece} alt={getLibelle("Logo RECE")} />
      <OfficierContext.Consumer>
        {officier => (
          <>
            <div className="Titre">
              {getBienvenueOfficier(officier?.officierDataState)}
            </div>
            <div className="Affectation">{getAffectation(officier)}</div>
          </>
        )}
      </OfficierContext.Consumer>
      <div className="MenuAccueil">
        <BoutonAccueilEspaceDelivrance
          libelle={getLibelle("Espace délivrance")}
          pageUrl="mesrequetes"
          iconFA={faGavel}
          title={getLibelle("Bouton pour accèder à l'espace délivrance")}
        ></BoutonAccueilEspaceDelivrance>
        <BoutonAccueilEspaceMiseAjour
          libelle={getLibelle("Espace mise à jour")}
          pageUrl="miseAJour"
          iconFA={faSync}
          title={getLibelle("Bouton pour accèder à l'espace mise à jour")}
        ></BoutonAccueilEspaceMiseAjour>
        <BoutonAccueilEspaceCreation
          libelle={getLibelle("Espace création")}
          pageUrl="creation"
          iconFA={faPlusCircle}
          title={getLibelle("Bouton pour accèder à l'espace création")}
        ></BoutonAccueilEspaceCreation>
        <BoutonAccueilCommunication
          libelle={getLibelle("Communication avec les usagers")}
          pageUrl="mesrequetesinformation"
          iconFA={faEnvelope}
          title={getLibelle(
            "Bouton pour accèder à la communication avec les usagers"
          )}
        ></BoutonAccueilCommunication>
        <BoutonAccueilRechercheRequete
          libelle={getLibelle("Rechercher une requête")}
          pageUrl="rechercherequete"
          iconFA={faSearch}
          title={getLibelle("Bouton pour accèder à la recherche d'une requête")}
        ></BoutonAccueilRechercheRequete>
        <BoutonAccueilRechercheActeOuInscription
          libelle={getLibelle("Rechercher un acte et une inscription")}
          pageUrl="rechercheacteinscription"
          iconFA={faSearch}
          title={getLibelle(
            "Bouton pour accèder à la recherche d'un acte et d'une inscription"
          )}
        ></BoutonAccueilRechercheActeOuInscription>
        <BoutonAccueilRechercheActe
          libelle={getLibelle("Rechercher un acte")}
          pageUrl="rechercheacte"
          iconFA={faSearch}
          title={getLibelle("Bouton pour accèder à la recherche d'un acte")}
        ></BoutonAccueilRechercheActe>
        <BoutonAccueilTableau
          libelle={getLibelle("Tableau de bord")}
          pageUrl="tableau"
          iconFA={faChartBar}
          title={getLibelle("Bouton pour accèder au tableau de bord")}
        ></BoutonAccueilTableau>
      </div>
    </div>
  );
};

function getBienvenueOfficier(officier?: IOfficier): string {
  let msgBienvenue = "Bienvenue";
  if (officier) {
    msgBienvenue = `${msgBienvenue} ${officier.prenom} ${officier.nom} - ${officier.trigramme}`;
  }
  return getLibelle(msgBienvenue);
}

function getAffectation(officier?: OfficierContextProps): string {
  const hierarchie = getHierarchie(officier);
  let buildHierarchie = "";
  if (hierarchie.length > 0) {
    buildHierarchie = hierarchie.join(" - ");
  }
  return getLibelle(buildHierarchie);
}

function getHierarchie(officier?: OfficierContextProps): string[] {
  const hierarchie: string[] = [];
  const officierData = officier?.officierDataState;

  if (officier !== undefined && officierData !== undefined) {
    pushIfExists(officierData.ministere, hierarchie);
    pushIfExists(officierData.poste, hierarchie);
    pushIfExists(officierData.service, hierarchie);
    pushIfExists(officierData.departement, hierarchie);
    pushIfExists(officierData.sectionConsulaire, hierarchie);
    pushIfExists(officierData.bureau, hierarchie);
    pushIfExists(officierData.section, hierarchie);
  }

  return hierarchie;
}

function pushIfExists(entite: string, table: string[]) {
  if (entite) {
    table.push(entite);
  }
}
