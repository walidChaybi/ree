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
    },
    {
      id: "058a436b-330d-4c3c-83e0-e49d27390138",
      nom: "NATURE_RC",
      code: "TUTELLE_AMENAGEE",
      libelle: "tutelle aménagée",
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
      categorieDocumentDelivrance: "Attestation",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "34da88e2-c5c7-4324-ac8e-b35193352e64",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS",
      libelle: "Certificat de situation au PACS",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "b902e0a8-1cdb-48a6-841a-7fb77da22898",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RC",
      libelle: "Certificat de situation au PACS et RC",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "ec161aa5-5c0c-429d-abdf-f9017e8e26b4",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RCA",
      libelle: "Certificat de situation au PACS et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "25d725b1-d62e-4024-ba37-be5935a00869",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_PACS_RC_RCA",
      libelle: "Certificat de situation au PACS, RC et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "0617a018-0f4b-4143-b593-0537c1536b09",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RC",
      libelle: "Certificat de situation au RC",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "2587ab13-cf95-4a99-95ea-62014a9d6309",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RC_RCA",
      libelle: "Certificat de situation au RC et RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION_RCA",
      libelle: "Certificat de situation au RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation demandé",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "5fe1799c-121d-4027-88c4-4542f176513d",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_PAC_01",
      libelle: "Courrier de non délivrance attestation PACS",
      estActif: true,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "bdf30e59-3447-4114-a127-aa1310337761",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_CSPAC_02",
      libelle: "Courrier de refus ressortissants français",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COPIE_INTEGRALE",
      libelle: "Copie intégrale",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Copie intégrale",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "8b808725-a83e-4ce5-81a2-192cd09e0cb2",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "COPIE_NON_SIGNEE",
      libelle: "Copie intégrale archive",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Copie non signée",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "28580709-06dd-4df2-bf6e-70a9482940a1",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_AVEC_FILIATION",
      libelle: "Extrait avec filiation",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Extrait avec filiation",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "318a2726-0d04-4558-8b36-8fe48780def5",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_SANS_FILIATION",
      libelle: "Extrait sans filiation",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Extrait sans filiation",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "EXTRAIT_PLURILINGUE",
      libelle: "Extrait avec filiation plurilingue",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Extrait avec filiation plurilingue",
      correspondanceDila: true,
      texteLibre: null
    },
    {
      id: "062526c5-e5a7-48d1-bc22-11938347f0bc",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_PTA",
      libelle: "Proposition de transcription d'acte",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Acte non détenu au SCEC",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "db0a3d5a-34ca-47bf-bce5-33ec7ffb9148",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_APR",
      libelle: "Attestation de pension de réversion",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Acte non détenu au SCEC",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "002f64ff-b3da-4ff1-8f81-704059134327",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_24",
      libelle: "Acte de naissance non trouvé pour mariage (24)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Acte non détenu au SCEC",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "c40bccfd-8e65-47fc-a3eb-1d25d7779a29",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_64",
      libelle: "Acte non trouvé Algérie (64)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Acte non détenu au SCEC",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "c1c17758-98ce-444e-82eb-a4f885fddc2c",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_115",
      libelle: "Acte non trouvé (115)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Acte non détenu au SCEC",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "fd2c6d07-367f-4770-994c-397c0bc63fba",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_19",
      libelle: "Justificatif représentant légal manquant (19)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Requête incomplète",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "0296fc7a-fb81-4eb7-a72f-94286b8d8301",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_18",
      libelle: "Mandat généalogiste manquant (18)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Requête incomplète",
      correspondanceDila: true,
      texteLibre: false
    },
    {
      id: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_117",
      libelle: "Informations diverses manquantes (117)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier sans délivrance E/C - Requête incomplète",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "2776c0c7-2ad4-4949-9743-046c4c687eec",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_RDM",
      libelle: "Refus délivrance mariage",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance E/C - Divers",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "fce55a9f-4f4b-4996-a60b-59332bc10565",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_EC_17",
      libelle: "Divers (17)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance E/C - Divers",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "34877875-f86f-4a62-9bdc-c0989ad6c4eb",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CAD_ARCH_118",
      libelle: "Délivrance d'acte non authentique (118)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance:
        "Courrier avec délivrance E/C - Copie archive",
      correspondanceDila: true,
      texteLibre: false
    },
    {
      id: "4b60aab4-2e9f-479c-bec6-f38edbd6e647",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CAD_EC_50",
      libelle: "Délivrance d'acte incomplet (50)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier avec délivrance E/C",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CAD_EC_116",
      libelle: "Délivrance d'acte (116)",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier avec délivrance E/C",
      correspondanceDila: true,
      texteLibre: true
    },
    {
      id: "d407f403-ca22-4e06-9c46-b7ab7fa5b9fc",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_INSCRIPTION_RCA",
      libelle: "Certificat d'inscription au RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat d'inscription",
      correspondanceDila: false,
      texteLibre: null
    },
    {
      id: "5ce13f3a-d98c-401a-a2fe-8fde23878b4c",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_CS_01",
      libelle:
        "Courrier de non délivrance certificat de situation - mariage actif",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
      correspondanceDila: false,
      texteLibre: null
    },
    {
      id: "0c82b27a-7ade-4dce-aa61-b88f07726c1b",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CARN_CSPAC_01",
      libelle: "Courrier de refus demande incomplète ou illisible PACS/RC/RCA",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
      correspondanceDila: false,
      texteLibre: null
    },

    {
      id: "516f0133-1618-444e-ad41-59863c8c9412",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_INSCRIPTION_RC",
      libelle: "Certificat d'inscription au RC",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat d'inscription",
      correspondanceDila: false,
      texteLibre: null
    },
    {
      id: "46e32744-1056-4f96-af3e-e1df1ba9b6a4",
      categorie: "DOCUMENT_DELIVRANCE",
      code: "CERTIFICAT_SITUATION",
      libelle: "Certificat de situation",
      estActif: null,
      usageTeleprocedure: null,
      usageRECE: null,
      categorieDocumentDelivrance: "Certificat de situation délivré",
      correspondanceDila: false,
      texteLibre: null
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
      correspondanceDila: true,
      typeRequete: "DELIVRANCE"
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
      correspondanceDila: null,
      typeRequete: "DELIVRANCE"
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
      correspondanceDila: null,
      typeRequete: "DELIVRANCE"
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
      correspondanceDila: null,
      typeRequete: "DELIVRANCE"
    },
    {
      id: "877300ab-555a-418f-ab0d-9963610c36e2",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "AUTORISATION",
      libelle: "Autorisation de consultation",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "DELIVRANCE"
    },
    {
      id: "83b0f8c8-7800-443c-879a-fdb5ab5e2013",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "INFORMATION",
      libelle: "Pièce requête information",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "INFORMATION"
    },
    {
      id: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "CREATION",
      libelle: "Pièce requête création",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "CREATION"
    },
    {
      id: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "TRANSCRIPTION_ACTE",
      libelle: "Acte à transcrire",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "CREATION",
      typeRedactionActe: "TRANSCRIT"
    },
    {
      id: "6c95641f-59fe-4155-a6ba-8b42433c04ec",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "TRANSCRIPTION_TITULAIRE_ACTE",
      libelle: "Titulaire",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "CREATION",
      typeRedactionActe: "TRANSCRIT"
    },
    {
      id: "93e4f39b-0fc5-47f4-8434-2d362f897987",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "TRANSCRIPTION_PARENT_TITULAIRE_ACTE",
      libelle: "Parents du titulaire",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "CREATION",
      typeRedactionActe: "TRANSCRIT"
    },
    {
      id: "f14f8f0d-a146-48c3-a04e-285b9a2a4451",
      categorie: "TYPE_PIECE_JUSTIFICATIVE",
      code: "TRANSCRIPTION_AUTRE",
      libelle: "Autres pièces justificatives",
      estActif: null,
      usageTeleprocedure: true,
      usageRECE: true,
      categorieDocumentDelivrance: null,
      correspondanceDila: null,
      typeRequete: "CREATION",
      typeRedactionActe: "TRANSCRIT"
    }
  ],
  errors: []
};

