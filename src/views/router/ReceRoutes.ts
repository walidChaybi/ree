/* istanbul ignore file */

import { Droit } from "../../model/Droit";
import { FeatureFlag } from "../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../common/util/featureFlag/gestionnaireFeatureFlag";
import { droitsSaufConsulterArchives } from "../common/util/habilitation/habilitationsDescription";
import { IRoute } from "../common/util/route/IRoute";
import { getLibelle } from "../common/widget/Text";
import { LoginPage } from "../core/login/LoginPage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { ApercuCourrier } from "../pages/apercuRequete/apercuCourrier/ApercuCourrier";
import { ApercuRequetePageV2 } from "../pages/apercuRequete/apercuRequete/ApercuRequetePageV2";
import { ApercuRequetePriseEnChargePage } from "../pages/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { ApercuRequeteTraitementPage } from "../pages/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { ApercuRequetePage } from "../pages/apercuRequete/ApercuRequetePage";
import { DetailRequetePage } from "../pages/detailRequete/DetailRequetePage";
import EspaceDelivrancePage from "../pages/espaceDelivrance/v1/EspaceDelivrancePage";
import EspaceDelivrancePageV2 from "../pages/espaceDelivrance/v2/EspaceDelivrancePageV2";
import { RMCArchivePage } from "../pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCActeInscriptionPage } from "../pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCRequetePage } from "../pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { SaisirRDAPCPage } from "../pages/saisirRequete/SaisirRDAPCPage";
import { SaisirRDCPage } from "../pages/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "../pages/saisirRequete/SaisirRDCSCPage";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_DECONNEXION,
  URL_MES_REQUETES,
  URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
  URL_MES_REQUETES_APERCU_REQUETE,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_APERCU_TRAITEMENT_COURRIER,
  URL_MES_REQUETES_DETAIL_REQUETE_ID,
  URL_MES_REQUETES_DETAIL_REQUETE_ID_V2,
  URL_MES_REQUETES_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2,
  URL_MES_REQUETES_DETAIL_REQUETE_TRAITEMENT_ID_V2,
  URL_MES_REQUETES_EXTRAIT_COPIE_COURRIER,
  URL_MES_REQUETES_ID,
  URL_MES_REQUETES_SAISIR_RDAPC,
  URL_MES_REQUETES_SAISIR_RDC,
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
  URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE,
  URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_SAISIR_RDCSC_ID,
  URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE,
  URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE,
  URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_V2,
  URL_RECHERCHE_ACTE,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_PRISE_EN_CHARGE_COURRIER,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_APERCU_TRAITEMENT_COURRIER,
  URL_RECHERCHE_REQUETE_DETAIL_REQUETE_ID,
  URL_RECHERCHE_REQUETE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_DETAIL_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE,
  URL_REQUETES_SERVICE_APERCU_PRISE_EN_CHARGE_COURRIER,
  URL_REQUETES_SERVICE_APERCU_REQUETE,
  URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_APERCU_TRAITEMENT_COURRIER,
  URL_REQUETES_SERVICE_DETAIL_REQUETE_ID,
  URL_REQUETES_SERVICE_DETAIL_REQUETE_ID_V2,
  URL_REQUETES_SERVICE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2,
  URL_REQUETES_SERVICE_DETAIL_REQUETE_TRAITEMENT_ID_V2,
  URL_REQUETES_SERVICE_EXTRAIT_COPIE_COURRIER,
  URL_REQUETES_SERVICE_ID,
  URL_REQUETES_SERVICE_SAISIR_RDAPC,
  URL_REQUETES_SERVICE_SAISIR_RDC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_SAISIR_RDCSC_ID,
  URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE,
  URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_SERVICE_V2,
  URL_SAISIR_RDCSC_RMC
} from "./ReceUrls";

