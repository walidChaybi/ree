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

export const ReponseAppelNomenclatureDocummentDelivrance = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/nomenclature/DOCUMENT_DELIVRANCE",
  data: [
    {
      id: "d08e2228-1a02-478f-939e-db5dd5ac6999",
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
      nom: "DOCUMENT_DELIVRANCE",
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