export const ReponseAppelNomenclaturePaysSecabilite = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-requete-api/v2/nomenclature/TYPE_PIECE_JUSTIFICATIVE",
  data: [
    {
      id: "7bcfc85f-6f44-4f3d-a2a6-1a7647d85838",
      categorie: "PAYS_SECABILITE",
      code: "CUBA",
      libelle: "Cuba"
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
      sousType: "Annulation",
      description: "A ne pas délivrer - Annulation - Acte annulé"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa3",
      nom: "TYPE_ALERTE",
      code: "TRANSCRIPTION_ANNULATION_DOSSIER_PARQUET",
      libelle: "Transcription pour annulation, dossier au Parquet en cours",
      type: "A ne pas délivrer",
      sousType: "Annulation",
      description:
        "A ne pas délivrer - Annulation - Transcription pour annulation, dossier au Parquet en cours"
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
      description:
        "A délivrer sous conditions - Extrait à privilégier - Procès-verbal d'abandon qui tient lieu d'acte de naissance"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aaf",
      nom: "TYPE_ALERTE",
      code: "ACTE_DESAVEU_PATERNITE",
      libelle: "Acte comportant une mention de désaveu de paternité",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier",
      description:
        "A délivrer sous conditions - Extrait à privilégier - Acte comportant une mention de désaveu de paternité"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab1",
      nom: "TYPE_ALERTE",
      code: "ACTE_CHANGEMENT_SEXE",
      libelle: "Actes comportant une mention de changement de sexe",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier",
      description:
        "A délivrer sous conditions - Extrait à privilégier - Actes comportant une mention de changement de sexe"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab2",
      nom: "TYPE_ALERTE",
      code: "RECTIFICATION",
      libelle: "Rectification en cours",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions ",
      description:
        "A délivrer sous conditions - Divers - Rectification en cours"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab3",
      nom: "TYPE_ALERTE",
      code: "PRECISER_CONDITIONS",
      libelle:
        "Préciser les conditions d'exploitation, les instructions du Parquet",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions ",
      description:
        "A délivrer sous conditions - Divers - Préciser les conditions d'exploitation, les instructions du Parquet"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab4",
      nom: "TYPE_ALERTE",
      code: "CONSULTER_DOSSIER",
      libelle: "Consulter le dossier n°",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions ",
      description:
        "A délivrer sous conditions - Divers - Consulter le dossier n°"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
      nom: "TYPE_ALERTE",
      code: "DELIVRANCE_RESERVE_PREUVE",
      libelle:
        "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
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
      description:
        "A délivrer sous conditions - Divers - Homonymie, voir acte n°"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab7",
      nom: "TYPE_ALERTE",
      code: "DELIVRER_AUTORITE_JUDICIAIRE",
      libelle: "Ne délivrer qu'à une autorité judiciaire",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions ",
      description:
        "A délivrer sous conditions - Divers - Ne délivrer qu'à une autorité judiciaire"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390ab8",
      nom: "TYPE_ALERTE",
      code: "ATTENTE_VERIFICATION",
      libelle: "En attente de vérification",
      type: "A délivrer sous conditions",
      sousType: "Divers - délivrer sous conditions ",
      description:
        "A délivrer sous conditions - Divers - En attente de vérification"
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
      id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
      nom: "TYPE_ALERTE",
      code: "PROBLEME_FONCTIONNEL",
      libelle: "Problème fonctionnel",
      type: "Problème fonctionnel",
      sousType: "Problème fonctionnel",
      description: "Problème fonctionnel"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa6",
      nom: "TYPE_ALERTE",
      code: "MARIAGE_INOPPOSABLE_FRANCE",
      libelle: "Mariage inopposable en France",
      type: "A ne pas délivrer",
      sousType: "Annulation",
      description:
        "A ne pas délivrer - Annulation - Mariage inopposable en France"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa7",
      nom: "TYPE_ALERTE",
      code: "EXTRANEITE_EPOUX_DOSSIER_PARQUET",
      libelle: "Extraénité des époux, dossier au Parquet en cours",
      type: "A ne pas délivrer",
      sousType: "Nationalité",
      description:
        "A ne pas délivrer - Nationalité - Extraénité des époux, dossier au Parquet en cours"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa8",
      nom: "TYPE_ALERTE",
      code: "SURSIS_EXPLOITATION_INSTRUCTION_PARQUET",
      libelle: "Sursis à exploitation, instructions au Parquet",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer",
      description:
        "A ne pas délivrer - Divers - Sursis à exploitation, instructions au Parquet"
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
      id: "058a436b-330d-4c3c-83e0-d49c27390aa0",
      nom: "TYPE_ALERTE",
      code: "ACTE_DOUBLONS",
      libelle: "Actes en double, voir acte n°",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer",
      description: "A ne pas délivrer - Divers - Actes en double, voir acte n°"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
      nom: "TYPE_ALERTE",
      code: "ATTENTE_NUMERISATION",
      libelle: "En attente de nouvelle numérisation",
      type: "A ne pas délivrer",
      sousType: "Divers - ne pas délivrer",
      description:
        "A ne pas délivrer - Divers - En attente de nouvelle numérisation"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aab",
      nom: "TYPE_ALERTE",
      code: "DELIVRANCE_COPIE_INTEGRALE",
      libelle: "Délivrance en copie intégrale à privilégier",
      type: "A délivrer sous conditions",
      sousType: "Copie intégrale à privilégier",
      description:
        "A délivrer sous conditions - Délivrance en copie intégrale à privilégier"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aac",
      nom: "TYPE_ALERTE",
      code: "ENONCIATION_PROHIBEES",
      libelle:
        "Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier",
      description:
        "A délivrer sous conditions - Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aad",
      nom: "TYPE_ALERTE",
      code: "LEGITIMATION_ADOPTIVE",
      libelle:
        "Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions",
      type: "A délivrer sous conditions",
      sousType: "Extrait à privilégier",
      description:
        "A délivrer sous conditions - Extrait à privilégier - Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions"
    },
    {
      id: "6cc42860-9421-4224-be49-2c91309199cd",
      nom: "TYPE_ALERTE",
      code: "DELIVRER_SOUS_CONDITION_AUTRE",
      libelle: "A délivrer sous conditions dans SAGA",
      type: "A délivrer sous conditions",
      sousType: "repris SAGA",
      description: "A délivrer sous conditions dans SAGA"
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
      id: "b394ef34-2b40-44d7-b1a6-68c61e4fdfc5",
      nom: "TYPE_ALERTE",
      code: "PROBLEME_TECHNIQUE",
      libelle: "Problème technique",
      type: "Problème technique",
      sousType: "Problème technique",
      description: "Problème technique"
    },
    {
      id: "058a436b-330d-4c3c-83e0-d49c27390aa2",
      nom: "TYPE_ALERTE",
      code: "ACTE_ANNULE_ADOPTION_PLENIERE",
      libelle: "Acte annulé, adoption plénière",
      type: "A ne pas délivrer",
      sousType: "Annulation",
      description:
        "A ne pas délivrer - Annulation - acte annulé, adoption plénière"
    },
    {
      id: "f844b79d-e8c4-4eaf-bdf2-76c2af51f7eb",
      nom: "TYPE_ALERTE",
      code: "NE_PAS_DELIVRER_AUTRE",
      libelle: "A ne pas délivrer dans SAGA",
      type: "A ne pas délivrer",
      sousType: "repris SAGA",
      description: "A ne pas délivrer dans SAGA"
    }
  ],
  errors: []
};

