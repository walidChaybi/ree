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
export const PATH_APERCU_REQUETE = "apercurequete";
export const PATH_APERCU_REQUETE_PRISE = "apercurequetepriseencharge";
export const PATH_APERCU_REQUETE_TRAITEMENT = "apercurequetetraitement";
export const PATH_DETAIL_REQUETE = "detailrequete";

///////////// URLs    //////////////
export const GO_BACK = "goBack";
export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_CONTEXT_APP = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_CONTEXT_APP}/accueil`;

// Espace de délivrance V1
export const URL_MES_REQUETES = `${URL_CONTEXT_APP}/mesrequetes`;
export const URL_REQUETES_SERVICE = `${URL_CONTEXT_APP}/requetesservice`;

// Aperçu requête V1
export const URL_MES_REQUETES_ID = `${URL_MES_REQUETES}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_ID = `${URL_REQUETES_SERVICE}/${PATH_APERCU_REQUETE}/:idRequete`;

// Détail de la requête d'une requete d'un des tableau de l'espace délivrance V1
export const URL_MES_REQUETES_DETAIL_REQUETE_ID = `${URL_MES_REQUETES}/${PATH_APERCU_REQUETE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID = `${URL_REQUETES_SERVICE}/${PATH_APERCU_REQUETE}/${PATH_DETAIL_REQUETE}/:idRequete`;

///////////// VERSION 2 //////////////
// Espace de délivrance V2
export const URL_MES_REQUETES_V2 = `${URL_CONTEXT_APP}/mesrequetesv2`;
export const URL_REQUETES_SERVICE_V2 = `${URL_CONTEXT_APP}/requetesservicev2`;

// Aperçu requête ... V2 depuis le tableau Mes Requêtes de délivrance
export const URL_MES_REQUETES_APERCU_REQUETE = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE_PRISE}/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;

// Aperçu requête ... V2 depuis le tableau Requêtes de mon service
export const URL_REQUETES_SERVICE_APERCU_REQUETE = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE_PRISE}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;

// Détail de la requête d'une requete d'un des tableau de l'espace délivrance
export const URL_MES_REQUETES_DETAIL_REQUETE_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_MES_REQUETES_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE_PRISE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE_PRISE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_MES_REQUETES_DETAIL_REQUETE_TRAITEMENT_ID_V2 = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_TRAITEMENT_ID_V2 = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/${PATH_DETAIL_REQUETE}/:idRequete`;

// Rechercher Multi-Critères
export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_CONTEXT_APP}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_CONTEXT_APP}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_CONTEXT_APP}/rechercherequete`;

// Aperçu requête ... V2 depuis le tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE_PRISE}/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;

// Détail de la requête d'une requete du tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE_PRISE}/${PATH_DETAIL_REQUETE}/:idRequete`;
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE_TRAITEMENT}/${PATH_DETAIL_REQUETE}/:idRequete`;

// Saisie requête
export const URL_MES_REQUETES_SAISIR_RDCSC = `${URL_MES_REQUETES_V2}/saisircertificatsituation`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_SERVICE_V2}/saisircertificatsituation`;
export const URL_MES_REQUETES_SAISIR_RDAPC = `${URL_MES_REQUETES_V2}/saisirattestationpacs`;
export const URL_REQUETES_SERVICE_SAISIR_RDAPC = `${URL_REQUETES_SERVICE_V2}/saisirattestationpacs`;
export const URL_MES_REQUETES_SAISIR_RDC = `${URL_MES_REQUETES_V2}/saisirextraitcopie`;
export const URL_REQUETES_SERVICE_SAISIR_RDC = `${URL_REQUETES_SERVICE_V2}/saisirextraitcopie`;
export const URL_MES_REQUETES_SAISIR_RDLFC = `${URL_MES_REQUETES_V2}/saisirlivretfamille`;
export const URL_REQUETES_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_SERVICE_V2}/saisirlivretfamille`;

// Aperçu requête ... V2 après saisie de requête RDCSC
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQUETE}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_I = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQUETE_PRISE}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_I = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQUETE_PRISE}/:idRequete`;
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_SAISIR_RDCSC}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;

function estUrlApercuRequete(url: string) {
  return url.indexOf(`/${PATH_APERCU_REQUETE}/`) > 0;
}

function getUrlApercuTraitementAPartirDe(url: string) {
  const id = getUrlParamId(url);
  return `${getUrlPrecedente(
    url
  )}${URL_SEPARATEUR}${PATH_APERCU_REQUETE_TRAITEMENT}${URL_SEPARATEUR}${id}`;
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
  getUrlApercuTraitementAPartirDe,
  replaceUrl,
  getUrlCourante
};
