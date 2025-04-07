import { getUrlParamId, getUrlPrecedente, URL_SEPARATEUR } from "@util/route/UrlUtil";

export const ID = ":idRequeteParam";
export const ID_ACTE = ":idActeParam";
export const ID_SUIVI_DOSSIER = ":idSuiviDossierParam";

///////////// CHEMINS  //////////////
export const PATH_APERCU_REQ_DEL = "apercurequetedelivrance";
export const PATH_APERCU_REQ_PRISE = "apercurequetepriseencharge";
export const PATH_APERCU_REQ_TRAITEMENT = "apercurequetetraitement";
export const PATH_APERCU_REQ_INFO = "apercurequeteinformation";
export const PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE = "apercurequetecreationetablissementsimple";
export const PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER = "apercurequetecreationetablissementsuividossier";
export const PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET = "apercurequetecreationetablissementsaisieprojet";
export const PATH_APERCU_REQUETE_CREATION_ETABLISSEMENT_ACTE_REGISTRE = "apercurequetecreationetablissementacteregistre";
export const PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE = "apercurequetetranscriptionsimple";
export const PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE = "apercurequetetranscriptionenpriseencharge";
export const PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET = "apercurequetetranscriptionensaisieprojet";
export const PATH_EDITION = "Edition";
export const PATH_SAISIR_RDCSC = "saisircertificatsituation";
export const PATH_SAISIR_RDC = "saisirextraitcopie";
export const PATH_SAISIR_RCTC = "saisir-requete-transcription";
export const PATH_SAISIR_RDLFC = "saisirlivretfamille";
export const PATH_MODIFIER_RDC = "modifierextraitcopie";
export const PATH_MODIFIER_RDCSC = "modifiercertificatsituation";
export const PATH_MODIFIER_RCTC = "modifiercreation";
export const PATH_APERCU_REQ_MISE_A_JOUR_SUITE_AVIS = "requetemiseajoursuiteavis";
export const PATH_APERCU_REQ_MISE_A_JOUR_AUTRE = "requetemiseajourautre";
export const PATH_APERCU_REQ_MISE_A_JOUR_ANALYSE_MARGINALE = "requete-mise-a-jour-analyse-marginale";

///////////// URLs    //////////////
export const GO_BACK = "goBack";
export const URL_DECONNEXION = "/rece/Shibboleth.sso/Logout";

export const URL_BASE = "/rece/rece-ui";
export const URL_ACCUEIL = `${URL_BASE}/`;

////////////////////////////////////////////
///// MES REQUETES DE DELIVRANCE (MRD) /////
////////////////////////////////////////////
export const URL_MES_REQUETES_DELIVRANCE = `${URL_BASE}/mesrequetes`;

// Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_EDITION_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${ID}/${ID_ACTE}?`;

// Saisie requête ... depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDCSC}`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDC}`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_SAISIR_RDLFC}`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC}/:idRequete`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC}/:idRequete`;
export const URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC_ID = `${URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC}/:idRequete`;

