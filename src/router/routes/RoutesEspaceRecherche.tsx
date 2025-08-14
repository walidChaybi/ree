import { Droit } from "@model/agent/enum/Droit";
import { RMCArchivePage } from "@pages/rechercheMultiCriteres/acteArchive/RMCArchivePage";
import { RMCActeInscriptionPage } from "@pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionPage";
import { RMCRequetePage } from "@pages/rechercheMultiCriteres/requete/RMCRequetePage";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RouteObject } from "react-router";
import { PageRMCActeInscription } from "../../pages/rmc/PageRMCActeInscription";
import ElementPageRECE from "../ElementPageRECE";
import {
  INFO_PAGE_RECHERCHE_ACTE,
  INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION,
  INFO_PAGE_RECHERCHE_REQUETE
} from "../infoPages/InfoPagesEspaceRecherche";

export const ROUTES_ESPACE_RECHERCHE: RouteObject[] = [
  {
    path: INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION}
        tousLesDroits={[Droit.CONSULTER]}
      >
        {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_UTILISER_NOUVELLE_RMC) ? (
          <PageRMCActeInscription />
        ) : (
          <RMCActeInscriptionPage
            noAutoScroll={false}
            dansFenetreExterne={false}
          />
        )}
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_RECHERCHE_REQUETE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_RECHERCHE_REQUETE}
        tousLesDroits={[Droit.CONSULTER]}
      >
        <RMCRequetePage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_RECHERCHE_ACTE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_RECHERCHE_REQUETE}
        uniquementLesDroits={[Droit.CONSULTER_ARCHIVES]}
      >
        <RMCArchivePage />
      </ElementPageRECE>
    )
  }
];
