import {
  getUrlParamId,
  getUrlPrecedente,
  URL_SEPARATEUR
} from "../common/util/route/routeUtil";
import { gestionnaireNavigation } from "../common/widget/filAriane/FilAriane";

export interface IUrlData {
  url: string;
  data?: any;
}

///////////// CHEMINS  //////////////
export const PATH_APERCU_REQ = "apercurequete";
export const PATH_APERCU_REQ_PRISE = "apercurequetepriseencharge";
export const PATH_APERCU_REQ_TRAITEMENT = "apercurequetetraitement";
export const PATH_APERCU_COURRIER_ACCOMPAGNEMENT =
  "apercucourrieraccompagnement";
export const PATH_DETAIL_REQ = "detailrequete";

///////////// URLs    //////////////
export const GO_BACK = "goBack";
export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_CONTEXT_APP = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_CONTEXT_APP}/accueil`;

/************* VERSION 1 ************/
// Espace de délivrance
export const URL_MES_REQUETES = `${URL_CONTEXT_APP}/mesrequetes`;
export const URL_REQUETES_SERVICE = `${URL_CONTEXT_APP}/requetesservice`;

// Aperçu requête
export const URL_MES_REQUETES_ID = `${URL_MES_REQUETES}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_ID = `${URL_REQUETES_SERVICE}/${PATH_APERCU_REQ}/:idRequete`;

// Détail de la requête d'une requete d'un des tableau de l'espace délivrance
export const URL_MES_REQUETES_DETAIL_REQUETE_ID = `${URL_MES_REQUETES}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID = `${URL_REQUETES_SERVICE}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;

/************* VERSION 2 ************/

////////////////////////////////////////////
///// MES REQUETES DE DELIVRANCE (MRD) /////
////////////////////////////////////////////
export const URL_MES_REQUETES_V2 = `${URL_CONTEXT_APP}/mesrequetesv2`;

// Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_APERCU_REQUETE = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DETAIL_REQUETE_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_DETAIL_REQUETE_TRAITEMENT_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Saisie requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_SAISIR_RDCSC = `${URL_MES_REQUETES_V2}/saisircertificatsituation`;
export const URL_MES_REQUETES_SAISIR_RDAPC = `${URL_MES_REQUETES_V2}/saisirattestationpacs`;
export const URL_MES_REQUETES_SAISIR_RDC = `${URL_MES_REQUETES_V2}/saisirextraitcopie`;
export const URL_MES_REQUETES_SAISIR_RDLFC = `${URL_MES_REQUETES_V2}/saisirlivretfamille`;

// Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes de DELIVRANCE
export const URL_SAISIR_RDCSC_MES_REQUETES = `${URL_MES_REQUETES_SAISIR_RDCSC}/:idRequete`;

// Modification courrier accompagnement depuis apercu
export const URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_PRISE}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;
export const URL_MES_REQUETES_APERCU_TRAITEMENT_COURRIER = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;
export const URL_MES_REQUETES_EXTRAIT_COPIE_COURRIER = `${URL_MES_REQUETES_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;

/////////////////////////////////////////
///// REQUETES DE MON SERVICE (RMS) /////
/////////////////////////////////////////
export const URL_REQUETES_SERVICE_V2 = `${URL_CONTEXT_APP}/requetesservicev2`;

// Aperçu requête ... V2 depuis le tableau Requêtes de mon SERVICE
export const URL_REQUETES_SERVICE_APERCU_REQUETE = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_TRAITEMENT_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Saisie requête ... depuis Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_SERVICE_V2}/saisircertificatsituation`;
export const URL_REQUETES_SERVICE_SAISIR_RDAPC = `${URL_REQUETES_SERVICE_V2}/saisirattestationpacs`;
export const URL_REQUETES_SERVICE_SAISIR_RDC = `${URL_REQUETES_SERVICE_V2}/saisirextraitcopie`;
export const URL_REQUETES_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_SERVICE_V2}/saisirlivretfamille`;

// Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

// Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de SERVICE
export const URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes service de DELIVRANCE
export const URL_SAISIR_RDCSC_MES_REQUETES_SERVICE = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/:idRequete`;

// Modification courrier accompagnement depuis apercu
export const URL_REQUETES_SERVICE_APERCU_PRISE_EN_CHARGE_COURRIER = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_PRISE}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_TRAITEMENT_COURRIER = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;
export const URL_REQUETES_SERVICE_EXTRAIT_COPIE_COURRIER = `${URL_REQUETES_SERVICE_SAISIR_RDC}/${PATH_APERCU_REQ_PRISE}/${PATH_APERCU_COURRIER_ACCOMPAGNEMENT}/:idRequete`;

//////////////////////////////////////////
///// RECHERCHE MULTI-CRITERES (RMC) /////
//////////////////////////////////////////
export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_CONTEXT_APP}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_CONTEXT_APP}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_CONTEXT_APP}/rechercherequete`;

// Aperçu requête ... depuis le tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ}/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_PRISE}/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRAITEMENT}/:idRequete`;

//  Détail d'une requête depuis une page Aperçu requête ... après RMC Requêtes
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_PRISE}/${PATH_DETAIL_REQ}/:idRequete`;
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRAITEMENT}/${PATH_DETAIL_REQ}/:idRequete`;

// Modification Brouillon dans Saisie RDCSC depuis RMC de DELIVRANCE
export const URL_SAISIR_RDCSC_RMC = `${URL_RECHERCHE_REQUETE}/saisircertificatsituation/:idRequete`;

function estUrlApercuRequete(url: string) {
  return url.indexOf(`/${PATH_APERCU_REQ}/`) > 0;
}

function estUrlApercuTraitementRequete(url: string) {
  return url.indexOf(`/${PATH_APERCU_REQ_TRAITEMENT}/`) > 0;
}

function getUrlApercuTraitementAPartirDe(url: string) {
  const id = getUrlParamId(url);
  return `${getUrlPrecedente(
    url
  )}${URL_SEPARATEUR}${PATH_APERCU_REQ_TRAITEMENT}${URL_SEPARATEUR}${id}`;
}

function replaceUrl(history: any, url: string, data?: any) {
  gestionnaireNavigation.deleteLastUrl();
  history.replace(url, data);
}

function getUrlCourante(history: any) {
  return history.location.pathname; // history.location.pathname renvoie une url du type /rece/rece-ui/xxx
}

export const receUrl = {
  estUrlApercuRequete,
  estUrlApercuTraitementRequete,
  getUrlApercuTraitementAPartirDe,
  replaceUrl,
  getUrlCourante
};
