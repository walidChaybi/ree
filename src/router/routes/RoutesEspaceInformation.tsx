import { Droit } from "@model/agent/enum/Droit";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import { RouteObject } from "react-router";
import ElementPageRECE from "../ElementPageRECE";
import {
  INFO_PAGE_APERCU_REQUETE_INFORMATION,
  INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION,
  INFO_PAGE_MES_REQUETES_INFORMATION,
  INFO_PAGE_REQUETES_INFORMATION_SERVICE
} from "../infoPages/InfoPagesEspaceInformation";

export const ROUTES_ESPACE_INFORMATION: RouteObject[] = [
  {
    path: INFO_PAGE_MES_REQUETES_INFORMATION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MES_REQUETES_INFORMATION}
        tousLesDroits={[Droit.INFORMER_USAGER]}
      >
        <EspaceInformationPage selectedTab={0} />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_REQUETES_INFORMATION_SERVICE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_REQUETES_INFORMATION_SERVICE}
        tousLesDroits={[Droit.INFORMER_USAGER, Droit.ATTRIBUER_REQUETE]}
      >
        <EspaceInformationPage selectedTab={1} />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION}
        tousLesDroits={[Droit.INFORMER_USAGER]}
      >
        <ApercuReqInfoPage />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_APERCU_REQUETE_INFORMATION.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_APERCU_REQUETE_INFORMATION}
        tousLesDroits={[Droit.INFORMER_USAGER]}
      >
        <ApercuReqInfoPage />
      </ElementPageRECE>
    )
  }
];
