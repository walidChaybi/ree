import { Droit } from "@model/agent/enum/Droit";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { ApercuRequeteTraitementPage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { RouteObject } from "react-router";
import PageEditionRequeteDelivrance from "../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import ElementPageRECE from "../ElementPageRECE";
import {
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT,
  INFO_PAGE_MES_REQUETES_DELIVRANCE,
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER,
  INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER,
  INFO_PAGE_REQUETES_DELIVRANCE_SERVICE,
  INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER,
  INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER
} from "../infoPages/InfoPagesEspaceDelivrance";

export const ROUTES_ESPACE_DELIVRANCE: RouteObject[] = [
  /** Espaces **/
  {
    path: INFO_PAGE_MES_REQUETES_DELIVRANCE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MES_REQUETES_DELIVRANCE}
        auMoinsUnDesDroits={[Droit.DELIVRER, Droit.DELIVRER_COMEDEC]}
      >
        <EspaceDelivrancePage selectedTab={0} />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_REQUETES_DELIVRANCE_SERVICE}
        auMoinsUnDesDroits={[Droit.DELIVRER, Droit.DELIVRER_COMEDEC]}
      >
        <EspaceDelivrancePage selectedTab={1} />
      </ElementPageRECE>
    )
  },

  /** Saisie requête courrier **/
  {
    path: INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER}
        tousLesDroits={[Droit.SAISIR_REQUETE]}
        featureFlags={[FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES_VIA_SAGA]}
      >
        <SaisirRDCPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER}
        auMoinsUnDesDroits={[Droit.CONSULTER, Droit.SAISIR_REQUETE]}
      >
        <SaisirRDCPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER}
        tousLesDroits={[Droit.SAISIR_REQUETE]}
      >
        <SaisirRDCSCPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER}
        auMoinsUnDesDroits={[Droit.CONSULTER, Droit.SAISIR_REQUETE]}
      >
        <SaisirRDCSCPage />
      </ElementPageRECE>
    )
  },

  /** Requêtes **/
  {
    path: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION}
        auMoinsUnDesDroits={[
          Droit.CREER_ACTE_DRESSE,
          Droit.CREER_ACTE_ETABLI,
          Droit.TRANSCRIPTION_CREER_PROJET_ACTE,
          Droit.CREER_PACS,
          Droit.DELIVRER,
          Droit.INFORMER_USAGER,
          Droit.METTRE_A_JOUR_ACTE,
          Droit.METTRE_A_JOUR_RC_RCA_PACS,
          Droit.SIGNER_DELIVRANCE_DEMAT,
          Droit.CONSULTER,
          Droit.ATTRIBUER_REQUETE
        ]}
      >
        <ApercuRequetePage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE}
        tousLesDroits={[Droit.DELIVRER]}
      >
        <ApercuRequetePriseEnChargePage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT}
        tousLesDroits={[Droit.DELIVRER]}
      >
        <ApercuRequeteTraitementPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION}
        auMoinsUnDesDroits={[Droit.DELIVRER]}
        featureFlags={[FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES_VIA_SAGA]}
      >
        <PageEditionRequeteDelivrance />
      </ElementPageRECE>
    )
  }
];
