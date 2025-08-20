import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ApercuRequeteEtablissementActeRegistrePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage";
import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { RouteObject } from "react-router";
import ElementPageRECE from "../ElementPageRECE";
import {
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE,
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION,
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET,
  INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER,
  INFO_PAGE_MES_REQUETES_ETABLISSEMENT,
  INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE
} from "../infoPages/InfoPagesEspaceEtablissement";

export const ROUTES_ESPACE_ETABLISSEMENT: RouteObject[] = [
  {
    path: INFO_PAGE_MES_REQUETES_ETABLISSEMENT.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MES_REQUETES_ETABLISSEMENT}
        tousLesDroits={[Droit.CREER_ACTE_ETABLI]}
      >
        <EspaceCreationPage selectedTab={0} />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE}
        tousLesDroits={[Droit.CREER_ACTE_ETABLI, Droit.ATTRIBUER_REQUETE]}
      >
        <EspaceCreationPage selectedTab={1} />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION}
        droitSurUnDesPerimetres={{ droit: Droit.CREER_ACTE_ETABLI, perimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX] }}
      >
        <ApercuRequeteEtablissementSimplePage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER}
        droitSurUnDesPerimetres={{ droit: Droit.CREER_ACTE_ETABLI, perimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX] }}
      >
        <ApercuRequeteEtablissementSuiviDossierPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET}
        droitSurUnDesPerimetres={{ droit: Droit.CREER_ACTE_ETABLI, perimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX] }}
      >
        <ApercuRequeteEtablissementSaisieDeProjetPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE}
        tousLesDroits={[Droit.SIGNER_ACTE]}
        droitSurUnDesPerimetres={{ droit: Droit.CREER_ACTE_ETABLI, perimetres: [Perimetre.TOUS_REGISTRES, Perimetre.ETAX] }}
      >
        <ApercuRequeteEtablissementActeRegistrePage />
      </ElementPageRECE>
    )
  }
];
