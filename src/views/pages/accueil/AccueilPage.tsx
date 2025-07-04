import { RECEContextData } from "@core/contexts/RECEContext";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faChartBar, faGavel, faLandmark, faPlusCircle, faSearch, faSync } from "@fortawesome/free-solid-svg-icons";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import React, { useContext, useEffect, useState } from "react";
import { useTitreDeLaFenetre } from "../../../hooks/utilitaires/TitreDeLaFenetreHook";
import logoRece from "../../../img/logo-rece.svg";
import "../accueil/scss/AccueilPage.scss";
import { useCompteurRequeteHook } from "../requeteDelivrance/espaceDelivrance/hook/CompteurRequeteHook";
import {
  BoutonAccueilCommunication,
  BoutonAccueilEspaceConsulaire,
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

  const { utilisateurConnecte } = useContext(RECEContextData);

  const nbReqInfoAPI = useNbReqInfoHook([StatutRequete.PRISE_EN_CHARGE.nom, StatutRequete.TRANSFEREE.nom].join(","));
  const nbReqTraiteReponduAPI = useCompteurRequeteHook(false, [StatutRequete.TRAITE_REPONDU.nom]);

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
      <img
        src={logoRece}
        alt="Logo RECE"
      />
      <div className="Titre">{getBienvenueOfficier(utilisateurConnecte)}</div>
      <div className="MenuAccueil">
        <BoutonAccueilEspaceDelivrance
          libelle="Délivrance"
          pageUrl="mesrequetes"
          iconFA={faGavel}
          badge={nbReqTraiteRepondu}
          title="Espace délivrance"
        ></BoutonAccueilEspaceDelivrance>
        <BoutonAccueilEspaceMiseAjour
          libelle="Mise à jour"
          pageUrl="miseAJour"
          iconFA={faSync}
          title="Espace mise à jour"
        ></BoutonAccueilEspaceMiseAjour>
        <BoutonAccueilEspaceCreation
          libelle="Création"
          pageUrl="mesrequetescreation"
          iconFA={faPlusCircle}
          title="Espace création"
        ></BoutonAccueilEspaceCreation>

        <BoutonAccueilEspaceConsulaire
          libelle={"Consulaire"}
          pageUrl={"mes-requetes-consulaire"}
          iconFA={faLandmark}
          title="Espace consulaire"
        ></BoutonAccueilEspaceConsulaire>

        <BoutonAccueilCommunication
          libelle="Communication avec les usagers"
          pageUrl="mesrequetesinformation"
          iconFA={faEnvelope}
          title="Communication avec les usagers"
          badge={nbReqInfo}
        ></BoutonAccueilCommunication>

        <BoutonAccueilRechercheRequete
          libelle="Rechercher une requête"
          pageUrl="rechercherequete"
          iconFA={faSearch}
          title="Recherche d'une requête"
        ></BoutonAccueilRechercheRequete>

        <BoutonAccueilRechercheActeOuInscription
          libelle="Rechercher un acte et une inscription"
          pageUrl="rechercheacteinscription"
          iconFA={faSearch}
          title="Recherche d'un acte et d'une inscription"
        ></BoutonAccueilRechercheActeOuInscription>

        <BoutonAccueilRechercheActe
          libelle="Rechercher un acte"
          pageUrl="rechercheacte"
          iconFA={faSearch}
          title="Recherche d'un acte"
        ></BoutonAccueilRechercheActe>
        <BoutonAccueilTableau
          libelle="Tableau de bord"
          pageUrl="tableau"
          iconFA={faChartBar}
          title="Tableau de bord"
        ></BoutonAccueilTableau>
      </div>
    </div>
  );
};

const getBienvenueOfficier = (officier?: UtilisateurConnecte): string => {
  let msgBienvenue = "Bienvenue";
  if (officier) {
    msgBienvenue = `${msgBienvenue} ${officier.prenomNom}`;
  }
  return msgBienvenue;
};
