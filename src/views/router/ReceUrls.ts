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

const ID = ":idRequeteParam";

///////////// CHEMINS  //////////////
export const PATH_APERCU_REQ_DEL = "apercurequetedelivrance";
export const PATH_APERCU_REQ_PRISE = "apercurequetepriseencharge";
export const PATH_APERCU_REQ_TRAITEMENT = "apercurequetetraitement";
export const PATH_APERCU_REQ_INFO = "apercurequeteinformation";
export const PATH_EDITION = "edition";
export const PATH_SAISIR_RDCSC = "saisircertificatsituation";
export const PATH_SAISIR_RDAPC = "saisirattestationpacs";
export const PATH_SAISIR_RDC = "saisirextraitcopie";
export const PATH_SAISIR_RDLFC = "saisirlivretfamille";

///////////// URLs    //////////////
export const GO_BACK = "goBack";
export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_CONTEXT_APP = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_CONTEXT_APP}/accueil`;

////////////////////////////////////////////
///// MES REQUETES DE DELIVRANCE (MRD) /////
////////////////////////////////////////////
export const URL_MES_REQUETES_DELIVRANCE = `${URL_CONTEXT_APP}/mesrequetes`;

// Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_EDITION_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${ID}/:idActeParam?`;

// Saisie requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDCSC}`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDAPC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDAPC}`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDC}`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDLFC}`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC}/:idRequete`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC}/:idRequete`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDAPC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDAPC}/:idRequete`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC}/:idRequete`;

/////////////////////////////////////////////////////
///// REQUETES DE DELIVRANCE MON SERVICE (RDMS) /////
/////////////////////////////////////////////////////
export const URL_REQUETES_DELIVRANCE_SERVICE = `${URL_CONTEXT_APP}/requetesservice`;

// Aperçu requête ... depuis le tableau Requêtes de mon SERVICE
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_EDITION_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_EDITION}/${ID}/:idActeParam?`;

// Saisie requête ... depuis Mes Requêtes de SERVICE
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisircertificatsituation`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDAPC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisirattestationpacs`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisirextraitcopie`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisirlivretfamille`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes service de DELIVRANCE
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC}/:idRequete`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDAPC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDAPC}/:idRequete`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC}/:idRequete`;

//////////////////////////////////////////
///// RECHERCHE MULTI-CRITERES (RMC) /////
//////////////////////////////////////////
export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_CONTEXT_APP}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_CONTEXT_APP}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_CONTEXT_APP}/rechercherequete`;

// Aperçu requête ... depuis le tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_RECHERCHE_REQUETE_EDITION_ID = `${URL_RECHERCHE_REQUETE}/${PATH_EDITION}/${ID}/:idActeParam?`;

// Modification Brouillon dans Saisie RDCSC depuis RMC de DELIVRANCE
export const URL_SAISIR_RDCSC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDCSC}/${ID}`;
export const URL_SAISIR_RDC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDC}/${ID}`;
export const URL_SAISIR_RDAPC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDAPC}/${ID}`;
export const URL_SAISIR_RDLFC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDLFC}/${ID}`;

/////////////////////////////////////////
///////// REQUETE D'INFORMATION (RI)) /////////
/////////////////////////////////////////
// Espace requête d'information
export const URL_MES_REQUETES_INFORMATION = `${URL_CONTEXT_APP}/mesrequetesinformation`;

// Aperçu d'une requête d'information
export const URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID = `${URL_MES_REQUETES_INFORMATION}/${PATH_APERCU_REQ_INFO}/${ID}`;

// Aperçu d'une requête d'information depuis RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_INFO}/${ID}`;

///////////////////////////////////////////////////////////////
///////// REQUETE D'INFORMATION DE MON SERVICE (RIMS) /////////
///////////////////////////////////////////////////////////////
// Espace requête d'information
export const URL_REQUETES_INFORMATION_SERVICE = `${URL_CONTEXT_APP}/requetesinformationservice`;

// Aperçu d'une requête d'information
export const URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID = `${URL_REQUETES_INFORMATION_SERVICE}/${PATH_APERCU_REQ_INFO}/${ID}`;

function estUrlApercuRequete(url: string) {
  return url.indexOf(`/${PATH_APERCU_REQ_DEL}/`) > 0;
}

function estUrlApercuTraitementRequete(url: string) {
  return url.indexOf(`/${PATH_APERCU_REQ_TRAITEMENT}/`) > 0;
}

function estUrlSaisirCourrier(url: string) {
  return (
    url.indexOf(`/${PATH_SAISIR_RDCSC}`) > 0 ||
    url.indexOf(`/${PATH_SAISIR_RDAPC}`) > 0 ||
    url.indexOf(`/${PATH_SAISIR_RDC}`) > 0 ||
    url.indexOf(`/${PATH_SAISIR_RDLFC}`) > 0
  );
}

function estUrlEdition(url: string) {
  return url.indexOf(`/${PATH_EDITION}`) > 0;
}

function getUrlApercuTraitementAPartirDe(url: string, idRequeteParam?: string) {
  const id = idRequeteParam || getUrlParamId(url);
  return `${getUrlPrecedente(
    url
  )}${URL_SEPARATEUR}${PATH_APERCU_REQ_TRAITEMENT}${URL_SEPARATEUR}${id}`;
}

function replaceUrl(history: any, url: string, data?: any) {
  gestionnaireNavigation.deleteLastUrl();
  history.replace(url, data);
}

function goBack(history: any) {
  gestionnaireNavigation.deleteLastUrl();
  history.goBack();
}

function goBackBack(history: any) {
  gestionnaireNavigation.deleteLastUrl();
  history.goBack();
  history.goBack();
}

function getUrlCourante(history: any): string {
  return history.location.pathname; // history.location.pathname renvoie une url du type /rece/rece-ui/xxx
}

export const receUrl = {
  estUrlApercuRequete,
  estUrlApercuTraitementRequete,
  getUrlApercuTraitementAPartirDe,
  estUrlSaisirCourrier,
  estUrlEdition,
  replaceUrl,
  goBack,
  goBackBack,
  getUrlCourante
};