// Modification requête ... depuis Aperçu requête de DELIVRANCE
export const URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_MODIFIER_RDC}/${ID}`;
export const URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID = `${URL_MES_REQUETES_DELIVRANCE}/${PATH_MODIFIER_RDCSC}/${ID}`;

/////////////////////////////////////////////////////
///// REQUETES DE DELIVRANCE MON SERVICE (RDMS) /////
/////////////////////////////////////////////////////
export const URL_REQUETES_DELIVRANCE_SERVICE = `${URL_BASE}/requetesservice`;

// Aperçu requête ... depuis le tableau Requêtes de mon SERVICE
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_EDITION_ID = `${URL_REQUETES_DELIVRANCE_SERVICE}/${PATH_EDITION}/${ID}/${ID_ACTE}?`;

// Saisie requête ... depuis Mes Requêtes de SERVICE
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisircertificatsituation`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisirextraitcopie`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC = `${URL_REQUETES_DELIVRANCE_SERVICE}/saisirlivretfamille`;

// Modification Brouillon dans Saisie RDCSC depuis Mes Requêtes service de DELIVRANCE
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC}/${ID}`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC}/:idRequete`;
export const URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC_ID = `${URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC}/:idRequete`;

//////////////////////////////////////////
///// RECHERCHE MULTI-CRITERES (RMC) /////
//////////////////////////////////////////

export const URL_RECHERCHE_ACTE_INSCRIPTION = `${URL_BASE}/rechercheacteinscription`;
export const URL_RECHERCHE_ACTE = `${URL_BASE}/rechercheacte`;
export const URL_RECHERCHE_REQUETE = `${URL_BASE}/rechercherequete`;

// Aperçu requête ... depuis le tableau résultats RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_DEL}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_PRISE}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRAITEMENT}/${ID}`;
export const URL_RECHERCHE_REQUETE_EDITION_ID = `${URL_RECHERCHE_REQUETE}/${PATH_EDITION}/${ID}/${ID_ACTE}?`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_APERCU_SIMPLE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SUIVI_DOSSIER_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SAISIE_PROJET_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/${ID}/${ID_SUIVI_DOSSIER}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_APERCU_SIMPLE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/${ID}`;
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/${ID}`;

// Modification Brouillon dans Saisie RDCSC depuis RMC de DELIVRANCE
export const URL_SAISIR_RDCSC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDCSC}/${ID}`;
export const URL_SAISIR_RDC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDC}/${ID}`;
export const URL_SAISIR_RDLFC_RMC = `${URL_RECHERCHE_REQUETE}/${PATH_SAISIR_RDLFC}/${ID}`;

/////////////////////////////////////////
///////// REQUETE D'INFORMATION (RI)) /////////
/////////////////////////////////////////
// Espace requête d'information
export const URL_MES_REQUETES_INFORMATION = `${URL_BASE}/mesrequetesinformation`;

// Aperçu d'une requête d'information
export const URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID = `${URL_MES_REQUETES_INFORMATION}/${PATH_APERCU_REQ_INFO}/${ID}`;

// Aperçu d'une requête d'information depuis RMC Requêtes
export const URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID = `${URL_RECHERCHE_REQUETE}/${PATH_APERCU_REQ_INFO}/${ID}`;

///////////////////////////////////////////////////////////////
///////// REQUETE D'INFORMATION DE MON SERVICE (RIMS) /////////
///////////////////////////////////////////////////////////////
// Espace requête d'information
export const URL_REQUETES_INFORMATION_SERVICE = `${URL_BASE}/requetesinformationservice`;
// Aperçu d'une requête d'information
export const URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID = `${URL_REQUETES_INFORMATION_SERVICE}/${PATH_APERCU_REQ_INFO}/${ID}`;

////////////////////////////////////////////////////////
///////////// MES REQUETES DE CRÉATION /////////////////
////////////////////////////////////////////////////////
export const URL_MES_REQUETES_CREATION = `${URL_BASE}/mesrequetescreation`;
export const URL_REQUETES_CREATION_SERVICE = `${URL_BASE}/requetescreationservice`;
export const URL_MES_REQUETES_CREATION_SAISIR_RCTC = `${URL_MES_REQUETES_CREATION}/${PATH_SAISIR_RCTC}`;
export const URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC = `${URL_REQUETES_CREATION_SERVICE}/${PATH_SAISIR_RCTC}`;
export const URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/${ID}`;
export const URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/${ID}`;
export const URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/${ID}/${ID_SUIVI_DOSSIER}`;
export const URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQUETE_CREATION_ETABLISSEMENT_ACTE_REGISTRE}/${ID}/${ID_ACTE}`;
export const URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/${ID}`;
export const URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/${ID}`;
export const URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID = `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/${ID}`;

