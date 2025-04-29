/* istanbul ignore file */

import { Droit } from "@model/agent/enum/Droit";

export interface IHabiliationDescription {
  nomComposant: NomComposantOuFonction;
  unDesDroits?: Droit[];
  tousLesDroits?: Droit[];
  uniquementLeDroit?: Droit;
  comportementSiNonAutorise?: any;
  comportementSiAutorise?: any;
  visiblePourLesDroits?: Droit[];
  visibleSeulementPourLesDroits?: Droit[];
  verificationPerimetre?: boolean;
}
export type NomFonction = "";

export type NomComposant =
  | "LinkTabRequetesDelivranceService"
  | "LinkTabRequetesInfoService"
  | "LinkTabRequetesCreationService"
  | "BoutonAccueilEspaceCreation"
  | "BoutonAccueilEspaceConsulaire"
  | "BoutonAccueilCommunication"
  | "BoutonAccueilRechercheRequete"
  | "BoutonAccueilRechercheActeOuInscription"
  | "BoutonAccueilTableauDeBord"
  | "BoutonAccueilEspaceDelivrance"
  | "BoutonAccueilRechercheActe"
  | "MenuSaisirRequete"
  | "TabPanelRequetesDelivranceService"
  | "TabPanelRequetesInfoService"
  | "TabPanelRequetesCreationService"
  | "BoutonPrendreEnChargeAleatoirement"
  | "BoutonPrendreEnChargeAleatoirementInformation"
  | "BoutonPrendreEnChargePlusAncienneCreation"
  | "BoutonSignerLeLot"
  | "BoutonAccueilEspaceMiseAjour"
  | "BoutonAccueilTableau"
  | "MenuSaisirRequeteCreation";
export type NomComposantOuFonction = NomComposant | NomFonction;

const droitsSaufConsulterArchives = [
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
];

export const habilitationsDescription: IHabiliationDescription[] = [
  {
    nomComposant: "LinkTabRequetesDelivranceService",
    unDesDroits: [Droit.ATTRIBUER_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "LinkTabRequetesInfoService",
    unDesDroits: [Droit.ATTRIBUER_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "LinkTabRequetesCreationService",
    unDesDroits: [Droit.ATTRIBUER_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilEspaceDelivrance",
    unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC, Droit.CONSULTER],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilEspaceCreation",
    unDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_ETABLI],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilEspaceConsulaire",
    unDesDroits: [Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_DRESSE],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilCommunication",
    unDesDroits: [Droit.INFORMER_USAGER],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheRequete",
    unDesDroits: [Droit.CONSULTER],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheActeOuInscription",
    unDesDroits: [Droit.CONSULTER],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilRechercheActe",
    tousLesDroits: [Droit.CONSULTER_ARCHIVES],
    comportementSiNonAutorise: { disabled: true },
    visibleSeulementPourLesDroits: [Droit.CONSULTER_ARCHIVES]
  },
  {
    nomComposant: "MenuSaisirRequete",
    tousLesDroits: [Droit.SAISIR_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "MenuSaisirRequeteCreation",
    tousLesDroits: [Droit.SAISIR_REQUETE],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "TabPanelRequetesDelivranceService",
    visiblePourLesDroits: [Droit.ATTRIBUER_REQUETE]
  },
  {
    nomComposant: "TabPanelRequetesInfoService",
    visiblePourLesDroits: [Droit.ATTRIBUER_REQUETE]
  },
  {
    nomComposant: "TabPanelRequetesCreationService",
    visiblePourLesDroits: [Droit.ATTRIBUER_REQUETE]
  },
  {
    nomComposant: "BoutonPrendreEnChargeAleatoirement",
    unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonPrendreEnChargeAleatoirementInformation",
    unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonSignerLeLot",
    unDesDroits: [Droit.SIGNER_DELIVRANCE_DEMAT],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonPrendreEnChargePlusAncienneCreation",
    unDesDroits: [Droit.CREER_ACTE_DRESSE, Droit.CREER_ACTE_TRANSCRIT, Droit.CREER_ACTE_ETABLI],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilEspaceMiseAjour",
    unDesDroits: [Droit.METTRE_A_JOUR_ACTE, Droit.METTRE_A_JOUR_RC_RCA_PACS],
    comportementSiNonAutorise: { disabled: true },
    visiblePourLesDroits: droitsSaufConsulterArchives
  },
  {
    nomComposant: "BoutonAccueilTableau",
    tousLesDroits: [],
    comportementSiNonAutorise: { disabled: true }
  }
];
