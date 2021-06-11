// Nom des sous-formulaires

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
export const PARENT1 = "parent1";
export const PARENT2 = "parent2";

// Noms des champs RequerentForm
export const TYPE_REQUERANT = "typeRequerant";
export const MANDATAIRE = "mandataire";
export const INSTITUTI0NNEL = "institutionnel";
export const PARTICULIER = "particulier";
export const AUTRE_PROFESSIONNEL = "autreProfessionnel";

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

// Noms des champs EvenementForm
export const DATE_EVENEMENT = "dateEvenement";
export const VILLE_EVENEMENT = "villeEvenement";
export const PAYS_EVENEMENT = "paysEvenement";

// Noms des champs DateComposeForm
export const JOUR = "jour";
export const MOIS = "mois";
export const ANNEE = "annee";

// Noms des champs RequeteForm
export const NATURE_ACTE = "natureActe";
export const DOCUMENT_DEMANDE = "documentDemande";
export const NB_EXEMPLAIRE = "nbExemplaire";
export const MOTIF = "motif";
export const COMPLEMENT_MOTIF = "complementMotif";

// Noms des champs MandantForm
export const TYPE_MANDANT = "typeMandant";

// Noms des champs LienTitulaireForm
export const LIEN = "lien";
export const NATURE_LIEN = "natureLien";

export interface Requerant {
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
  [NAISSANCE]: Evenement;
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

export interface Evenement {
  [DATE_EVENEMENT]: DateJourMoisAnne;
  [VILLE_EVENEMENT]: string;
  [PAYS_EVENEMENT]: string;
}

export interface DateJourMoisAnne {
  [JOUR]: string;
  [MOIS]: string;
  [ANNEE]: string;
}

export interface Requete {
  [NATURE_ACTE]: string;
  [DOCUMENT_DEMANDE]: string;
  [NB_EXEMPLAIRE]: string;
  [MOTIF]: string;
  [COMPLEMENT_MOTIF]: string;
}

export interface Mandant {
  [TYPE_MANDANT]: string;
  [NOM]: string;
  [PRENOM]: string;
  [RAISON_SOCIALE]: string;
}

export interface LienTitulaire {
  [LIEN]: string;
  [NATURE_LIEN]: string;
}
