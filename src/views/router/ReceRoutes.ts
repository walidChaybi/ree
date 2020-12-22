/* istanbul ignore file */

import EspaceDelivrancePage from "../pages/espaceDelivrance/EspaceDelivrancePage";
import { AccueilPage } from "../pages/accueil/AccueilPage";
import { RouteComponentProps } from "react-router";
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
  URL_RC_RCA
} from "./ReceUrls";
import { RcRcaPage } from "../pages/RcRcaPage";
import { FeatureFlag } from "../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../common/util/featureFlag/gestionnaireFeatureFlag";

export interface IRouteRece {
  component?: any;
  url: string;
  props?: Object;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  droits?: Droit[];
  canAccess?: boolean;
}

export const routesRece: IRouteRece[] = [
  {
    url: URL_ACCUEIL,
    component: AccueilPage
  },
  {
    url: URL_CONTEXT_APP,
    component: AccueilPage
  },
  {
    url: URL_MES_REQUETES,
    component: EspaceDelivrancePage,
    props: { selectedTab: 0 }
  },
  {
    url: URL_REQUETES_SERVICE,
    component: EspaceDelivrancePage,
    props: { selectedTab: 1 },
    droits: [Droit.ATTRIBUER]
  },
  {
    url: URL_MES_REQUETES_ID,
    component: ApercuRequetePage
  },
  {
    url: URL_REQUETES_SERVICE_ID,
    component: ApercuRequetePage
  },
  {
    url: URL_DECONNEXION,
    component: LoginPage,
    props: { messageLogin: "pages.login.deconnexion" }
  },
  {
    url: URL_RC_RCA,
    component: RcRcaPage,
    canAccess: gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2)
  }
];
