export interface IUrlData {
  url: string;
  data: any;
}

export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_CONTEXT_APP = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_CONTEXT_APP}/accueil`;
// Espace de délivrance
export const URL_MES_REQUETES = `${URL_CONTEXT_APP}/mesrequetes`;
export const URL_REQUETES_SERVICE = `${URL_CONTEXT_APP}/requetesservice`;
// Aperçu requête
export const URL_MES_REQUETES_ID = `${URL_MES_REQUETES}/apercurequete/:idRequete`;
export const URL_REQUETES_SERVICE_ID = `${URL_REQUETES_SERVICE}/apercurequete/:idRequete`;

// Espace de délivrance V2
export const URL_MES_REQUETES_V2 = `${URL_CONTEXT_APP}/mesrequetesv2`;
export const URL_REQUETES_SERVICE_V2 = `${URL_CONTEXT_APP}/requetesservicev2`;

// Aperçu requête V2
export const URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/apercurequetepriseencharge/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_V2}/apercurequetetraitement/:idRequete`;
export const URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_V2}/apercurequetepriseencharge/apercurequetetraitement/:idRequete`;

export const URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/apercurequetepriseencharge/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_SERVICE_V2}/apercurequetetraitement/:idRequete`;
export const URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID = `${URL_REQUETES_SERVICE_V2}/apercurequetepriseencharge/apercurequetetraitement/:idRequete`;

// Détail de la requête
export const URL_MES_REQUETES_DETAIL_REQUETE_ID = `${URL_MES_REQUETES}/apercurequete/detailrequete/:idRequete`;
export const URL_REQUETES_SERVICE_DETAIL_REQUETE_ID = `${URL_REQUETES_SERVICE}/apercurequete/detailrequete/:idRequete`;

// RMC
export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_CONTEXT_APP}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_CONTEXT_APP}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_CONTEXT_APP}/rechercherequete`;
// Saisie requête
export const URL_MES_REQUETES_SAISIR_RDCSC = `${URL_MES_REQUETES}/saisircertificatsituation`;
export const URL_REQUETES_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_SERVICE}/saisircertificatsituation`;
export const URL_MES_REQUETES_SAISIR_RDAPC = `${URL_MES_REQUETES}/saisirattestationpacs`;
export const URL_REQUETES_SERVICE_SAISIR_RDAPC = `${URL_REQUETES_SERVICE}/saisirattestationpacs`;
export const URL_MES_REQUETES_SAISIR_RDC = `${URL_MES_REQUETES}/saisirextraitcopie`;
export const URL_REQUETES_SERVICE_SAISIR_RDC = `${URL_REQUETES_SERVICE}/saisirextraitcopie`;
export const URL_MES_REQUETES_SAISIR_RDLFC = `${URL_MES_REQUETES}/saisirlivretfamille`;
export const URL_REQUETES_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_SERVICE}/saisirlivretfamille`;

// Urls temporaires
export const URL_RC_RCA = `${URL_CONTEXT_APP}/rcrca`;
export const URL_ACTE = `${URL_CONTEXT_APP}/acte`;
