import { ITypeAlerte } from "@model/etatcivil/enum/TypeAlerte";

export const TYPE_ALERTE: ITypeAlerte[] = [
  {
    id: "f844b79d-e8c4-4eaf-bdf2-76c2af51f7eb",
    nom: "TYPE_ALERTE",
    code: "NE_PAS_DELIVRER_AUTRE",
    libelle: "A ne pas délivrer dans SAGA",
    type: "A ne pas délivrer",
    sousType: "repris SAGA",
    description: "A ne pas délivrer dans SAGA"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aad",
    nom: "TYPE_ALERTE",
    code: "LEGITIMATION_ADOPTIVE",
    libelle: "Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description:
      "A délivrer sous conditions - Extrait à privilégier - Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
    nom: "TYPE_ALERTE",
    code: "PROBLEME_FONCTIONNEL",
    libelle: "Problème fonctionnel",
    type: "Problème fonctionnel",
    sousType: "Problème fonctionnel",
    description: "Problème fonctionnel"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aac",
    nom: "TYPE_ALERTE",
    code: "ENONCIATION_PROHIBEES",
    libelle: "Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description:
      "A délivrer sous conditions - Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aab",
    nom: "TYPE_ALERTE",
    code: "DELIVRANCE_COPIE_INTEGRALE",
    libelle: "Délivrance en copie intégrale à privilégier",
    type: "A délivrer sous conditions",
    sousType: "Copie intégrale à privilégier",
    description: "A délivrer sous conditions - Délivrance en copie intégrale à privilégier"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
    nom: "TYPE_ALERTE",
    code: "ATTENTE_NUMERISATION",
    libelle: "En attente de nouvelle numérisation",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - En attente de nouvelle numérisation"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa0",
    nom: "TYPE_ALERTE",
    code: "ACTE_DOUBLONS",
    libelle: "Actes en double, voir acte n°",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Actes en double, voir acte n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa9",
    nom: "TYPE_ALERTE",
    code: "TRAITEMENT_DOUBLONS",
    libelle: "Traitement doublons en cours",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Traitement doublons en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa8",
    nom: "TYPE_ALERTE",
    code: "SURSIS_EXPLOITATION_INSTRUCTION_PARQUET",
    libelle: "Sursis à exploitation, instructions au Parquet",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Sursis à exploitation, instructions au Parquet"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa7",
    nom: "TYPE_ALERTE",
    code: "EXTRANEITE_EPOUX_DOSSIER_PARQUET",
    libelle: "Extraénité des époux, dossier au Parquet en cours",
    type: "A ne pas délivrer",
    sousType: "Nationalité",
    description: "A ne pas délivrer - Nationalité - Extraénité des époux, dossier au Parquet en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa6",
    nom: "TYPE_ALERTE",
    code: "MARIAGE_INOPPOSABLE_FRANCE",
    libelle: "Mariage inopposable en France",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Mariage inopposable en France"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa2",
    nom: "TYPE_ALERTE",
    code: "ACTE_ANNULE_ADOPTION_PLENIERE",
    libelle: "Acte annulé, adoption plénière",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - acte annulé, adoption plénière"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa3",
    nom: "TYPE_ALERTE",
    code: "TRANSCRIPTION_ANNULATION_DOSSIER_PARQUET",
    libelle: "Transcription pour annulation, dossier au Parquet en cours",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Transcription pour annulation, dossier au Parquet en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa5",
    nom: "TYPE_ALERTE",
    code: "MARIAGE_ANNULE",
    libelle: "Mariage annulé",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Mariage annulé"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aae",
    nom: "TYPE_ALERTE",
    code: "PV_ABANDON",
    libelle: "Procès-verbal d'abandon qui tient lieu d'acte de naissance",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Procès-verbal d'abandon qui tient lieu d'acte de naissance"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aaf",
    nom: "TYPE_ALERTE",
    code: "ACTE_DESAVEU_PATERNITE",
    libelle: "Acte comportant une mention de désaveu de paternité",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Acte comportant une mention de désaveu de paternité"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab1",
    nom: "TYPE_ALERTE",
    code: "ACTE_CHANGEMENT_SEXE",
    libelle: "Actes comportant une mention de changement de sexe",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Actes comportant une mention de changement de sexe"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab2",
    nom: "TYPE_ALERTE",
    code: "RECTIFICATION",
    libelle: "Rectification en cours",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Rectification en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab3",
    nom: "TYPE_ALERTE",
    code: "PRECISER_CONDITIONS",
    libelle: "Préciser les conditions d'exploitation, les instructions du Parquet",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Préciser les conditions d'exploitation, les instructions du Parquet"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab4",
    nom: "TYPE_ALERTE",
    code: "CONSULTER_DOSSIER",
    libelle: "Consulter le dossier n°",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Consulter le dossier n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
    nom: "TYPE_ALERTE",
    code: "DELIVRANCE_RESERVE_PREUVE",
    libelle: "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description:
      "A délivrer sous conditions - Divers - Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab6",
    nom: "TYPE_ALERTE",
    code: "HOMONYMIE",
    libelle: "Homonymie, voir acte n°",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Homonymie, voir acte n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab7",
    nom: "TYPE_ALERTE",
    code: "DELIVRER_AUTORITE_JUDICIAIRE",
    libelle: "Ne délivrer qu'à une autorité judiciaire",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Ne délivrer qu'à une autorité judiciaire"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab8",
    nom: "TYPE_ALERTE",
    code: "ATTENTE_VERIFICATION",
    libelle: "En attente de vérification",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - En attente de vérification"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab9",
    nom: "TYPE_ALERTE",
    code: "ACTE_NON_NUMERISE",
    libelle: "Acte pas encore numérisé",
    type: "Acte non exploitable",
    sousType: "Acte non exploitable",
    description: "Acte non exploitable - Acte pas encore numérisé"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa1",
    nom: "TYPE_ALERTE",
    code: "ACTE_ANNULE",
    libelle: "Acte annulé",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Acte annulé"
  },
  {
    id: "b394ef34-2b40-44d7-b1a6-68c61e4fdfc5",
    nom: "TYPE_ALERTE",
    code: "PROBLEME_TECHNIQUE",
    libelle: "Problème technique",
    type: "Problème technique",
    sousType: "Problème technique",
    description: "Problème technique"
  },
  {
    id: "063cb865-1217-440d-861b-f777b995a59f",
    nom: "TYPE_ALERTE",
    code: "NON_EXPLOITABLE",
    libelle: "Non exploitable dans SAGA",
    type: "Acte non exploitable",
    sousType: "repris SAGA",
    description: "Acte non exploitable - repris SAGA"
  },
  {
    id: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
    nom: "TYPE_ALERTE",
    code: "INFORMATION_SAGA",
    libelle: "Information SAGA",
    type: "Description SAGA",
    sousType: "Repris SAGA",
    description: "Information SAGA"
  },
  {
    id: "6cc42860-9421-4224-be49-2c91309199cd",
    nom: "TYPE_ALERTE",
    code: "DELIVRER_SOUS_CONDITION_AUTRE",
    libelle: "A délivrer sous conditions dans SAGA",
    type: "A délivrer sous conditions",
    sousType: "repris SAGA",
    description: "A délivrer sous conditions dans SAGA"
  }
];
