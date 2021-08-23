export const ReponseAppelNomenclatureNatureRC = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/NATURE_RC",
  data: [
    {
      id: "058a436b-330d-4c3c-83e0-e49d27390121",
      nom: "NATURE_RC",
      code: "PRESOMPTION_ABSENCE",
      libelle: "présomption d'absence",
      estActif: true,
      usagePacs: null,
      type: "Requête",
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "ABSENCE"
    },
    {
      id: "058a436b-330d-4c3c-83e0-e49d27390122",
      nom: "NATURE_RC",
      code: "CO_CURATELLE_RENFORCEE",
      libelle: "co-curatelle renforcée",
      estActif: false,
      usagePacs: null,
      type: "Protection des majeurs",
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "CURATELLE"
    },
    {
      id: "058a436b-330d-4c3c-83e0-e49d27390123",
      nom: "NATURE_RC",
      code: "CURATELLE_512",
      libelle: "curatelle 512",
      estActif: false,
      usagePacs: null,
      type: "Protection des majeurs",
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "CURATELLE"
    },
    {
      id: "058a436b-330d-4c3c-83e0-e49d2739012d",
      nom: "NATURE_RC",
      code: "CURATELLE_SIMPLE",
      libelle: "curatelle simple",
      estActif: true,
      usagePacs: null,
      type: "Protection des majeurs",
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "CURATELLE"
    }
  ]
};

export const ReponseAppelNomenclatureNatureRCA = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/NATURE_RCA",
  data: [
    {
      id: "158a436b-330d-4c3c-83e0-e49d27390121",
      nom: "NATURE_RCA",
      code: "DECLARATION_JUDICIAIRE_ABSENCE",
      libelle: "déclaration judiciaire d'absence",
      estActif: true,
      usagePacs: null,
      type: null,
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "ABSENCE"
    },
    {
      id: "258a436b-330d-4c3c-83e0-e49d27390122",
      nom: "NATURE_RCA",
      code: "DECLARATION_JUDICIAIRE_DECES",
      libelle: "déclaration judiciaire de décès",
      estActif: true,
      usagePacs: null,
      type: null,
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "DECES"
    },
    {
      id: "358a436b-330d-4c3c-83e0-e49d27390123",
      nom: "NATURE_RCA",
      code: "MORT_DEPORTATION",
      libelle: "mort en déportation",
      estActif: true,
      usagePacs: null,
      type: null,
      sousType: null,
      decisionCouple: false,
      article: "la",
      categorieRCRCA: "DECES"
    }
  ]
};

export const ReponseAppelNomenclatureMandataire = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/MANDATAIRE",
  data: [
    {
      id: "158a436b-330d-4c3c-83e0-e49d27390124",
      nom: "MANDATAIRE",
      code: "MANDATAIRE_JUDICIAIRE_ASSOCIATION",
      libelle: "Mandataire judiciaire à la protection des majeurs association",
      estActif: true
    },
    {
      id: "258a436b-330d-4c3c-83e0-e49d27390125",
      nom: "MANDATAIRE",
      code: "MANDATAIRE_JUDICIAIRE_INDIVIDUEL",
      libelle: "Mandataire judiciaire à la protection des majeurs  individuel",
      estActif: true
    },
    {
      id: "358a436b-330d-4c3c-83e0-e49d27390126",
      nom: "MANDATAIRE",
      code: "MANDATAIRE_PREPOSE",
      libelle: "Préposé d’établissement",
      estActif: true
    },
    {
      id: "358a436b-330d-4c3c-83e0-e49d27390127",
      nom: "MANDATAIRE",
      code: "MANDATAIRE_FAMILLE",
      libelle: "Famille",
      estActif: true
    }
  ]
};

