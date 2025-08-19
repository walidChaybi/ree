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
        auMoinsUnDesDroits={[Droit.CONSULAIRE_ACCES_ESPACE_MES_REQUETES, Droit.CREER_ACTE_DRESSE]}
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
        auMoinsUnDesDroits={[Droit.CONSULAIRE_ACCES_ESPACE_REQUETES_DE_MON_SERVICE, Droit.CREER_ACTE_DRESSE]}
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
        tousLesDroits={[Droit.TRANSCRIPTION_SAISIR_REQUETE, Droit.CONSULAIRE_ACCES_ESPACE_MES_REQUETES]}
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
        tousLesDroits={[Droit.TRANSCRIPTION_SAISIR_REQUETE]}
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
        tousLesDroits={[Droit.TRANSCRIPTION_CONSULTER_REQUETES]}
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
        tousLesDroits={[Droit.TRANSCRIPTION_CONSULTER_REQUETES]}
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
        tousLesDroits={[Droit.TRANSCRIPTION_CONSULTER_REQUETES]}
      >
        <PageRequeteTranscriptionSaisieProjet />
      </ElementPageRECE>
    )
  }
];
