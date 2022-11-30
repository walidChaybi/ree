import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  Adresse,
  Evenement,
  Identite,
  LienTitulaire,
  Mandant,
  Requerant,
  Requete
} from "./ISaisirRequetePageModel";

// Nom des sous-formulaires
export const REQUETE = "requete";
export const EVENEMENT = "evenement";
export const TITULAIRE1 = "titulaire1";
export const TITULAIRE2 = "titulaire2";
export const REQUERANT = "requerant";
export const MANDANT = "mandant";
export const LIEN_TITULAIRE = "lienTitulaire";
export const ADRESSE = "adresse";

export interface CreationRequeteRDC {
  saisie: SaisieRequeteRDC;
  refus?: boolean;
  futurStatut: StatutRequete;
}
export interface UpdateRequeteRDC {
  idRequete: string;
  saisie: SaisieRequeteRDC;
  refus?: boolean;
  futurStatut: StatutRequete;
}

export interface SaisieRequeteRDC {
  [REQUETE]: Requete;
  [EVENEMENT]: Evenement;
  [TITULAIRE1]: Identite;
  [TITULAIRE2]: Identite;
  [REQUERANT]: Requerant;
  [MANDANT]: Mandant;
  [LIEN_TITULAIRE]: LienTitulaire;
  [ADRESSE]: Adresse;
}
