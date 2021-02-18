/* istanbul ignore file */

import { Droit } from "../../../../model/Droit";
import { gestionnaireFeatureFlag } from "../featureFlag/gestionnaireFeatureFlag";
import { FeatureFlag } from "../featureFlag/FeatureFlag";

export interface IHabiliationDescription {
  nomComposant: NomComposant;
  unDesDroits?: Droit[];
  tousLesDroits?: Droit[];
  comportementSiNonAutorise: Object;
  comportementSiAutorise?: Object;
  visiblePourLesDroits?: Droit[];
  visibleSeulementPourLesDroits?: Droit[];
}

export type NomComposant =
  | "LinkTabMesRequetes"
  | "BoutonAccueilEspaceMiseAjour"
  | "BoutonAccueilEspaceCreation"
  | "BoutonAccueilCommunication"
  | "BoutonAccueilRechercheRequete"
  | "BoutonAccueilRechercheActeOuInscription"
  | "BoutonAccueilTableauDeBord"
  | "BoutonAccueilEspaceDelivrance"
  | "BoutonAccueilRechercheActe"
  | "BoutonAccueilTableau";

///// ETAPE2 ////////////////////////////////////////////////////////////////
const etape2Active = gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2);
const etape2 = function (obj: Droit[]) {
  if (etape2Active) {
    return obj;
  }
  return [Droit.AUCUN];
};
///// ETAPE2 ////////////////////////////////////////////////////////////////

export const droitsSaufConsulterArchives = [
  Droit.CREER_ACTE_DRESSE,
  Droit.CREER_ACTE_ETABLI,
  Droit.CREER_ACTE_TRANSCRIT,
  Droit.CREER_PACS,
  Droit.DELIVRER,
  Droit.INFORMER_USAGER,
  Droit.METTRE_A_JOUR_ACTE,
  Droit.METTRE_A_JOUR_RC_RCA_PACS,
  Droit.SIGNER,
  Droit.CONSULTER,
  Droit.ATTRIBUER
];

export const habilitationsDescription: IHabiliationDescription[] = [
  {
    nomComposant: "LinkTabMesRequetes",
    tousLesDroits: [Droit.ATTRIBUER],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilEspaceDelivrance",
    unDesDroits: droitsSaufConsulterArchives,
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilEspaceMiseAjour",
    unDesDroits: etape2([
      Droit.METTRE_A_JOUR_ACTE,
      Droit.METTRE_A_JOUR_RC_RCA_PACS
    ]),
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilEspaceCreation",
    unDesDroits: etape2([
      Droit.CREER_ACTE_TRANSCRIT,
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_PACS
    ]),
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilCommunication",
    unDesDroits: etape2([Droit.INFORMER_USAGER]),
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheRequete",
    unDesDroits: etape2([Droit.CONSULTER]),
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheActeOuInscription",
    unDesDroits: etape2([Droit.CONSULTER]),
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheActe",
    tousLesDroits: etape2([Droit.CONSULTER_ARCHIVES]),
    comportementSiNonAutorise: { disabled: true },
    visibleSeulementPourLesDroits: [Droit.CONSULTER_ARCHIVES]
  },
  {
    nomComposant: "BoutonAccueilTableau",
    tousLesDroits: etape2([]),
    comportementSiNonAutorise: { disabled: true }
  }
];
