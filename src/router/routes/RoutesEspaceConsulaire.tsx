import { Droit } from "@model/agent/enum/Droit";
import { RouteObject } from "react-router";
import PageMesRequetesConsulaires from "../../pages/requetesConsulaire/PageMesRequetesConsulaires";
import PageRequeteCreationTranscriptionPriseEnCharge from "../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge";
import PageRequeteTranscriptionSaisieProjet from "../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import PageRequetesServiceConsulaire from "../../pages/requetesConsulaire/PageRequetesServiceConsulaire";
import PageSaisieCourrierTranscription from "../../pages/requetesConsulaire/PageSaisieCourrierTranscription";
import ElementPageRECE from "../ElementPageRECE";
import * as Consulaire from "../infoPages/InfoPagesEspaceConsulaire";

export const ROUTES_ESPACE_CONSULAIRE: RouteObject[] = [
  {
    path: Consulaire.INFO_PAGE_MES_REQUETES_CONSULAIRES.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_MES_REQUETES_CONSULAIRES}
        auMoinsUnDesDroits={[Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]}
      >
        <PageMesRequetesConsulaires />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_REQUETES_CONSULAIRES_SERVICE.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_REQUETES_CONSULAIRES_SERVICE}
        auMoinsUnDesDroits={[Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE]}
      >
        <PageRequetesServiceConsulaire />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER}
        tousLesDroits={[Droit.CREER_ACTE_TRANSCRIT, Droit.SAISIR_REQUETE]}
      >
        <PageSaisieCourrierTranscription />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER}
        tousLesDroits={[Droit.CREER_ACTE_TRANSCRIT, Droit.SAISIR_REQUETE]}
      >
        <PageSaisieCourrierTranscription />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_CONSULTATION.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_CONSULTATION}
        tousLesDroits={[Droit.CREER_ACTE_TRANSCRIT]}
      >
        <PageRequeteCreationTranscriptionPriseEnCharge />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE}
        tousLesDroits={[Droit.CREER_ACTE_TRANSCRIT]}
      >
        <PageRequeteCreationTranscriptionPriseEnCharge />
      </ElementPageRECE>
    )
  },

  {
    path: Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url,
    element: (
      <ElementPageRECE
        infoPage={Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET}
        tousLesDroits={[Droit.CREER_ACTE_TRANSCRIT]}
      >
        <PageRequeteTranscriptionSaisieProjet />
      </ElementPageRECE>
    )
  }
];