export const ReponseAppelNomenclatureDocummentDelivrance = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/nomenclature/DOCUMENT_DELIVRANCE",
  data: [
    {
      id: "d08e2228-1a02-478f-939e-db5dd5ac6999",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "ATTESTATION_PACS",
      libelle: "Attestation de PACS",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "attestation",
      correspondanceDila: true
    },
    {
      id: "34da88e2-c5c7-4324-ac8e-b35193352e64",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS",
      libelle: "Certificat de situation au PACS",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "b902e0a8-1cdb-48a6-841a-7fb77da22898",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RC",
      libelle: "Certificat de situation au PACS et RC",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "ec161aa5-5c0c-429d-abdf-f9017e8e26b4",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RCA",
      libelle: "Certificat de situation au PACS et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "25d725b1-d62e-4024-ba37-be5935a00869",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RC_RCA",
      libelle: "Certificat de situation au PACS, RC et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "0617a018-0f4b-4143-b593-0537c1536b09",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RC",
      libelle: "Certificat de situation au RC",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "2587ab13-cf95-4a99-95ea-62014a9d6309",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RC_RCA",
      libelle: "Certificat de situation au RC et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RCA",
      libelle: "Certificat de situation au RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "5fe1799c-121d-4027-88c4-4542f176513d",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COURRIER_NON_DELIVRANCE_ATTESTATION_PACS",
      libelle: "Courrier de non délivrance attestation PACS",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "bdf30e59-3447-4114-a127-aa1310337761",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COURRIER_REFUS_RESSORTISSANTS_FRANCAIS",
      libelle: "Courrier de refus ressortissants français",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "certificat",
      correspondanceDila: true
    },
    {
      id: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COPIE_INTEGRALE",
      libelle: "Copie intégrale",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "copie",
      correspondanceDila: true
    },
    {
      id: "8b808725-a83e-4ce5-81a2-192cd09e0cb2",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COPIE_ACTE_NON_SIGNEE",
      libelle: "Copie d'acte non signée",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "copie",
      correspondanceDila: true
    },
    {
      id: "28580709-06dd-4df2-bf6e-70a9482940a1",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_AVEC_FILIATION",
      libelle: "Extrait avec filiation",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "extrait",
      correspondanceDila: true
    },
    {
      id: "318a2726-0d04-4558-8b36-8fe48780def5",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_SANS_FILIATION",
      libelle: "Extrait sans filiation",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "extrait",
      correspondanceDila: true
    },
    {
      id: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_PLURILINGUE",
      libelle: "Extrait plurilingue",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "extrait",
      correspondanceDila: true
    }
  ],
  errors: []
};

export const ReponseAppelNomenclatureTypePiecesJustificative = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/nomenclature/TYPE_PIECE_JUSTIFICATIVE",
  data: [
    {
      id: "00c885c9-2918-46fe-b743-798b1b90e5dd",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "CARTE_PROFESSIONNELLE",
      libelle: "Carte professionnelle",
      estActif: true,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: "attestation",
      correspondanceDila: true
    },
    {
      id: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "MANDAT",
      libelle: "Mandat",
      estActif: true,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null
    },
    {
      id: "ab32e570-9171-4760-ac66-851e52110a27",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "DECISION_PROTECTION",
      libelle: "Décision de mise sous protection",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null
    },
    {
      id: "d2aa8943-d904-4f4f-bb4b-72d02978ef2e",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "AUTRE",
      libelle: "Autre",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null
    }
  ],
  errors: []
};

