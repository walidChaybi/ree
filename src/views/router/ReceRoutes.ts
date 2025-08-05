/* istanbul ignore file */

import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { RMCArchivePage } from "@pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { ApercuRequeteEtablissementActeRegistrePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage";
import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { IRoute } from "@util/route/IRoute";
import PageAccueil from "../../pages/accueil/PageAccueil";
import PageMesRequetesConsulaires from "../../pages/requetesConsulaire/PageMesRequetesConsulaires";
import PageRequeteCreationTranscriptionPriseEnCharge from "../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge";
import PageRequeteTranscriptionSaisieProjet from "../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import PageRequetesServiceConsulaire from "../../pages/requetesConsulaire/PageRequetesServiceConsulaire";
import PageSaisieCourrierTranscription from "../../pages/requetesConsulaire/PageSaisieCourrierTranscription";
import PageEditionRequeteDelivrance from "../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import PageEditionRequeteMiseAJour from "../../pages/requetesMiseAJour/PageEditionRequeteMiseAJour";
import { PageRMCActeInscription } from "../../pages/rmc/PageRMCActeInscription";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_CONSULAIRE,
  URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID,
  URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
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
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SAISIE_PROJET_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SUIVI_DOSSIER_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_APERCU_SIMPLE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
  URL_RECHERCHE_REQUETE_EDITION_ID,
  URL_REQUETES_CONSULAIRE_SERVICE,
  URL_REQUETES_CREATION_SERVICE,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
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
  URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
  URL_SAISIR_RDCSC_RMC,
  URL_SAISIR_RDC_RMC
} from "./ReceUrls";

const LIBELLE_APERCU_REQUETE_TRAITEMENT = "Aperçu requête (traitement)";
const LIBELLE_APERCU_REQUETE = "Aperçu de requête";
const LIBELLE_APERCU_PRISE_EN_CHARGE = "Aperçu requête (prise en charge)";
const LIBELLE_APERCU_SUIVI_DOSSIER = "Apercu requête (suivi dossier)";
const LIBELLE_APERCU_SAISIE_PROJET = "Aperçu requête (saisie de projet)";
const LIBELLE_APERCU_ACTE_REGISTRE = "Aperçu requête (acte registre)";
const LIBELLE_APERCU_MISE_A_JOUR_ = "Mise à jour acte";
const Labels = {
  RDCSC: "certificat & attestation RC/RCA/PACS courrier"
};

