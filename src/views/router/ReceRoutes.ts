/* istanbul ignore file */

import EspaceDelivrancePage from "../pages/espaceDelivrance/EspaceDelivrancePage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { ApercuRequetePage } from "../pages/apercuRequete/ApercuRequetePage";
import { LoginPage } from "../core/login/LoginPage";
import { Droit } from "../../model/Droit";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_MES_REQUETES,
  URL_REQUETES_SERVICE,
  URL_MES_REQUETES_ID,
  URL_REQUETES_SERVICE_ID,
  URL_DECONNEXION,
  URL_RC_RCA,
  URL_ACTE,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_RECHERCHE_ACTE,
  URL_RECHERCHE_REQUETE,
  URL_MES_REQUETES_SAISIR_RDCSC,
  URL_REQUETES_SERVICE_SAISIR_RDCSC,
  URL_APPERCU_REQUETE_TRAITEMENT_ID,
  URL_APPERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_APPERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID
} from "./ReceUrls";
import { RcRcaPage } from "../pages/RcRcaPage";
import { FeatureFlag } from "../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../common/util/featureFlag/gestionnaireFeatureFlag";
import { ActePage } from "../pages/ActePage";
import { droitsSaufConsulterArchives } from "../common/util/habilitation/habilitationsDescription";
import { getLibelle } from "../common/widget/Text";
import { RMCActeInscriptionPage } from "../pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCArchivePage } from "../pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCRequetePage } from "../pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { IRoute } from "../common/util/route/IRoute";
import { SaisirRDCSCPage } from "../pages/saisirRequete/SaisirRDCSCPage";
import { ApercuRequetePriseEnChargePage } from "../pages/apercuRequete/ApercuRequetePriseEnChargePage";
import { ApercuRequeteTraitementPage } from "../pages/apercuRequete/ApercuRequeteTraitementPage";

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
  {
    url: URL_DECONNEXION,
    component: LoginPage,
    props: { messageLogin: "pages.login.deconnexion" },
    libelle: getLibelle("Déconnexion")
  },
  {
    // FIXME: A supprimer ainsi que la page de démo correspondante
    url: URL_RC_RCA,
    component: RcRcaPage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: "Rc Rca Pacs"
  },
  {
    // FIXME: A supprimer ainsi que la page de démo correspondante
    url: URL_ACTE,
    component: ActePage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: "Acte"
  },
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
    url: URL_REQUETES_SERVICE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle(
      "Saisir une requête de délivrance certificat de situation courrier"
    )
  },
  {
    url: URL_APPERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    //droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE], // FIXME: à valider
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Aperçu requête (prise en charge)")
  },
  {
    url: URL_APPERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    //droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE], // FIXME: à valider
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Aperçu requête (traitement)")
  },
  {
    url: URL_APPERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID,
    component: ApercuRequeteTraitementPage,
    //droits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE], // FIXME: à valider
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2),
    libelle: getLibelle("Aperçu requête (traitement)")
  }
];
