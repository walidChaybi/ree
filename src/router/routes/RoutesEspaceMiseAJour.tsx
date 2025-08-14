import { Droit } from "@model/agent/enum/Droit";
import { RouteObject } from "react-router";
import PageEditionRequeteMiseAJour from "../../pages/requetesMiseAJour/PageEditionRequeteMiseAJour";
import ElementPageRECE from "../ElementPageRECE";
import {
  INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE,
  INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE,
  INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS
} from "../infoPages/InfoPagesEspaceMiseAJour";

export const ROUTES_ESPACE_MISE_A_JOUR: RouteObject[] = [
  {
    path: INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS}
        tousLesDroits={[Droit.METTRE_A_JOUR_ACTE]}
      >
        <PageEditionRequeteMiseAJour estMiseAJourAvecMentions />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE}
        tousLesDroits={[Droit.METTRE_A_JOUR_ACTE]}
      >
        <PageEditionRequeteMiseAJour estMiseAJourAvecMentions />
      </ElementPageRECE>
    )
  },

  {
    path: INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url,
    element: (
      <ElementPageRECE
        infoPage={INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE}
        tousLesDroits={[Droit.MODIFIER_ANALYSE_MARGINALE]}
      >
        <PageEditionRequeteMiseAJour />
      </ElementPageRECE>
    )
  }
];
