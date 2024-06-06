import {
  OfficierContext,
  OfficierContextProps
} from "@core/contexts/OfficierContext";
import { useTitreDeLaFenetre } from "@core/document/TitreDeLaFenetreHook";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faGavel,
  faPlusCircle,
  faSearch,
  faSync
} from "@fortawesome/free-solid-svg-icons";
import { IOfficier } from "@model/agent/IOfficier";
import { getCodesHierarchieService } from "@model/agent/IUtilisateur";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getLibelle } from "@util/Utils";
import React, { useEffect, useState } from "react";
import logoRece from "../../../img/logo-rece.svg";
import "../accueil/scss/AccueilPage.scss";
import { useCompteurRequeteHook } from "../requeteDelivrance/espaceDelivrance/hook/CompteurRequeteHook";
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
import { useNbReqInfoHook } from "./hook/NbReqInfoHook";

export const AccueilPage: React.FC = () => {
  const [nbReqInfo, setNbReqInfo] = useState<number>();
  const [nbReqTraiteRepondu, setNbReqTraiteRepondu] = useState<number>();
  const nbReqInfoAPI = useNbReqInfoHook(
    [StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.TRANSFEREE.nom].join(",")
  );
  const nbReqTraiteReponduAPI = useCompteurRequeteHook(false, [
    StatutRequete.TRAITE_REPONDU.nom
  ]);

  useEffect(() => {
    if (nbReqInfoAPI) {
      setNbReqInfo(nbReqInfoAPI);
    }
  }, [nbReqInfoAPI]);

  useEffect(() => {
    if (nbReqTraiteReponduAPI) {
      setNbReqTraiteRepondu(nbReqTraiteReponduAPI.nombreRequetesState);
    }
  }, [nbReqTraiteReponduAPI]);

  useTitreDeLaFenetre("Accueil");

  return (
    <div className="AccueilPage">
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
          libelle={getLibelle("Délivrance")}
          pageUrl="mesrequetes"
          iconFA={faGavel}
          badge={nbReqTraiteRepondu}
          title={getLibelle("Bouton pour accèder à l'espace délivrance")}
        ></BoutonAccueilEspaceDelivrance>
        <BoutonAccueilEspaceMiseAjour
          libelle={getLibelle("Mise à jour")}
          pageUrl="miseAJour"
          iconFA={faSync}
          title={getLibelle("Bouton pour accèder à l'espace mise à jour")}
        ></BoutonAccueilEspaceMiseAjour>
        <BoutonAccueilEspaceCreation
          libelle={getLibelle("Création")}
          pageUrl="mesrequetescreation"
          iconFA={faPlusCircle}
          title={getLibelle("Bouton pour accèder à l'espace création")}
        ></BoutonAccueilEspaceCreation>

        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION) && (
          <BoutonAccueilCommunication
            libelle={getLibelle("Communication avec les usagers")}
            pageUrl="mesrequetesinformation"
            iconFA={faEnvelope}
            title={getLibelle(
              "Bouton pour accèder à la communication avec les usagers"
            )}
            badge={nbReqInfo}
          ></BoutonAccueilCommunication>
        )}
        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT) && (
          <>
            <BoutonAccueilRechercheRequete
              libelle={getLibelle("Rechercher une requête")}
              pageUrl="rechercherequete"
              iconFA={faSearch}
              title={getLibelle(
                "Bouton pour accèder à la recherche d'une requête"
              )}
            ></BoutonAccueilRechercheRequete>

            <BoutonAccueilRechercheActeOuInscription
              libelle={getLibelle("Rechercher un acte et une inscription")}
              pageUrl="rechercheacteinscription"
              iconFA={faSearch}
              title={getLibelle(
                "Bouton pour accèder à la recherche d'un acte et d'une inscription"
              )}
            ></BoutonAccueilRechercheActeOuInscription>
          </>
        )}
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
    msgBienvenue = `${msgBienvenue} ${officier.prenom} ${officier.nom}`;
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
  const serviceOfficier = officier?.officierDataState?.service;

  if (serviceOfficier) {
    hierarchie.push(...getCodesHierarchieService(serviceOfficier));
  }

  return hierarchie;
}
