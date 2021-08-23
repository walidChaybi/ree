import { Adresse, Identite, Requerant } from "./ISaisirRequetePageModel";

// Nom des sous-formulaires
export const PARTENAIRE1 = "partenaire1";
export const PARTENAIRE2 = "partenaire2";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";

export interface SaisieRequeteRDAPC {
  [PARTENAIRE1]: Identite;
  [PARTENAIRE2]: Identite;
  [REQUERANT]: Requerant;
  [ADRESSE]: Adresse;
}
