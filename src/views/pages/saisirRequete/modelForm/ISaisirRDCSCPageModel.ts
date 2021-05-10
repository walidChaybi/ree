import { PieceJointe } from "../../../common/util/FileUtils";
// Nom des sous-formulaires
export const DOCUMENT = "document";
export const INTERESSE = "interesse";
export const REQUERANT = "requerant";
export const ADRESSE = "adresse";
export const PIECES_JOINTES = "piecesJointes";

// Commun
export const NOM_FAMILLE = "nomFamille";
export const NOM_USAGE = "nomUsage";
export const NOM = "nom";
export const PRENOM = "prenom";

// Noms des champs IdentiteForm
export const PRENOMS = "prenoms";
export const SEXE = "sexe";
export const NAISSANCE = "naissance";
export const NATIONALITE = "nationalite";

// Noms des champs RequerentForm
export const TYPE_REQUERANT = "typeRequerant";
export const MANDATAIRE = "mandataire";
export const INSTITUTI0NNEL = "institutionnel";
export const PARTICULIER = "particulier";

// Noms des champs MandataireForm, InstitutionnelForm
export const TYPE = "type";
export const NATURE = "nature";
export const RAISON_SOCIALE = "raisonSociale";
export const NOM_INSTITUTION = "nomInstitution";

// Noms des champs AdresseForm
export const VOIE = "voie";
export const LIEU_DIT = "lieuDit";
export const COMPLEMENT_DESTINATAIRE = "complementDestinataire";
export const COMPLEMENT_POINT_GEO = "complementPointGeo";
export const CODE_POSTAL = "codePostal";
export const COMMUNE = "commune";
export const PAYS = "pays";
export const ADRESSE_COURRIEL = "adresseCourriel";
export const NUMERO_TELEPHONE = "numeroTelephone";

// Noms des champs PrenomsForm
export const PRENOM_1 = "prenom1";
export const PRENOM_2 = "prenom2";
export const PRENOM_3 = "prenom3";

// Noms des champs NaissanceForm
export const DATE_NAISSANCE = "dateNaissance";
export const VILLE_NAISSANCE = "villeNaissance";
export const PAYS_NAISSANCE = "paysNaissance";

// Noms des champs DateComposeForm
export const JOUR = "jour";
export const MOIS = "mois";
export const ANNEE = "annee";

export interface SaisieRequeteRDCSC {
  [DOCUMENT]: string;
  [INTERESSE]: Identite;
  [REQUERANT]: Requerent;
  [ADRESSE]: Adresse;
  [PIECES_JOINTES]?: PieceJointe[];
}

export interface Requerent {
  [TYPE_REQUERANT]: string;
  [MANDATAIRE]: Mandataire;
  [INSTITUTI0NNEL]: Institutionnel;
  [PARTICULIER]: Particulier;
}

export interface Mandataire {
  [TYPE]: string;
  [NATURE]: string;
  [RAISON_SOCIALE]: string;
  [NOM]: string;
  [PRENOM]: string;
}

export interface Institutionnel {
  [TYPE]: string;
  [NATURE]: string;
  [NOM_INSTITUTION]: string;
  [NOM]: string;
  [PRENOM]: string;
}

export interface Particulier {
  [NOM_FAMILLE]: string;
  [NOM_USAGE]: string;
  [PRENOM]: string;
}

export interface Identite {
  [NOM_FAMILLE]: string;
  [NOM_USAGE]: string;
  [PRENOMS]: Prenoms;
  [SEXE]: string;
  [NAISSANCE]: Naissance;
  [NATIONALITE]: string;
}

export interface Adresse {
  [VOIE]: string;
  [LIEU_DIT]: string;
  [COMPLEMENT_DESTINATAIRE]: string;
  [COMPLEMENT_POINT_GEO]: string;
  [CODE_POSTAL]: string;
  [COMMUNE]: string;
  [PAYS]: string;
  [ADRESSE_COURRIEL]: string;
  [NUMERO_TELEPHONE]: string;
}

export interface Prenoms {
  [PRENOM_1]: string;
  [PRENOM_2]: string;
  [PRENOM_3]: string;
}

export interface Naissance {
  [DATE_NAISSANCE]: DateJourMoisAnne;
  [VILLE_NAISSANCE]: string;
  [PAYS_NAISSANCE]: string;
}

export interface DateJourMoisAnne {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}