const LIBELLE_APERCU_REQUETE_TRAITEMENT = "Aperçu requête (traitement)";
const LIBELLE_APERCU_REQUETE = "Aperçu de requête V2";
const LIBELLE_APERCU_PRISE_EN_CHARGE = "Aperçu requête (prise en charge)";
const LIBELLE_DETAIL_REQUETE = "Détail de la requête";
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
    component: LoginPage,
    props: { messageLogin: "pages.login.deconnexion" },
    libelle: getLibelle("Déconnexion")
  },
  /************* VERSION 1 ************/
  // Espace de délivrance
  {
    url: URL_MES_REQUETES,
    component: EspaceDelivrancePage,
    props: { selectedTab: 0 },
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle("Mes requêtes")
  },
  {
    url: URL_REQUETES_SERVICE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 1 },
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle("Requête du service")
  },
  // Aperçu requête
  {
    url: URL_MES_REQUETES_ID,
    component: ApercuRequetePage,
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle("Aperçu de requête")
  },
  {
    url: URL_REQUETES_SERVICE_ID,
    component: ApercuRequetePage,
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle("Aperçu de requête")
  },
  // Détail de la requête d'une requete d'un des tableau de l'espace délivrance
  {
    url: URL_MES_REQUETES_DETAIL_REQUETE_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_DETAIL_REQUETE_ID,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  /************* VERSION 2 ************/
  ////////////////////////////////////////////
  ///// MES REQUETES DE DELIVRANCE (MRD) /////
  ////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_V2,
    component: EspaceDelivrancePageV2,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    props: { selectedTab: 0 },
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle("Mes requêtes V2")
  },
  // Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: droitsSaufConsulterArchives,
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DETAIL_REQUETE_ID_V2,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DETAIL_REQUETE_TRAITEMENT_ID_V2,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  // Saisie requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Saisir une requête de délivrance certificat de situation courrier"
    )
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDAPC,
    component: SaisirRDAPCPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Saisir une requête de délivrance d'attestation PACS")
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDC,
    component: SaisirRDCPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes"
    )
  },
  // Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_EXTRAIT_COPIE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_APERCU_TRAITEMENT_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  {
    url: URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_MES_REQUETES_APERCU_TRAITEMENT_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  /////////////////////////////////////////
  ///// REQUETES DE MON SERVICE (RMS) /////
  /////////////////////////////////////////
  {
    url: URL_REQUETES_SERVICE_V2,
    component: EspaceDelivrancePageV2,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    props: { selectedTab: 1 },
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle("Requête du service V2")
  },
  // Aperçu requête ... V2 depuis le tableau Requêtes de mon SERVICE
  {
    url: URL_REQUETES_SERVICE_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_DETAIL_REQUETE_ID_V2,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID_V2,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_DETAIL_REQUETE_TRAITEMENT_ID_V2,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  // Saisie requête ... depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Saisir une requête de délivrance certificat de situation courrier"
    )
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDAPC,
    component: SaisirRDAPCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Saisir une requête de délivrance d'attestation PACS")
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC,
    component: SaisirRDCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_DETAIL_REQUETE_TRAITEMENT_ID,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes de service"
    )
  },
  // Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Détail d'une requête dans une page Aperçu requête ... après saisie de requête RDC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_SAISIR_RDC_DETAIL_REQUETE_TRAITEMENT_ID,
    component: DetailRequetePage,
    droits: [Droit.ATTRIBUER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_REQUETES_SERVICE_APERCU_PRISE_EN_CHARGE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_REQUETES_SERVICE_EXTRAIT_COPIE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_REQUETES_SERVICE_APERCU_TRAITEMENT_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  },
  //////////////////////////////////////////
  ///// RECHERCHE MULTI-CRITERES (RMC) /////
  //////////////////////////////////////////
  {
    url: URL_RECHERCHE_ACTE_INSCRIPTION,
    component: RMCActeInscriptionPage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Recherche acte ou inscription"),
    droits: [Droit.CONSULTER]
  },
  {
    url: URL_RECHERCHE_ACTE,
    component: RMCArchivePage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Recherche acte"),
    uniquementLesdroits: [Droit.CONSULTER_ARCHIVES]
  },
  {
    url: URL_RECHERCHE_REQUETE,
    component: RMCRequetePage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Recherche une requête")
  },
  // Aperçu requête ... depuis le tableau résultats RMC Requêtes
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE,
    component: ApercuRequetePageV2,
    droits: [Droit.CONSULTER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  //  Détail d'une requête depuis une page Aperçu requête ... après RMC Requêtes
  {
    url: URL_RECHERCHE_REQUETE_DETAIL_REQUETE_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_DETAIL_REQUETE_PRISE_EN_CHARGE_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_DETAIL_REQUETE_TRAITEMENT_ID,
    component: DetailRequetePage,
    droits: droitsSaufConsulterArchives,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_DETAIL_REQUETE)
  },
  {
    url: URL_SAISIR_RDCSC_RMC,
    component: SaisirRDCSCPage,
    droits: [Droit.CONSULTER, Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
    )
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_PRISE_EN_CHARGE_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_CREATION)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_TRAITEMENT_COURRIER,
    component: ApercuCourrier,
    droits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(LIBELLE_MODIFICATION)
  }
];