export const routesRece: IRoute[] = [
  {
    url: "",
    component: PageAccueil,
    libelle: "Accueil"
  },

  ////////////////////////////////////////////
  ///// MES REQUETES DE DELIVRANCE (MRD) /////
  ////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_DELIVRANCE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 0 },
    auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
    libelle: "Mes requêtes de délivrance"
  },
  // Aperçu requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: [
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_ACTE_TRANSCRIT,
      Droit.CREER_PACS,
      Droit.DELIVRER,
      Droit.INFORMER_USAGER,
      Droit.METTRE_A_JOUR_ACTE,
      Droit.METTRE_A_JOUR_RC_RCA_PACS,
      Droit.SIGNER_DELIVRANCE_DEMAT,
      Droit.CONSULTER,
      Droit.ATTRIBUER_REQUETE
    ],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_REQUETE_TRAITEMENT
  },
  // Saisie requête ... depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.SAISIR_REQUETE],
    libelle: `Saisir une requête de délivrance ${Labels.RDCSC}`
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.SAISIR_REQUETE],
    canAccess: () => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES),
    libelle: "Requête de délivrance d'extrait copie Courrier"
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de DELIVRANCE
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes"
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance extrait/copie depuis mes requêtes"
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
    component: PageEditionRequeteDelivrance,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: () => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES),
    libelle: "Édition"
  },

  {
    url: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: "Modification requête de délivrance d'extrait copie Courrier"
  },
  {
    url: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.SAISIR_REQUETE],
    libelle: `Modification requête de ${Labels.RDCSC}`
  },
  ////////////////////////////////////////////////////////
  ///// REQUETES DE DELIVRANCE DE MON SERVICE (RDMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 1 },
    auMoinsUnDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    libelle: "Les requêtes de délivrance de mon service"
  },
  // Aperçu requête ... depuis le tableau Requêtes de mon SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER_REQUETE],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_REQUETE_TRAITEMENT
  },
  // Saisie requête ... depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    libelle: `Saisir une requête de délivrance ${Labels.RDCSC}`
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
    component: SaisirRDCPage,
    auMoinsUnDesDroits: [Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    canAccess: () => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES),
    libelle: "Requête de délivrance d'extrait copie Courrier"
  },
  // Aperçu requête ... après saisie de requête RDCSC depuis Mes Requêtes de SERVICE
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance certificat de situation depuis mes requêtes de service"
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC_ID,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance extrait/copie depuis mes requêtes de service"
  },
  {
    url: URL_REQUETES_DELIVRANCE_SERVICE_EDITION_ID,
    component: PageEditionRequeteDelivrance,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: () => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES),
    libelle: "Édition"
  },
  //////////////////////////////////////////
  ///// RECHERCHE MULTI-CRITERES (RMC) /////
  //////////////////////////////////////////
  {
    url: URL_RECHERCHE_ACTE_INSCRIPTION,
    component: gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC) ? PageRMCActeInscription : RMCActeInscriptionPage,
    libelle: "Recherche acte et inscription",
    auMoinsUnDesDroits: [Droit.CONSULTER]
  },
  {
    url: URL_RECHERCHE_ACTE,
    component: RMCArchivePage,
    libelle: "Recherche acte",
    uniquementLesdroits: [Droit.CONSULTER_ARCHIVES]
  },
  {
    url: URL_RECHERCHE_REQUETE,
    component: RMCRequetePage,
    libelle: "Recherche requête",
    auMoinsUnDesDroits: [Droit.CONSULTER]
  },
  // Aperçu requête ... depuis le tableau résultats RMC Requêtes
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_ID,
    component: ApercuRequetePage,
    auMoinsUnDesDroits: [Droit.CONSULTER],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    component: ApercuRequetePriseEnChargePage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_TRAITEMENT_ID,
    component: ApercuRequeteTraitementPage,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    libelle: LIBELLE_APERCU_REQUETE_TRAITEMENT
  },
  {
    url: URL_SAISIR_RDCSC_RMC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
  },
  {
    url: URL_SAISIR_RDC_RMC,
    component: SaisirRDCSCPage,
    auMoinsUnDesDroits: [Droit.CONSULTER, Droit.ATTRIBUER_REQUETE, Droit.SAISIR_REQUETE],
    libelle: "Modifier un brouillon d'une requête de délivrance certificat de situation depuis la RMC"
  },
  {
    url: URL_RECHERCHE_REQUETE_EDITION_ID,
    component: PageEditionRequeteDelivrance,
    auMoinsUnDesDroits: [Droit.DELIVRER],
    canAccess: () => gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES),
    libelle: "Édition"
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_APERCU_SIMPLE_ID,
    component: ApercuRequeteEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SUIVI_DOSSIER_ID,
    component: ApercuRequeteEtablissementSuiviDossierPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SUIVI_DOSSIER
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_ETABLISSEMENT_SAISIE_PROJET_ID,
    component: ApercuRequeteEtablissementSaisieDeProjetPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_APERCU_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
    component: PageRequeteCreationTranscriptionPriseEnCharge,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_EN_TRAITEMENT_ID,
    component: PageRequeteTranscriptionSaisieProjet,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },
  //////////////////////////////////////////////
  ///////// REQUETE D'INFORMATION (RI) /////////
  //////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_INFORMATION,
    component: EspaceInformationPage,
    props: { selectedTab: 0 },
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: "Mes requêtes d'information"
  },
  {
    url: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
    component: ApercuReqInfoPage,
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: "Aperçu de la requête"
  },
  {
    url: URL_RECHERCHE_REQUETE_APERCU_REQUETE_INFORMATION_ID,
    component: ApercuReqInfoPage,
    auMoinsUnDesDroits: [Droit.INFORMER_USAGER],
    libelle: "Aperçu de la requête"
  },

  ////////////////////////////////////////////////////////
  ///// REQUETES D'INFORMATION DE MON SERVICE (RIMS) /////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_INFORMATION_SERVICE,
    component: EspaceInformationPage,
    props: { selectedTab: 1 },
    droits: [Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE],
    libelle: "Les requêtes d'information de mon service"
  },
  // Aperçu requête ... depuis le tableau Requêtes d'Information de mon SERVICE
  {
    url: URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
    component: ApercuReqInfoPage,
    droits: [Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE],
    libelle: LIBELLE_APERCU_REQUETE
  },
  ////////////////////////////////////////////////////////
  ///////////// MES REQUETES DE CRÉATION /////////////////
  ////////////////////////////////////////////////////////
  {
    url: URL_MES_REQUETES_CREATION,
    component: EspaceCreationPage,
    props: { selectedTab: 0 },
    auMoinsUnDesDroits: [Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI, Droit.CREER_ACTE_TRANSCRIT],
    libelle: "Mes requêtes de création"
  },

  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuRequeteEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
    component: ApercuRequeteEtablissementSuiviDossierPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SUIVI_DOSSIER
  },
  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
    component: ApercuRequeteEtablissementSaisieDeProjetPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },
  {
    url: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
    component: ApercuRequeteEtablissementActeRegistrePage,
    droits: [Droit.SIGNER_ACTE],
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_ACTE_REGISTRE
  },
  {
    url: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
    component: PageRequeteCreationTranscriptionPriseEnCharge,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
    component: PageRequeteTranscriptionSaisieProjet,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },
  {
    url: URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID,
    component: PageSaisieCourrierTranscription,
    droits: [Droit.SAISIR_REQUETE],
    auMoinsUnDesDroits: [Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI, Droit.CREER_ACTE_TRANSCRIT],
    libelle: "Modifier une requête de transcription"
  },
  ////////////////////////////////////////////////////////
  ///////// REQUETES DE CRÉATION DE MON SERVICE //////////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETES_CREATION_SERVICE,
    component: EspaceCreationPage,
    props: { selectedTab: 1 },
    droits: [Droit.ATTRIBUER_REQUETE],
    auMoinsUnDesDroits: [Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI, Droit.CREER_ACTE_TRANSCRIT],
    libelle: "Les requêtes de création de mon service"
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuRequeteEtablissementSimplePage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
    component: ApercuRequeteEtablissementSuiviDossierPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SUIVI_DOSSIER
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
    component: ApercuRequeteEtablissementSaisieDeProjetPage,
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
    component: ApercuRequeteEtablissementActeRegistrePage,
    droits: [Droit.SIGNER_ACTE],
    droitPerimetres: {
      droit: Droit.CREER_ACTE_ETABLI,
      perimetres: [Perimetre.ETAX, Perimetre.TOUS_REGISTRES]
    },
    libelle: LIBELLE_APERCU_ACTE_REGISTRE
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
    component: ApercuReqCreationTranscriptionSimplePage,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_REQUETE
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
    component: PageRequeteCreationTranscriptionPriseEnCharge,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_PRISE_EN_CHARGE
  },
  {
    url: URL_REQUETES_CREATION_SERVICE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
    component: PageRequeteTranscriptionSaisieProjet,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: LIBELLE_APERCU_SAISIE_PROJET
  },

  /////////////////////////////////////////////////////////
  ///////// MES REQUETES CONSULAIRES  /////////////////////
  /////////////////////////////////////////////////////////

  {
    url: URL_MES_REQUETES_CONSULAIRE,
    component: PageMesRequetesConsulaires,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE],
    libelle: "Mes requêtes consulaires"
  },
  {
    url: URL_MES_REQUETES_CONSULAIRE_SAISIR_RCTC,
    component: PageSaisieCourrierTranscription,
    droits: [Droit.CREER_ACTE_TRANSCRIT],
    libelle: `Saisir une requête de transcription`
  },

  ////////////////////////////////////////////////////////
  ///////// REQUETES CONSULAIRES DE MON SERVICE //////////
  ////////////////////////////////////////////////////////

  {
    url: URL_REQUETES_CONSULAIRE_SERVICE,
    component: PageRequetesServiceConsulaire,
    auMoinsUnDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE],
    libelle: "Les requêtes consulaires de mon service"
  },

  ////////////////////////////////////////////////////////
  ///////// REQUETES DE MISE A JOUR //////////////////////
  ////////////////////////////////////////////////////////
  {
    url: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
    component: PageEditionRequeteMiseAJour,
    props: { estMiseAJourAvecMentions: true },
    auMoinsUnDesDroits: [Droit.METTRE_A_JOUR_ACTE],
    libelle: LIBELLE_APERCU_MISE_A_JOUR_
  },
  {
    url: URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID,
    component: PageEditionRequeteMiseAJour,
    props: { estMiseAJourAvecMentions: true },
    auMoinsUnDesDroits: [Droit.METTRE_A_JOUR_ACTE],
    libelle: LIBELLE_APERCU_MISE_A_JOUR_
  },
  {
    url: URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID,
    component: PageEditionRequeteMiseAJour,
    auMoinsUnDesDroits: [Droit.METTRE_A_JOUR_ACTE, Droit.MODIFIER_ANALYSE_MARGINALE],
    libelle: LIBELLE_APERCU_MISE_A_JOUR_
  }
];