export const ReponseAppelNomenclatureNatureMention = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/NATURE_MENTION",
  data: [
    {
      id: "26186600-3146-4e95-954b-6ac741ad421a",
      nom: "NATURE_MENTION",
      code: "28",
      libelle: "Dissolution du PACS",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "3fe1a991-6717-49cb-a208-a8fc09afc853",
      nom: "NATURE_MENTION",
      code: "29",
      libelle: "Modification du PACS",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "b03c5368-01a5-4027-981d-bfd165b358ae",
      nom: "NATURE_MENTION",
      code: "6",
      libelle: "Régime matrimonial",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
      nom: "NATURE_MENTION",
      code: "27",
      libelle: "Mariage",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03cd99d-3422-4d70-98b5-7da12277e179",
      nom: "NATURE_MENTION",
      code: "2",
      libelle: "PACS",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
      nom: "NATURE_MENTION",
      code: "12",
      libelle: "Lien de filiation hors adoption",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c3b1c-412b-4a94-93ba-ebbb457000b0",
      nom: "NATURE_MENTION",
      code: "14",
      libelle: "Pupille de la nation",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
      nom: "NATURE_MENTION",
      code: "15",
      libelle: "Annulation de mariage",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c5a85-cc38-4577-aaac-397cabf86ca3",
      nom: "NATURE_MENTION",
      code: "16",
      libelle: "Annulation de PACS",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03ce3f6-44a1-41b5-92eb-e4983cbad686",
      nom: "NATURE_MENTION",
      code: "7",
      libelle: "Contrat de mariage",
      estActif: false,
      opposableAuTiers: false
    },
    {
      id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
      nom: "NATURE_MENTION",
      code: "1",
      libelle: "Décès, absence",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
      nom: "NATURE_MENTION",
      code: "4",
      libelle: "Reprise vie commune",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
      nom: "NATURE_MENTION",
      code: "8",
      libelle: "Nationalité",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
      nom: "NATURE_MENTION",
      code: "9",
      libelle: "Extranéité",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c45b2-74c6-4cc5-9f64-4bad6f343598",
      nom: "NATURE_MENTION",
      code: "11",
      libelle: "Changement de sexe",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c5a32-397a-4ded-857b-798da72935d6",
      nom: "NATURE_MENTION",
      code: "10",
      libelle: "Changement nom, prénom, francisation",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
      nom: "NATURE_MENTION",
      code: "13",
      libelle: "Adoption simple",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
      nom: "NATURE_MENTION",
      code: "3",
      libelle: "Séparation de corps",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "b03cfc41-1821-496d-891c-87f963149600",
      nom: "NATURE_MENTION",
      code: "17",
      libelle:
        "Annulation/révocation d'une décision (absence, adoption simple)",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
      nom: "NATURE_MENTION",
      code: "18",
      libelle: "Annulation d'un événement",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
      nom: "NATURE_MENTION",
      code: "22",
      libelle: "RC radié",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
      nom: "NATURE_MENTION",
      code: "25",
      libelle:
        "Mort pour la France, Mort en déportation, Victime du terrorisme",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c07b4-922f-497d-83d8-434a09ee52ee",
      nom: "NATURE_MENTION",
      code: "26",
      libelle: "Acte de notoriété établissant la qualité d'héritier",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c38d7-0442-4291-85e5-649351dd6784",
      nom: "NATURE_MENTION",
      code: "99",
      libelle: "Autres",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
      nom: "NATURE_MENTION",
      code: "19",
      libelle: "Annulation d'une mention \"réputée non écrite",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
      nom: "NATURE_MENTION",
      code: "5",
      libelle: "Divorce",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "b03cc263-7d77-4027-a67b-286dd8754107",
      nom: "NATURE_MENTION",
      code: "24",
      libelle: 'Décision "validant" un acte',
      estActif: false,
      opposableAuTiers: false
    },
    {
      id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
      nom: "NATURE_MENTION",
      code: "20",
      libelle: "Rectification (hors annulation de mention)",
      estActif: true,
      opposableAuTiers: false
    },
    {
      id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
      nom: "NATURE_MENTION",
      code: "21",
      libelle: "RC",
      estActif: true,
      opposableAuTiers: true
    },
    {
      id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
      nom: "NATURE_MENTION",
      code: "23",
      libelle: "Annulation de l'acte",
      estActif: true,
      opposableAuTiers: false
    }
  ]
};

