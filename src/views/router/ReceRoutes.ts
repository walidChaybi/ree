/* istanbul ignore file */

import { PageMessage } from "@core/login/PageMessage";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { AccueilPage } from "@pages/accueil/AccueilPage";
import { RMCArchivePage } from "@pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { ApercuReqCreationEtablissementPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/etablissement/ApercuReqCreationEtablissementPriseEnChargePage";
import { ApercuReqCreationEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/ApercuReqCreationEtablissementSimplePage";
import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import { ApercuReqCreationTranscriptionSaisieProjetPage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSaisieProjetPage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { SaisirRCTCPage } from "@pages/requeteCreation/saisirRequete/SaisirRCTCPage";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { EditionExtraitCopiePage } from "@pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { droitsSaufConsulterArchives } from "@util/habilitation/habilitationsDescription";
import { IRoute } from "@util/route/IRoute";
import { getLibelle } from "@util/Utils";
import {
  URL_ACCUEIL,
  URL_CONTEXT_APP,
  URL_DECONNEXION,
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID,
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID,
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_ID,
  URL_MES_REQUETES_INFORMATION,
  URL_RECHERCHE_ACTE,
  URL_RECHERCHE_ACTE_INSCRIPTION,
  URL_RECHERCHE_REQUETE,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_APERCU_SIMPLE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_APERCU_SIMPLE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_EDITION_ID,
  URL_REQUETES_CREATION_SERVICE,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC,
  URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
  URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_EDITION_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_ID,
  URL_REQUETES_INFORMATION_SERVICE,
  URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
  URL_SAISIR_RDCSC_RMC,
  URL_SAISIR_RDC_RMC
} from "./ReceUrls";

const LIBELLE_APERCU_REQUETE_TRAITEMENT = "Aperçu requête (traitement)";
const LIBELLE_APERCU_REQUETE = "Aperçu de requête";
const LIBELLE_APERCU_PRISE_EN_CHARGE = "Aperçu requête (prise en charge)";
const LIBELLE_APERCU_SAISIE_PROJET = "Aperçu requête (saisie de projet)";
const Labels = {
  RDCSC: "certificat & attestation RC/RCA/PACS courrier"
};

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
    auMoinsUnDesDroits: [
      Droit.DELIVRER,
      Droit.DELIVRER_COMEDEC,
      Droit.CONSULTER
    ],
    libelle: getLibelle("Mes requêtes de délivrance")
  },
  // Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: droitsSaufConsulterArchives,
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Saisie requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.SAISIR_REQUETE],
    libelle: getLibelle(`Saisir une requête de délivrance ${Labels.RDCSC}`)
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes"
    )
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance extrait/copie depuis mes requêtes"
    )
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
    component: EditionExtraitCopiePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC),
    libelle: getLibelle("Édition")
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(
      "Modification requête de délivrance d'extrait copie Courrier"
    )
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(`Modification requête de ${Labels.RDCSC}`)
  },
  ////////////////////////////////////////////////////////
  ///// REQUETES DE DELIVRANCE DE MON SERVICE (RDMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 1 },
    auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    libelle: getLibelle("Les requêtes de délivrance de mon service")
  },
  // Aperçu requête ... depuis le tableau Requêtes de mon SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  // Saisie requête ... depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    libelle: getLibelle(`Saisir une requête de délivrance ${Labels.RDCSC}`)
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER, Droit.SAISIR_REQUETE],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC),
    libelle: getLibelle("Requête de délivrance d'extrait copie Courrier")
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [
      Droit.CONSULTER,
      Droit.ATTRIBUER,
      Droit.SAISIR_REQUETE
    ],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes de service"
    )
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [
      Droit.CONSULTER,
      Droit.ATTRIBUER,
      Droit.SAISIR_REQUETE
    ],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance extrait/copie depuis mes requêtes de service"
    )
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_EDITION_ID,
    component: EditionExtraitCopiePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC),
    libelle: getLibelle("Édition")
  },
  //////////////////////////////////////////
  ///// RECHERCHE MULTI-CRITERES (RMC) /////
  //////////////////////////////////////////
  {
    url: URL_RECHERCHE_ACTE_INSCRIPTION,
    component: RMCActeInscriptionPage,
    libelle: getLibelle("Recherche acte et inscription"),
    auMoinsUnDesDroits: [Droit.CONSULTER]
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
    auMoinsUnDesDroits: [Droit.CONSULTER]
  },
  // Aperçu requête ... depuis le tableau résultats RMC Requêtes
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: [Droit.CONSULTER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE_TRAITEMENT)
  },
  {
    url: URL_SAISIR_RDCSC_RMC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [
      Droit.CONSULTER,
      Droit.ATTRIBUER,
      Droit.SAISIR_REQUETE
    ],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
    )
  },
  {
    url: URL_SAISIR_RDC_RMC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [
      Droit.CONSULTER,
      Droit.ATTRIBUER,
      Droit.SAISIR_REQUETE
    ],
    libelle: getLibelle(
      "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
    )
  },
  {
    url: URL_RECHERCHE_REQUETE_EDITION_ID,
    component: EditionExtraitCopiePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC),
    libelle: getLibelle("Édition")
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_APERCU_SIMPLE_ID,
    component: ApercuReqCreationEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_PRISE_EN_CHARGE_ID,
    component: ApercuReqCreationEtablissementPriseEnChargePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_APERCU_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
    component: ApercuReqCreationTranscriptionPriseEnChargePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID,
    component: ApercuReqCreationTranscriptionSaisieProjetPage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_SAISIE_PROJET)
  },
  //////////////////////////////////////////////
  ///////// REQUETE D'INFORMATION (RI) /////////
  //////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_INFORMATION,
    component: EspaceInformationPage,
    props: { selectedTab: 0 },
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Mes requêtes d'information"),
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  },
  {
    url: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
    component: ApercuReqInfoPage,
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Aperçu de la requête"),
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
    component: ApercuReqInfoPage,
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Aperçu de la requête"),
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  },

  ////////////////////////////////////////////////////////
  ///// REQUETES D'INFORMATION DE MON SERVICE (RIMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_INFORMATION_SERVICE,
    component: EspaceInformationPage,
    props: { selectedTab: 1 },
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: getLibelle("Les requêtes d'information de mon service"),
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  },
  // Aperçu requête ... depuis le tableau Requêtes d'Information de mon SERVICE
  {
    url: URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
    component: ApercuReqInfoPage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE),
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  },
  ////////////////////////////////////////////////////////
  ///////////// MES REQUETES DE CRÉATION /////////////////
  ////////////////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_CREATION,
    component: EspaceCreationPage,
    props: { selectedTab: 0 },
    auMoinsUnDesDroits: [
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_ACTE_TRANSCRIT
    ],
    libelle: getLibelle("Mes requêtes de création")
  },
  {
    url: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
    component: SaisirRCTCPage,
    droits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(`Saisir une requête de transcription`)
  },
  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
    component: ApercuReqCreationEtablissementPriseEnChargePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
    component: ApercuReqCreationTranscriptionPriseEnChargePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
    component: ApercuReqCreationTranscriptionSaisieProjetPage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_SAISIE_PROJET)
  },
  {
    url: URL_MES_REQUETES_CREATION_MODIFIER_RCTC_ID,
    component: SaisirRCTCPage,
    droits: [Droit.SAISIR_REQUETE],
    auMoinsUnDesDroits: [
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_ACTE_TRANSCRIT
    ],
    libelle: getLibelle("Modifier une requête de transcription")
  },
  ////////////////////////////////////////////////////////
  ///////// REQUETES DE CRÉATION DE MON SERVICE //////////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_CREATION_SERVICE,
    component: EspaceCreationPage,
    props: { selectedTab: 1 },
    droits: [Droit.ATTRIBUER],
    auMoinsUnDesDroits: [
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_ACTE_TRANSCRIT
    ],
    libelle: getLibelle("Les requêtes de création de mon service")
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC,
    component: SaisirRCTCPage,
    droits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(`Saisir une requête de transcription`)
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_PRISE_EN_CHARGE_ID,
    component: ApercuReqCreationEtablissementPriseEnChargePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.MEAE]
    },
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_REQUETE)
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
    component: ApercuReqCreationTranscriptionPriseEnChargePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_PRISE_EN_CHARGE)
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
    component: ApercuReqCreationTranscriptionSaisieProjetPage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: getLibelle(LIBELLE_APERCU_SAISIE_PROJET)
  }
];
