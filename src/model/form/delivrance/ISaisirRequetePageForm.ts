import {
  ADRESSE_COURRIEL,
  ANNEE,
  AUTRE_PROFESSIONNEL,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_MOTIF,
  COMPLEMENT_POINT_GEO,
  DATE_EVENEMENT,
  DOCUMENT_DEMANDE,
  INSTITUTI0NNEL,
  JOUR,
  LIEN,
  LIEU_DIT,
  MANDATAIRE,
  MOIS,
  MOTIF,
  NAISSANCE,
  NATIONALITE,
  NATURE,
  NATURE_ACTE,
  NATURE_LIEN,
  NB_EXEMPLAIRE,
  NOM,
  NOMS,
  NOM_INSTITUTION,
  NOM_NAISSANCE,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENT1,
  PARENT2,
  PARTICULIER,
  PAYS,
  PAYS_EVENEMENT,
  PRENOM,
  PRENOMS,
  RAISON_SOCIALE,
  SEXE,
  TYPE,
  TYPE_MANDANT,
  TYPE_REQUERANT,
  VILLE_EVENEMENT,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";

export interface Requerant {
  [TYPE_REQUERANT]: string;
  [MANDATAIRE]: Mandataire;
  [INSTITUTI0NNEL]: Institutionnel;
  [PARTICULIER]: Particulier;
  [AUTRE_PROFESSIONNEL]: AutreProfessionnel;
}


export interface Mandataire {
  [TYPE]: string;
  [NATURE]: string;
  [RAISON_SOCIALE]: string;
  [NOM]: string;
  [PRENOM]: string;
}

export interface AutreProfessionnel {
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
  [NOM_NAISSANCE]: string;
  [NOM_USAGE]: string;
  [PRENOM]: string;
}

export interface Identite {
  [NOMS]: Noms;
  [PRENOMS]: Prenoms;
  [SEXE]: string;
  [NAISSANCE]: Evenement;
  [NATIONALITE]: string;
  [PARENT1]: Parent;
  [PARENT2]: Parent;
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

export interface Noms {
  [NOM_NAISSANCE]: string;
  [NOM_USAGE]: string;
}

export interface Prenoms {
  [key: string]: string;
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
  [NB_EXEMPLAIRE]: number;
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

export interface Parent {
  [NOM_NAISSANCE]: string;
  [PRENOMS]: Prenoms;
}