export const ReponseAppelNomenclatureTypeAlerte = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/TYPE_ALERTE",
  data: [
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa1",
      nom: "TYPE_ALERTE",
      code: "ACTE_ANNULE",
      libelle: "Acte annulé",
      type: "A ne pas délivrer",
      sousType: "Annulation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa2",
      nom: "TYPE_ALERTE",
      code: "ACTE_ANNULE_ADOPTION_PLENIERE",
      libelle: "Acte annulé, adoption plénière",
      type: "A ne pas délivrer",
      sousType: "Annulation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa3",
      nom: "TYPE_ALERTE",
      code: "TRANSCRIPTION_ANNULATION_DOSSIER_PARQUET",
      libelle: "Transcription pour annulation, dossier au Parquet en cours",
      type: "A ne pas délivrer",
      sousType: "Annulation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa5",
      nom: "TYPE_ALERTE",
      code: "MARIAGE_ANNULE",
      libelle: "Mariage annulé",
      type: "A ne pas délivrer",
      sousType: "Annulation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa6",
      nom: "TYPE_ALERTE",
      code: "MARIAGE_INOPPOSABLE_FRANCE",
      libelle: "Mariage inopposable en France",
      type: "A ne pas délivrer",
      sousType: "Annulation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa7",
      nom: "TYPE_ALERTE",
      code: "EXTRANEITE_EPOUX_DOSSIER_PARQUET",
      libelle: "Extraénité des époux, dossier au Parquet en cours",
      type: "A ne pas délivrer",
      sousType: "Nationalité"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa8",
      nom: "TYPE_ALERTE",
      code: "SURSIS_EXPLOITATION_INSTRUCTION_PARQUET",
      libelle: "Sursis à exploitation, instructions au Parquet",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa9",
      nom: "TYPE_ALERTE",
      code: "TRAITEMENT_DOUBLONS",
      libelle: "Traitement doublons en cours",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa0",
      nom: "TYPE_ALERTE",
      code: "ACTE_DOUBLONS",
      libelle: "Actes en double, voir acte n°",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
      nom: "TYPE_ALERTE",
      code: "ATTENTE_NUMERISATION",
      libelle: "En attente de nouvelle numérisation",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aab",
      nom: "TYPE_ALERTE",
      code: "DELIVRANCE_COPIE_INTEGRALE",
      libelle: "Délivrance en copie intégrale à privilégier",
      type: "A délivrer sous conditions",
      sousType: "Copie intégrale à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aac",
      nom: "TYPE_ALERTE",
      code: "ENONCIATION_PROHIBEES",
      libelle:
        "Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aad",
      nom: "TYPE_ALERTE",
      code: "LEGITIMATION_ADOPTIVE",
      libelle:
        "Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aae",
      nom: "TYPE_ALERTE",
      code: "PV_ABANDON",
      libelle: "Procès-verbal d'abandon qui tient lieu d'acte de naissance",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aaf",
      nom: "TYPE_ALERTE",
      code: "ACTE_DESAVEU_PATERNITE",
      libelle: "Acte comportant une mention de désaveu de paternité",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab1",
      nom: "TYPE_ALERTE",
      code: "ACTE_CHANGEMENT_SEXE",
      libelle: "Actes comportant une mention de changement de sexe",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab2",
      nom: "TYPE_ALERTE",
      code: "RECTIFICATION",
      libelle: "Rectification en cours",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab3",
      nom: "TYPE_ALERTE",
      code: "PRECISER_CONDITIONS",
      libelle:
        "Préciser les conditions d'exploitation, les instructions du Parquet",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab4",
      nom: "TYPE_ALERTE",
      code: "CONSULTER_DOSSIER",
      libelle: "Consulter le dossier n°",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
      nom: "TYPE_ALERTE",
      code: "DELIVRANCE_RESERVE_PREUVE",
      libelle:
        "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab6",
      nom: "TYPE_ALERTE",
      code: "HOMONYMIE",
      libelle: "Homonymie, voir acte n°",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab7",
      nom: "TYPE_ALERTE",
      code: "DELIVRER_AUTORITE_JUDICIAIRE",
      libelle: "Ne délivrer qu'à une autorité judiciaire",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab8",
      nom: "TYPE_ALERTE",
      code: "ATTENTE_VERIFICATION",
      libelle: "En attente de vérification",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions "
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab9",
      nom: "TYPE_ALERTE",
      code: "ACTE_NON_NUMERISE",
      libelle: "Acte pas encore numérisé",
      type: "Acte non exploitable",
      sousType: "Acte non exploitable"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
      nom: "TYPE_ALERTE",
      code: "PROBLEME_FONCTIONNEL",
      libelle: "Problème fonctionnel",
      type: "Problème fonctionnel",
      sousType: "Problème fonctionnel"
    },
    {
      id: "f844b79d-e8c4-4eaf-bdf2-76c2af51f7eb",
      nom: "TYPE_ALERTE",
      code: "NE_PAS_DELIVRER_AUTRE",
      libelle: "A ne pas délivrer dans SAGA",
      type: "A ne pas délivrer",
      sousType: "repris SAGA"
    },
    {
      id: "6cc42860-9421-4224-be49-2c91309199cd",
      nom: "TYPE_ALERTE",
      code: "DELIVRER_SOUS_CONDITION_AUTRE",
      libelle: "A délivrer sous conditions dans SAGA",
      type: "A délivrer sous conditions",
      sousType: "repris SAGA"
    },
    {
      id: "063cb865-1217-440d-861b-f777b995a59f",
      nom: "TYPE_ALERTE",
      code: "NON_EXPLOITABLE",
      libelle: "Non exploitable dans SAGA",
      type: "Acte non exploitable",
      sousType: "repris SAGA"
    },
    {
      id: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
      nom: "TYPE_ALERTE",
      code: "INFORMATION_SAGA",
      libelle: "Information SAGA",
      type: "Description SAGA",
      sousType: "Repris SAGA"
    }
  ],
  errors: []
};
