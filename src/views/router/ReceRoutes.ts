/* istanbul ignore file */

import { Droit } from "../../model/Droit";
import { FeatureFlag } from "../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../common/util/featureFlag/gestionnaireFeatureFlag";
import { droitsSaufConsulterArchives } from "../common/util/habilitation/habilitationsDescription";
import { IRoute } from "../common/util/route/IRoute";
import { getLibelle } from "../common/util/Utils";
import { PageMessage } from "../core/login/PageMessage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RMCArchivePage } from "../pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCActeInscriptionPage } from "../pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCRequetePage } from "../pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { ApercuCourrier } from "../pages/requeteDelivrance/apercuRequete/apercuCourrier/ApercuCourrier";
import { ApercuRequetePage } from "../pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuRequetePriseEnChargePage } from "../pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { ApercuRequeteTraitementPage } from "../pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import EspaceDelivrancePage from "../pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { SaisirRDAPCPage } from "../pages/requeteDelivrance/saisirRequete/SaisirRDAPCPage";
import { SaisirRDCPage } from "../pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "../pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { ApercuReqInfoPage } from "../pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "../pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_DECONNEXION,
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_TRAITEMENT_COURRIER_ID,
  URL_MES_REQUETES_DELIVRANCE_EXTRAIT_COPIE_COURRIER_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDAPC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_INFORMATION,
  URL_RECHERCHE_ACTE,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_APERCU_TRAITEMENT_COURRIER_ID,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_TRAITEMENT_COURRIER_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_EXTRAIT_COPIE_COURRIER_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDAPC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_INFORMATION_SERVICE,
  URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
  URL_SAISIR_RDCSC_RMC
} from "./ReceUrls";

const LIBELLE_APERCU_REQUETE_TRAITEMENT = "Aperçu requête (traitement)";
const LIBELLE_APERCU_REQUETE = "Aperçu de requête";
const LIBELLE_APERCU_PRISE_EN_CHARGE = "Aperçu requête (prise en charge)";
const LIBELLE_CREATION = "Création d'un courrier";
const LIBELLE_MODIFICATION = "Modification d'un courrier";

export const routesRece: IRoute[] = [
  {
    url: URL_ACCUEIL,
    component: AccueilPage,
    libelle: "Accueil"
  },
  {
    url: URL_CONTEXT_APP,
    component: AccueilPage,
    libelle: getLibelle("Accueil")
  },
  {
    url: URL_DECONNEXION,
    component: PageMessage,
    props: { message: getLibelle("Déconnexion en cours ...") },
    libelle: getLibelle("Déconnexion")
  },
  ////////////////////////////////////////////
  ///// MES REQUETES DE DELIVRANCE (MRD) /////
  ////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_DELIVRANCE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 0 },
    droits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    libelle: getLibelle("Mes requêtes de délivrance")
  },
  // Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Saisie requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    droits: [Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Saisir une requête de délivrance certificat de situation courrier"
    )
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDAPC,
    component: SaisirRDAPCPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle("Saisir une requête de délivrance d'attestation PACS")
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
    component: SaisirRDCPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.SAISIR_REQUETE],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes"
    )
  },
  // Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_EXTRAIT_COPIE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_TRAITEMENT_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_TRAITEMENT_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  ////////////////////////////////////////////////////////
  ///// REQUETES DE DELIVRANCE DE MON SERVICE (RDMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 1 },
    droits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    libelle: getLibelle("Les requêtes de délivrance de mon service")
  },
  // Aperçu requête ... depuis le tableau Requêtes de mon SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Saisie requête ... depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Saisir une requête de délivrance certificat de situation courrier"
    )
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDAPC,
    component: SaisirRDAPCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle("Saisir une requête de délivrance d'attestation PACS")
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
    component: SaisirRDCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes de service"
    )
  },
  // Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_EXTRAIT_COPIE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_TRAITEMENT_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  //////////////////////////////////////////
  ///// RECHERCHE MULTI-CRITERES (RMC) /////
  //////////////////////////////////////////
  {
    url: URL_RECHERCHE_ACTE_INSCRIPTION,
    component: RMCActeInscriptionPage,
    libelle: getLibelle("Recherche acte et inscription"),
    droits: [Droit.CONSULTER]
  },
  {
    url: URL_RECHERCHE_ACTE,
    component: RMCArchivePage,
    libelle: getLibelle("Recherche acte"),
    uniquementLesdroits: [Droit.CONSULTER_ARCHIVES]
  },
  {
    url: URL_RECHERCHE_REQUETE,
    component: RMCRequetePage,
    libelle: getLibelle("Recherche requête"),
    droits: [Droit.CONSULTER]
  },
  // Aperçu requête ... depuis le tableau résultats RMC Requêtes
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    droits: [Droit.CONSULTER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_SAISIR_RDCSC_RMC,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
    )
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_TRAITEMENT_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_PRISE_EN_CHARGE_COURRIER_ID,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  //////////////////////////////////////////////
  ///////// REQUETE D'INFORMATION (RI) /////////
  //////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_INFORMATION,
    component: EspaceInformationPage,
    props: { selectedTab: 0 },
    droits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Mes requêtes d'information")
  },
  {
    url: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
    component: ApercuReqInfoPage,
    droits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Aperçu de la requête")
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
    component: ApercuReqInfoPage,
    droits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Aperçu de la requête")
  },

  ////////////////////////////////////////////////////////
  ///// REQUETES D'INFORMATION DE MON SERVICE (RIMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_INFORMATION_SERVICE,
    component: EspaceInformationPage,
    props: { selectedTab: 1 },
    droits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Les requêtes d'information de mon service")
  },
  // Aperçu requête ... depuis le tableau Requêtes d'Information de mon SERVICE
  {
    url: URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
    component: ApercuReqInfoPage,
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  }
];
