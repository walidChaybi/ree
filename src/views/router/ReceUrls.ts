import {
  getUrlParamId,
  getUrlPrecedente,
  getUrlWithoutIdParam,
  URL_SEPARATEUR
} from "../common/util/route/routeUtil";

export interface IUrlData {
  url: string;
  data: any;
}

export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_CONTEXT_APP = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_CONTEXT_APP}/accueil`;

// Espace de délivrance V1
export const URL_MES_REQUETES = `${URL_CONTEXT_APP}/mesrequetes`;
export const URL_REQUETES_SERVICE = `${URL_CONTEXT_APP}/requetesservice`;

// Aperçu requête V1
export const URL_MES_REQUETES_ID = `${URL_MES_REQUETES}/apercurequete/:idRequete`;
export const URL_REQUETES_SERVICE_ID = `${URL_REQUETES_SERVICE}/apercurequete/:idRequete`;

// Détail de la requête d'une requete d'un des tableau de l'espace délivrance V1
export const URL_MES_REQUETES_DETAIL_REQUETE_ID = `${URL_MES_REQUETES}/apercurequete/detailrequete/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID = `${URL_REQUETES_SERVICE}/apercurequete/detailrequete/:idRequete`;

///////////// VERSION 2 //////////////

///////////// CHEMINS  //////////////
export const PATH_APERCU_REQUETE_TRAITEMENT = "apercurequetetraitement";

///////////// URLs    //////////////
// Espace de délivrance V2
export const URL_MES_REQUETES_V2 = `${URL_CONTEXT_APP}/mesrequetesv2`;
export const URL_REQUETES_SERVICE_V2 = `${URL_CONTEXT_APP}/requetesservicev2`;

// Aperçu requête ... V2 depuis le tableau Mes Requêtes de délivrance
export const URL_MES_REQUETES_APERCU_REQUETE = `${URL_MES_REQUETES_V2}/apercurequete/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/apercurequetepriseencharge/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/apercurequetepriseencharge/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;

// Aperçu requête ... V2 depuis le tableau Requêtes de mon service
export const URL_REQUETES_SERVICE_APERCU_REQUETE = `${URL_REQUETES_SERVICE_V2}/apercurequete/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/apercurequetepriseencharge/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_V2}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/
                                                                apercurequetepriseencharge/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
// Détail de la requête d'une requete d'un des tableau de l'espace délivrance
export const URL_MES_REQUETES_DETAIL_REQUETE_ID_V2 = `${URL_MES_REQUETES_V2}/apercurequete/detailrequete/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID_V2 = `${URL_REQUETES_SERVICE_V2}/apercurequete/detailrequete/:idRequete`;

// Rechercher Multi-Critères
export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_CONTEXT_APP}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_CONTEXT_APP}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_CONTEXT_APP}/rechercherequete`;

// Aperçu requête ... V2 depuis le tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE = `${URL_RECHERCHE_REQUETE}/apercurequete/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/apercurequetepriseencharge/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/
                                                                apercurequetepriseencharge/${PATH_APERCU_REQUETE_TRAITEMENT}/:idRequete`;
// Détail de la requête d'une requete du tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_DETAIL_REQUETE_ID = `${URL_RECHERCHE_REQUETE}/apercurequete/detailrequete/:idRequete`;

// Saisie requête
export const URL_MES_REQUETES_SAISIR_RDCSC = `${URL_MES_REQUETES_V2}/saisircertificatsituation`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_SERVICE_V2}/saisircertificatsituation`;
export const URL_MES_REQUETES_SAISIR_RDAPC = `${URL_MES_REQUETES_V2}/saisirattestationpacs`;
export const URL_REQUETES_SERVICE_SAISIR_RDAPC = `${URL_REQUETES_SERVICE_V2}/saisirattestationpacs`;
export const URL_MES_REQUETES_SAISIR_RDC = `${URL_MES_REQUETES_V2}/saisirextraitcopie`;
export const URL_REQUETES_SERVICE_SAISIR_RDC = `${URL_REQUETES_SERVICE_V2}/saisirextraitcopie`;
export const URL_MES_REQUETES_SAISIR_RDLFC = `${URL_MES_REQUETES_V2}/saisirlivretfamille`;
export const URL_REQUETES_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_SERVICE_V2}/saisirlivretfamille`;

// Aperçu requête ... V2 après saisie de requête
export const URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE = `${URL_MES_REQUETES_SAISIR_RDCSC}/apercurequete/:idRequete`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE = `${URL_REQUETES_SERVICE_SAISIR_RDCSC}/apercurequete/:idRequete`;

function estUrlApercuRequete(url: string) {
  const urlWithoutIdParam = getUrlWithoutIdParam(url);
  return (
    URL_MES_REQUETES_APERCU_REQUETE.startsWith(urlWithoutIdParam) ||
    URL_REQUETES_SERVICE_APERCU_REQUETE.startsWith(urlWithoutIdParam) ||
    URL_RECHERCHE_REQUETE_APERCU_REQUETE.startsWith(urlWithoutIdParam)
  );
}

function getUrlApercuTraitementAPartirDe(url: string) {
  const id = getUrlParamId(url);
  return `${getUrlPrecedente(
    url
  )}${URL_SEPARATEUR}${PATH_APERCU_REQUETE_TRAITEMENT}${URL_SEPARATEUR}${id}`;
}

export const receUrl = {
  estUrlApercuRequete,
  getUrlApercuTraitementAPartirDe
};