export const ReponseAppelNomenclatureTypeMention = {
  errors: [],
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/nomenclature/typemention",
  data: [
    {
      codeType: "1",
      libelleType: "Mariage",
      codeSousType: "1-1",
      libelleSousType: "Mariage célébré en France (mairie)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        nom: "NATURE_MENTION",
        code: "27",
        libelle: "Mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-2",
      libelleSousType: "Perte nationalité par décision judiciaire   ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "1",
      libelleType: "Mariage",
      codeSousType: "1-2",
      libelleSousType:
        "Mariage célébré à l'étranger (ambassade ou consulat) - acte dressé",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        nom: "NATURE_MENTION",
        code: "27",
        libelle: "Mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "1",
      libelleType: "Mariage",
      codeSousType: "1-3",
      libelleSousType:
        "Mariage célébré à l’étranger (autorité locale - acte transcrit ou établi) concernant un français",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        nom: "NATURE_MENTION",
        code: "27",
        libelle: "Mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "1",
      libelleType: "Mariage",
      codeSousType: "1-4",
      libelleSousType:
        "Mariage célébré en France dans un consulat étranger concernant deux époux dont l’un au moins est devenu français après le mariage",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        nom: "NATURE_MENTION",
        code: "27",
        libelle: "Mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "1",
      libelleType: "Mariage",
      codeSousType: "1-99",
      libelleSousType: "Mariage - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        nom: "NATURE_MENTION",
        code: "27",
        libelle: "Mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-1-a",
      libelleSousType: "Divorce en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-1-b",
      libelleSousType: "Séparation de corps en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-3-a",
      libelleSousType: "Divorce avec décision d'exequatur ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-3-b",
      libelleSousType: "Séparation de corps avec décision d'exequatur ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-6-a",
      libelleSousType: "Divorce à l'étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-6-b",
      libelleSousType: "Séparation de corps à l'étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-8",
      libelleSousType:
        "Annulation de mariage par jugement prononcé en France    ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-9",
      libelleSousType: "Reprise de la vie commune",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
        nom: "NATURE_MENTION",
        code: "4",
        libelle: "Reprise vie commune",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-97",
      libelleSousType: "Divorce - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-98",
      libelleSousType: "Séparation de corps - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "2",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "2-99",
      libelleSousType: "Annulation de mariage - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "3",
      libelleType: "Enregistrement/Modification/Dissolution/Annulation du PACS",
      codeSousType: "3-1",
      libelleSousType: "Enregistrement du PACS",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd99d-3422-4d70-98b5-7da12277e179",
        nom: "NATURE_MENTION",
        code: "2",
        libelle: "PACS",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "3",
      libelleType: "Enregistrement/Modification/Dissolution/Annulation du PACS",
      codeSousType: "3-2",
      libelleSousType: "Modification du PACS ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "3fe1a991-6717-49cb-a208-a8fc09afc853",
        nom: "NATURE_MENTION",
        code: "29",
        libelle: "Modification du PACS",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "3",
      libelleType: "Enregistrement/Modification/Dissolution/Annulation du PACS",
      codeSousType: "3-3",
      libelleSousType:
        "Dissolution du PACS (mariage, décès, rupture unilatérale ou conjointe)   ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "26186600-3146-4e95-954b-6ac741ad421a",
        nom: "NATURE_MENTION",
        code: "28",
        libelle: "Dissolution du PACS",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "3",
      libelleType: "Enregistrement/Modification/Dissolution/Annulation du PACS",
      codeSousType: "3-4",
      libelleSousType: "Annulation du PACS",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a85-cc38-4577-aaac-397cabf86ca3",
        nom: "NATURE_MENTION",
        code: "16",
        libelle: "Annulation de PACS",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "4",
      libelleType: "Décès",
      codeSousType: "4-1",
      libelleSousType: "Décès survenu en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        nom: "NATURE_MENTION",
        code: "1",
        libelle: "Décès, absence",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "4",
      libelleType: "Décès",
      codeSousType: "4-2",
      libelleSousType:
        "Décès survenu à l’étranger concernant un français (acte dressé ou transcrit)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        nom: "NATURE_MENTION",
        code: "1",
        libelle: "Décès, absence",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "4",
      libelleType: "Décès",
      codeSousType: "4-3",
      libelleSousType: "Décès dont la date n’est pas établie",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        nom: "NATURE_MENTION",
        code: "1",
        libelle: "Décès, absence",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "4",
      libelleType: "Décès",
      codeSousType: "4-4",
      libelleSousType: "Déclaration judiciaire de décès",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        nom: "NATURE_MENTION",
        code: "1",
        libelle: "Décès, absence",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "4",
      libelleType: "Décès",
      codeSousType: "4-99",
      libelleSousType: "Décès - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        nom: "NATURE_MENTION",
        code: "1",
        libelle: "Décès, absence",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "7",
      libelleType: "Reconnaissance",
      codeSousType: "7-1",
      libelleSousType: "Reconnaissance reçue par un officier de l’état civil",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "7",
      libelleType: "Reconnaissance",
      codeSousType: "7-2",
      libelleSousType: "Reconnaissance reçue par un notaire",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "7",
      libelleType: "Reconnaissance",
      codeSousType: "7-3",
      libelleSousType:
        "Reconnaissance reçue à l’étranger par les autorités locales concernant un Français (acte transcrit)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "7",
      libelleType: "Reconnaissance",
      codeSousType: "7-5",
      libelleSousType: "Annulation de reconnaissance    ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "7",
      libelleType: "Reconnaissance",
      codeSousType: "7-99",
      libelleSousType: "Reconnaissance - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "8",
      libelleType: "Filiation - Acte de notoriété",
      codeSousType: "8",
      libelleSousType: "Filiation - Acte de notoriété",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "9",
      libelleType: "Filiation (art. 311-14 et 311-17 C. civ.)",
      codeSousType: "9-1",
      libelleSousType:
        "Etablissement de la filiation en application de l’article 311-14 C. civ.",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "9",
      libelleType: "Filiation (art. 311-14 et 311-17 C. civ.)",
      codeSousType: "9-2",
      libelleSousType:
        "Etablissement de la filiation en application de l’article 311-17 C. civ.",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "9",
      libelleType: "Filiation (art. 311-14 et 311-17 C. civ.)",
      codeSousType: "9-99",
      libelleSousType: "Filiation (art. 311-14 et 311-17 C. civ.) - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "10",
      libelleType: "Filiation - Décision judiciaire",
      codeSousType: "10-1",
      libelleSousType: "Jugement déclaratif de paternité ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "10",
      libelleType: "Filiation - Décision judiciaire",
      codeSousType: "10-4",
      libelleSousType: "Jugement en constatation de la possession d’état",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "10",
      libelleType: "Filiation - Décision judiciaire",
      codeSousType: "10-5",
      libelleSousType: "Jugement en contestation de la paternité",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "10",
      libelleType: "Filiation - Décision judiciaire",
      codeSousType: "10-8",
      libelleSousType: "Jugement tranchant un conflit de filiation",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "10",
      libelleType: "Filiation - Décision judiciaire",
      codeSousType: "10-99",
      libelleSousType: "Filiation - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-1",
      libelleSousType: "Adoption simple prononcée en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-2",
      libelleSousType: "Adoption simple prononcée à l’étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-2-a",
      libelleSousType:
        "Adoption simple prononcée à l’étranger - Conséquence sur le nom de l’adopté",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-4",
      libelleSousType:
        "Adoption simple prononcée à l’étranger et déclarée exécutoire par jugement d’exequatur ",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-5",
      libelleSousType: "Révocation d’adoption simple (décision française)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cfc41-1821-496d-891c-87f963149600",
        nom: "NATURE_MENTION",
        code: "17",
        libelle:
          "Annulation/révocation d'une décision (absence, adoption simple)",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-98",
      libelleSousType: "Adoption simple - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "12",
      libelleType: "Adoption simple",
      codeSousType: "12-99",
      libelleSousType: "Adoption simple révocation - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cfc41-1821-496d-891c-87f963149600",
        nom: "NATURE_MENTION",
        code: "17",
        libelle:
          "Annulation/révocation d'une décision (absence, adoption simple)",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "13",
      libelleType: "Légitimation",
      codeSousType: "13-2",
      libelleSousType: "Légitimation par mariage (avant le 1er juillet 2006)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "13",
      libelleType: "Légitimation",
      codeSousType: "13-99",
      libelleSousType: "Légitimation - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "14",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "14-1",
      libelleSousType:
        "Changement de nom à la suite d'un décret (art. 61 C. civ.)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "14",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "14-2",
      libelleSousType: "Changement de nom par décision (art. 61-3-1 C. civ.)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "14",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "14-99",
      libelleSousType: "Changement de nom décret/décision - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "15",
      libelleType: "Changement de nom (art. 311-23 C. civ.)",
      codeSousType: "15",
      libelleSousType:
        "Déclaration conjointe de changement de nom  (art. 311-23 C. civ.)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "16",
      libelleType: "Déclaration conjointe de choix de nom",
      codeSousType: "16",
      libelleSousType: "Déclaration conjointe de choix de nom",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "17",
      libelleType: "Effet de la déclaration conjointe d’adjonction de nom",
      codeSousType: "17",
      libelleSousType:
        "Déclaration conjointe d'adjonction de nom (art. 23 de la loi n°2002-304)",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "18",
      libelleType: "Changement de prénom (art. 60 C. civ.), changement de sexe",
      codeSousType: "18-1",
      libelleSousType: "Changement de prénom par l'officier de l'état civil",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "18",
      libelleType: "Changement de prénom (art. 60 C. civ.), changement de sexe",
      codeSousType: "18-2",
      libelleSousType: "Changement de prénom par jugement",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "18",
      libelleType: "Changement de prénom (art. 60 C. civ.), changement de sexe",
      codeSousType: "18-3",
      libelleSousType: "Changement de sexe",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c45b2-74c6-4cc5-9f64-4bad6f343598",
        nom: "NATURE_MENTION",
        code: "11",
        libelle: "Changement de sexe",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "18",
      libelleType: "Changement de prénom (art. 60 C. civ.), changement de sexe",
      codeSousType: "18-99",
      libelleSousType: "Changement nom/prénoms - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "19",
      libelleType: "Francisation des nom et/ou prénom(s)",
      codeSousType: "19",
      libelleSousType: "Francisation des nom et/ou des prénom(s)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "19",
      libelleType: "Francisation des nom et/ou prénom(s)",
      codeSousType: "19-99",
      libelleSousType: "Francisation des nom et/ou des prénom(s) - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-1-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-1-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-2-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-2-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-3-a",
      libelleSousType:
        "Rectification administrative d'un acte hors article 99-1 - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "20",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "20-3-b",
      libelleSousType:
        "Rectification administrative d'un acte hors article 99-1 - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "21",
      libelleType: "Rectification judiciaire d’un acte ",
      codeSousType: "21-a",
      libelleSousType:
        "Rectification judiciaire d'un acte - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "21",
      libelleType: "Rectification judiciaire d’un acte ",
      codeSousType: "21-b",
      libelleSousType:
        "Rectification judiciaire d'un acte - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "21",
      libelleType: "Rectification judiciaire d’un acte ",
      codeSousType: "21-98",
      libelleSousType:
        'Rectification judiciaire, annulation d\'une mention "réputée non écrite" - Autres',
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "21",
      libelleType: "Rectification judiciaire d’un acte ",
      codeSousType: "21-99",
      libelleSousType:
        'Rectification judiciaire, hors annulation d\'une mention "réputée non écrite" - Autres',
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "22",
      libelleType: "Annulation de l’acte",
      codeSousType: "22-1",
      libelleSousType: "Annulation de l'acte par le procureur de la republique",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "22",
      libelleType: "Annulation de l’acte",
      codeSousType: "22-2",
      libelleSousType: "Annulation judiciaire de l'acte",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "23",
      libelleType: "Annulation d’une mention",
      codeSousType: "23-a",
      libelleSousType: "Annulation judiciaire d'une mention",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
        nom: "NATURE_MENTION",
        code: "18",
        libelle: "Annulation d'un événement",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "23",
      libelleType: "Annulation d’une mention",
      codeSousType: "23-b",
      libelleSousType: 'Mention "réputée non écrite" (procureur)',
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-1",
      libelleSousType: "Décret de naturalisation",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-2",
      libelleSousType: "Décret de réintégration",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-3",
      libelleSousType: "Effet collectif décret de naturalisation",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-4",
      libelleSousType: "Effet collectif décret de réintégration",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-5",
      libelleSousType: "Perte de la nationalité française par décret",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-8",
      libelleSousType:
        "Retrait de nationalité (décret de naturalisation rapporté)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-9",
      libelleSousType:
        "Retrait de nationalité (décret de réintégration rapporté)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "26",
      libelleType: "Décret de nationalité",
      codeSousType: "26-99",
      libelleSousType: "Extranéité - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "27",
      libelleType: "Déclaration d’acquisition de la nationalité française",
      codeSousType: "27-1-a",
      libelleSousType:
        "Acquisition nationalité art. 21-2, 21-13-1 et 21-13-2 C. civ.",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "27",
      libelleType: "Déclaration d’acquisition de la nationalité française",
      codeSousType: "27-1-b",
      libelleSousType:
        "Effet collectif acquisition nationalité art. 21-2, 21-13-1 et 21-13-2 C. civ.",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "27",
      libelleType: "Déclaration d’acquisition de la nationalité française",
      codeSousType: "27-2-a",
      libelleSousType: "Acquisition nationalité autres articles",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "27",
      libelleType: "Déclaration d’acquisition de la nationalité française",
      codeSousType: "27-2-b",
      libelleSousType:
        "Effet collectif acquisition nationalité autres articles",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "27",
      libelleType: "Déclaration d’acquisition de la nationalité française",
      codeSousType: "27-99",
      libelleSousType: "Déclaration d'acquisition nationalité - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "28",
      libelleType: "Déclaration de réintégration",
      codeSousType: "28-1",
      libelleSousType: "Déclaration de réintégration",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "28",
      libelleType: "Déclaration de réintégration",
      codeSousType: "28-2",
      libelleSousType:
        "Effet collectif de la réintégration dans la nationalité française",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "29",
      libelleType:
        "Déclaration tendant à répudier, perdre ou décliner la nationalité française",
      codeSousType: "29-1",
      libelleSousType:
        "Déclaration tendant à répudier la nationalité française ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "29",
      libelleType:
        "Déclaration tendant à répudier, perdre ou décliner la nationalité française",
      codeSousType: "29-2",
      libelleSousType: "Déclaration tendant à perdre la nationalité française",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "29",
      libelleType:
        "Déclaration tendant à répudier, perdre ou décliner la nationalité française",
      codeSousType: "29-99",
      libelleSousType:
        "Déclaration tendant à perdre ou à décliner la nationalité française - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "30",
      libelleType:
        "Déclaration tendant à renoncer à la faculté de répudier la nationalité française ",
      codeSousType: "30",
      libelleSousType:
        "Renonciation faculté de répudier la nationalité française",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-1",
      libelleSousType: "Acquisition nationalité par décision judiciaire    ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-3",
      libelleSousType: "Extranéité (n'est pas français(e))",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-4",
      libelleSousType:
        "Annulation d'une déclaration liée à la nationalité par décision judiciaire",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-98",
      libelleSousType: "Décision judiciaire nationalité - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "31",
      libelleType: "Décisions judiciaires de nationalité",
      codeSousType: "31-99",
      libelleSousType: "Décision judiciaire extranéité - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        nom: "NATURE_MENTION",
        code: "9",
        libelle: "Extranéité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "32",
      libelleType: "Certificat de nationalité française ",
      codeSousType: "32",
      libelleSousType: "Certificat de nationalité française ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        nom: "NATURE_MENTION",
        code: "8",
        libelle: "Nationalité",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: false
    },
    {
      codeType: "33",
      libelleType: "Répertoire civil ",
      codeSousType: "33-1",
      libelleSousType: "Inscription au répertoire civil ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
        nom: "NATURE_MENTION",
        code: "21",
        libelle: "RC",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "33",
      libelleType: "Répertoire civil ",
      codeSousType: "33-2",
      libelleSousType: "Radiation d'une inscription au répertoire civil",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
        nom: "NATURE_MENTION",
        code: "22",
        libelle: "RC radié",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "35",
      libelleType: "Adopté (e) par la nation",
      codeSousType: "35",
      libelleSousType: "Adopté(e) par la nation",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c3b1c-412b-4a94-93ba-ebbb457000b0",
        nom: "NATURE_MENTION",
        code: "14",
        libelle: "Pupille de la nation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "NAISSANCE",
      estSousType: true
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-1-a",
      libelleSousType: "Divorce en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-1-b",
      libelleSousType: "Séparation de corps en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-4-a",
      libelleSousType:
        "Divorce prononcé à l'étranger avec jugement d'exequatur ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-4-b",
      libelleSousType:
        "Séparation de corps prononcée à l'étranger avec jugement d'exequatur ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-4-c",
      libelleSousType:
        "Annulation de mariage prononcée à l'étranger avec jugement d'exequatur ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-5-a",
      libelleSousType: "Divorce à l'étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "55",
      libelleType: "Victime du terrorisme ",
      codeSousType: "55",
      libelleSousType: "Victime du terrorisme",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
        nom: "NATURE_MENTION",
        code: "25",
        libelle:
          "Mort pour la France, Mort en déportation, Victime du terrorisme",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-5-b",
      libelleSousType: "Séparation de corps à l'étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-5-c",
      libelleSousType: "Annulation de mariage à l'étranger",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-7",
      libelleSousType: "Annulation de mariage prononcée en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-8",
      libelleSousType: "Reprise de la vie commune",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-97",
      libelleSousType: "Divorce - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        nom: "NATURE_MENTION",
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-98",
      libelleSousType: "Séparation de corps - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
        nom: "NATURE_MENTION",
        code: "3",
        libelle: "Séparation de corps",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "39",
      libelleType:
        "Divorce/Séparation de corps/Annulation de mariage/Reprise de la vie commune",
      codeSousType: "39-99",
      libelleSousType: "Annulation de mariage - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        nom: "NATURE_MENTION",
        code: "15",
        libelle: "Annulation de mariage",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "40",
      libelleType: "Changement ou modification de régime matrimonial ",
      codeSousType: "40-1",
      libelleSousType:
        "Changement ou modification de régime matrimonial par décision judiciaire en France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "40",
      libelleType: "Changement ou modification de régime matrimonial ",
      codeSousType: "40-2",
      libelleSousType:
        "Changement ou modification de régime matrimonial par acte notarié en France (loi française)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "40",
      libelleType: "Changement ou modification de régime matrimonial ",
      codeSousType: "40-3",
      libelleSousType:
        "Changement de régime matrimonial par acte (loi étrangère)",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "40",
      libelleType: "Changement ou modification de régime matrimonial ",
      codeSousType: "40-4",
      libelleSousType:
        "Changement de régime matrimonial par décision judiciaire à l'étranger",
      estActif: true,
      modeInformatisation: "SEMI",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "40",
      libelleType: "Changement ou modification de régime matrimonial ",
      codeSousType: "40-99",
      libelleSousType: "Changement de régime matrimonial - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "41",
      libelleType:
        "Déclarations relatives au changement de régime matrimonial ",
      codeSousType: "41-1",
      libelleSousType: "Désignation de la loi applicable au régime matrimonial",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "41",
      libelleType:
        "Déclarations relatives au changement de régime matrimonial ",
      codeSousType: "41-99",
      libelleSousType: "Déclarations relatives au régime matrimonial - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5368-01a5-4027-981d-bfd165b358ae",
        nom: "NATURE_MENTION",
        code: "6",
        libelle: "Régime matrimonial",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "42",
      libelleType: "Etablissement d’un lien de filiation",
      codeSousType: "42-2",
      libelleSousType: "Adoption simple",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        nom: "NATURE_MENTION",
        code: "13",
        libelle: "Adoption simple",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "42",
      libelleType: "Etablissement d’un lien de filiation",
      codeSousType: "42-99",
      libelleSousType: "Lien de filiation - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        nom: "NATURE_MENTION",
        code: "12",
        libelle: "Lien de filiation hors adoption",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "43",
      libelleType: "Changement de prénom (art. 60 C. civ.)",
      codeSousType: "43-1",
      libelleSousType: "Changement de prénom(s) par décision (OEC)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "43",
      libelleType: "Changement de prénom (art. 60 C. civ.)",
      codeSousType: "43-2",
      libelleSousType: "Changement de prénom(s) par décision judiciaire",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "43",
      libelleType: "Changement de prénom (art. 60 C. civ.)",
      codeSousType: "43-99",
      libelleSousType: "Changement de prénom - Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "44",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "44-1",
      libelleSousType: "Changement de nom suite à un décret (art. 61 C. civ.)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "44",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "44-2",
      libelleSousType: "Changement de nom par décision (art. 61-3-1 C. civ.)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "44",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "44-3",
      libelleSousType:
        "Changement de nom et/ou prénom(s) prononcé à l'étranger (V.O)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "44",
      libelleType: "Changement de nom (art. 61 et 61-3-1 C. civ.)",
      codeSousType: "44-99",
      libelleSousType: "Changement de nom (art. 61 et 61-3-1 C.civ.) - Autres ",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "45",
      libelleType:
        "Francisation des nom et/ou prénom(s) après acquisition de la nationalité française du bénéficiaire marié ",
      codeSousType: "45",
      libelleSousType: "Francisation nom/prénom(s)",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c5a32-397a-4ded-857b-798da72935d6",
        nom: "NATURE_MENTION",
        code: "10",
        libelle: "Changement nom, prénom, francisation",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-1-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-1-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-2-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-2-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-3-a",
      libelleSousType:
        "Rectification administrative d'un acte hors article 99-1 (dont V.O) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "46",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "46-3-b",
      libelleSousType:
        "Rectification administrative d'un acte hors article 99-1 (dont V.O) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "47",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "47-a",
      libelleSousType:
        "Rectification judiciaire d'un acte - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "47",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "47-b",
      libelleSousType:
        "Rectification judiciaire d'un acte - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "47",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "47-98",
      libelleSousType:
        'Rectification judiciaire, annulation d\'une mention "réputée non écrite" - Autres',
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "47",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "47-99",
      libelleSousType:
        'Rectification judiciaire, hors annulation d\'une mention "réputée non écrite" - Autres',
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "48",
      libelleType: "Annulation de l’acte",
      codeSousType: "48-1",
      libelleSousType: "Annulation de l'acte par le procureur de la république",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "48",
      libelleType: "Annulation de l’acte",
      codeSousType: "48-2",
      libelleSousType: "Annulation judiciaire de l'acte",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "49",
      libelleType: "Annulation d’une mention ",
      codeSousType: "49-a",
      libelleSousType: "Annulation judiciaire d'une mention",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
        nom: "NATURE_MENTION",
        code: "18",
        libelle: "Annulation d'un événement",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: true
    },
    {
      codeType: "49",
      libelleType: "Annulation d’une mention ",
      codeSousType: "49-b",
      libelleSousType: 'Mention "réputée non écrite" (procureur)',
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "MARIAGE",
      estSousType: false
    },
    {
      codeType: "52",
      libelleType: "Mort pour la France",
      codeSousType: "52",
      libelleSousType: "Mort pour la France",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
        nom: "NATURE_MENTION",
        code: "25",
        libelle:
          "Mort pour la France, Mort en déportation, Victime du terrorisme",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: true
    },
    {
      codeType: "54",
      libelleType: "Mort pour le service de la Nation ",
      codeSousType: "54",
      libelleSousType: "Mort pour le service de la Nation ",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
        nom: "NATURE_MENTION",
        code: "25",
        libelle:
          "Mort pour la France, Mort en déportation, Victime du terrorisme",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "56",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "56-1-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: true
    },
    {
      codeType: "56",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "56-1-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "56",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "56-2-a",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "56",
      libelleType: "Rectification administrative d’un acte",
      codeSousType: "56-2-b",
      libelleSousType:
        "Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "57",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "57-a",
      libelleSousType:
        "Rectification judiciaire d'un acte - Annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
        nom: "NATURE_MENTION",
        code: "19",
        libelle: "Annulation d'une mention \"réputée non écrite",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "57",
      libelleType: "Rectification judiciaire d’un acte",
      codeSousType: "57-b",
      libelleSousType:
        "Rectification judiciaire d'un acte - Hors annulation d'une mention \"réputée non écrite",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        nom: "NATURE_MENTION",
        code: "20",
        libelle: "Rectification (hors annulation de mention)",
        estActif: true,
        opposableAuTiers: true
      },
      natureActe: "DECES",
      estSousType: true
    },
    {
      codeType: "58",
      libelleType: "Annulation de l’acte",
      codeSousType: "58-1",
      libelleSousType: "Annulation de l'acte par le procureur de la république",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: false
    },
    {
      codeType: "58",
      libelleType: "Annulation de l’acte",
      codeSousType: "58-2",
      libelleSousType: "Annulation judiciaire de l'acte",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        nom: "NATURE_MENTION",
        code: "23",
        libelle: "Annulation de l'acte",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: true
    },
    {
      codeType: "62",
      libelleType: "Acte de notoriété établissant la qualité d'héritier",
      codeSousType: "62",
      libelleSousType: "Acte de notoriété établissant la qualité d'héritier",
      estActif: true,
      modeInformatisation: "OUI",
      nature: {
        id: "b03c07b4-922f-497d-83d8-434a09ee52ee",
        nom: "NATURE_MENTION",
        code: "26",
        libelle: "Acte de notoriété établissant la qualité d'héritier",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "DECES",
      estSousType: true
    },
    {
      codeType: "99",
      libelleType: "Autres",
      codeSousType: "99-99",
      libelleSousType: "Autres",
      estActif: true,
      modeInformatisation: "NON",
      nature: {
        id: "b03c38d7-0442-4291-85e5-649351dd6784",
        nom: "NATURE_MENTION",
        code: "99",
        libelle: "Autres",
        estActif: true,
        opposableAuTiers: false
      },
      natureActe: "INCONNUE",
      estSousType: true
    }
  ]
};