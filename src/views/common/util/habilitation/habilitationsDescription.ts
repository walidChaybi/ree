import { Droit } from "../../../../model/Droit";
import { gestionnaireFeatureFlag } from "../featureFlag/gestionnaireFeatureFlag";
import { FeatureFlag } from "../featureFlag/FeatureFlag";

export interface IHabiliationDescription {
  nomComposant: NomComposant;
  unDesDroits?: Droit[];
  tousLesDroits?: Droit[];
  comportementSiNonAutorise: Object;
  comportementSiAutorise?: Object;
  nonvisibleSiNonAutorise?: boolean;
}

export type NomComposant =
  | "LinkTabMesRequetes"
  | "BoutonAccueilEspaceMiseAjour"
  | "BoutonAccueilEspaceCreation"
  | "BoutonAccueilCommunication"
  | "BoutonAccueilRechercheRequete"
  | "BoutonAccueilRechercheActeOuInscription";

///// ETAPE2 ////////////////////////////////////////////////////////////////
const etape2Active = gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2);
const etape2 = function (obj: Droit[]) {
  if (etape2Active) {
    return obj;
  }
  return [Droit.AUCUN];
};
///// ETAPE2 ////////////////////////////////////////////////////////////////

export const habilitationsDescription: IHabiliationDescription[] = [
  {
    nomComposant: "LinkTabMesRequetes",
    tousLesDroits: [Droit.ATTRIBUER],
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilEspaceMiseAjour",
    unDesDroits: etape2([
      Droit.METTRE_A_JOUR_ACTE,
      Droit.METTRE_A_JOUR_RC_RCA_PACS
    ]),
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilEspaceCreation",
    unDesDroits: etape2([
      Droit.CREER_ACTE_TRANSCRIT,
      Droit.CREER_ACTE_DRESSE,
      Droit.CREER_ACTE_ETABLI,
      Droit.CREER_PACS
    ]),
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilCommunication",
    unDesDroits: etape2([Droit.INFORMER_USAGER]),
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilRechercheRequete",
    unDesDroits: etape2([Droit.CONSULTER]),
    comportementSiNonAutorise: { disabled: true }
  },
  {
    nomComposant: "BoutonAccueilRechercheActeOuInscription",
    unDesDroits: etape2([Droit.CONSULTER]),
    comportementSiNonAutorise: { disabled: true }
  }
];