// Modification requête ... depuis Aperçu requête de DELIVRANCE
export const URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID = `${URL_MES_REQUETES_CREATION}/${PATH_MODIFIER_RCTC}/${ID}`;

////////////////////////////////////////////////////////
///////// REQUETES DE CRÉATION DE MON SERVICE //////////
////////////////////////////////////////////////////////
export const URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}/${ID}`;
export const URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/${ID}`;
export const URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/${ID}/${ID_SUIVI_DOSSIER}`;
export const URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQUETE_CREATION_ETABLISSEMENT_ACTE_REGISTRE}/${ID}/${ID_ACTE}`;
export const URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/${ID}`;
export const URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/${ID}`;
export const URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID = `${URL_REQUETES_CREATION_SERVICE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/${ID}`;

/////////////////////////////////////////////////////////
///////// MES REQUETES CONSULAIRES  /////////////////////
/////////////////////////////////////////////////////////

export const URL_MES_REQUETES_CONSULAIRE = `${URL_BASE}/mes-requetes-consulaire`;
export const URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC = `${URL_MES_REQUETES_CONSULAIRE}/${PATH_SAISIR_RCTC}`;
export const URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID = `${URL_MES_REQUETES_CONSULAIRE}/modifier-requete-transcription/:idRequete`;

export const URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID = `${URL_MES_REQUETES_CONSULAIRE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/${ID}`;
export const URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID = `${URL_MES_REQUETES_CONSULAIRE}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/${ID}`;

/////////////////////////////////////////////////////////
///////// MES REQUETES CONSULAIRES  /////////////////////
/////////////////////////////////////////////////////////

export const URL_REQUETES_CONSULAIRE_SERVICE = `${URL_BASE}/requetes-consulaire-service`;

////////////////////////////////////////////////////////
///////// REQUETES DE MISE A JOUR //////////////////////
////////////////////////////////////////////////////////
export const URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS = `${URL_BASE}/${PATH_APERCU_REQ_MISE_A_JOUR_SUITE_AVIS}`;
export const URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE = `${URL_BASE}/${PATH_APERCU_REQ_MISE_A_JOUR_AUTRE}`;
export const URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE = `${URL_BASE}/${PATH_APERCU_REQ_MISE_A_JOUR_ANALYSE_MARGINALE}`;

export const URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID = `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/${ID}/${ID_ACTE}`;
export const URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID = `${URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE}/${ID}/${ID_ACTE}`;
export const URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID = `${URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE}/${ID}/${ID_ACTE}`;

const estUrlApercuRequete = (url: string): boolean => url.includes(`/${PATH_APERCU_REQ_DEL}/`);

const estUrlApercuTraitementRequete = (url: string): boolean => url.includes(`/${PATH_APERCU_REQ_TRAITEMENT}/`);

const estUrlEdition = (url: string): boolean => url.includes(`/${PATH_EDITION}`);

const estUrlSaisirCourrier = (url: string): boolean =>
  url.includes(`/${PATH_SAISIR_RDCSC}`) ||
  url.includes(`/${PATH_SAISIR_RDC}`) ||
  url.includes(`/${PATH_SAISIR_RDLFC}`) ||
  url.includes(`/${PATH_MODIFIER_RDC}`) ||
  url.includes(`/${PATH_MODIFIER_RDCSC}`);

type urlApercuParams = {
  url: string;
  idRequete?: string;
};

const getUrlApercuTraitementAPartirDe = ({ url, idRequete }: urlApercuParams): string =>
  [getUrlPrecedente(url), PATH_APERCU_REQ_TRAITEMENT, idRequete ?? getUrlParamId(url)].join(URL_SEPARATEUR);

export const receUrl = {
  estUrlApercuRequete,
  estUrlApercuTraitementRequete,
  estUrlEdition,
  estUrlSaisirCourrier,

  getUrlApercuTraitementAPartirDe
};
