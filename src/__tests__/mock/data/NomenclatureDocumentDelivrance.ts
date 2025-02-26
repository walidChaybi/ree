import { IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";

export const DOCUMENT_DELIVRANCE = [
  {
    id: "fce55a9f-4f4b-4996-a60b-59332bc10565",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_17",
    libelle: "Divers (17)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Divers",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "8b808725-a83e-4ce5-81a2-192cd09e0cb2",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "COPIE_NON_SIGNEE",
    libelle: "Copie intégrale archive",
    categorieDocumentDelivrance: "Copie non signée",
    correspondanceDila: true
  },
  {
    id: "28580709-06dd-4df2-bf6e-70a9482940a1",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "EXTRAIT_AVEC_FILIATION",
    libelle: "Extrait avec filiation",
    categorieDocumentDelivrance: "Extrait avec filiation",
    correspondanceDila: true
  },
  {
    id: "318a2726-0d04-4558-8b36-8fe48780def5",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "EXTRAIT_SANS_FILIATION",
    libelle: "Extrait sans filiation",
    categorieDocumentDelivrance: "Extrait sans filiation",
    correspondanceDila: true
  },
  {
    id: "d08e2228-1a02-478f-939e-db5dd5ac6999",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "ATTESTATION_PACS",
    libelle: "Attestation de PACS",
    categorieDocumentDelivrance: "Attestation",
    correspondanceDila: true
  },
  {
    id: "34da88e2-c5c7-4324-ac8e-b35193352e64",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_PACS",
    libelle: "Certificat de situation au PACS",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "b902e0a8-1cdb-48a6-841a-7fb77da22898",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_PACS_RC",
    libelle: "Certificat de situation au PACS et RC",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "ec161aa5-5c0c-429d-abdf-f9017e8e26b4",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_PACS_RCA",
    libelle: "Certificat de situation au PACS et RCA",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "25d725b1-d62e-4024-ba37-be5935a00869",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_PACS_RC_RCA",
    libelle: "Certificat de situation au PACS, RC et RCA",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "0617a018-0f4b-4143-b593-0537c1536b09",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RC",
    libelle: "Certificat de situation au RC",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "2587ab13-cf95-4a99-95ea-62014a9d6309",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RC_RCA",
    libelle: "Certificat de situation au RC et RCA",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION_RCA",
    libelle: "Certificat de situation au RCA",
    categorieDocumentDelivrance: "Certificat de situation demandé",
    correspondanceDila: true
  },
  {
    id: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "EXTRAIT_PLURILINGUE",
    libelle: "Extrait plurilingue",
    categorieDocumentDelivrance: "Extrait plurilingue",
    correspondanceDila: true
  },
  {
    id: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CAD_EC_116",
    libelle: "Délivrance d'acte (116)",
    categorieDocumentDelivrance: "Courrier avec délivrance E/C",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "4b60aab4-2e9f-479c-bec6-f38edbd6e647",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CAD_EC_50",
    libelle: "Délivrance d'acte incomplet (50)",
    categorieDocumentDelivrance: "Courrier avec délivrance E/C",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "34877875-f86f-4a62-9bdc-c0989ad6c4eb",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CAD_ARCH_118",
    libelle: "Délivrance d'acte non authentique (118)",
    categorieDocumentDelivrance: "Courrier avec délivrance E/C - Copie archive",
    correspondanceDila: false,
    texteLibre: false
  },
  {
    id: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "COPIE_INTEGRALE",
    libelle: "Copie intégrale",
    categorieDocumentDelivrance: "Copie intégrale",
    correspondanceDila: true
  },
  {
    id: "2776c0c7-2ad4-4949-9743-046c4c687eec",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_RDM",
    libelle: "Refus délivrance mariage",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Divers",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "5fe1799c-121d-4027-88c4-4542f176513d",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_PAC_01",
    libelle: "Courrier de non délivrance attestation PACS",
    categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
    correspondanceDila: false
  },
  {
    id: "bdf30e59-3447-4114-a127-aa1310337761",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_CSPAC_02",
    libelle: "Courrier de refus ressortissants français",
    categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
    correspondanceDila: false
  },
  {
    id: "46e32744-1056-4f96-af3e-e1df1ba9b6a4",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_SITUATION",
    libelle: "Certificat de situation",
    categorieDocumentDelivrance: "Certificat de situation délivré",
    correspondanceDila: false
  },
  {
    id: "516f0133-1618-444e-ad41-59863c8c9412",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_INSCRIPTION_RC",
    libelle: "Certificat d'inscription au RC",
    categorieDocumentDelivrance: "Certificat d'inscription",
    correspondanceDila: false
  },
  {
    id: "d407f403-ca22-4e06-9c46-b7ab7fa5b9fc",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CERTIFICAT_INSCRIPTION_RCA",
    libelle: "Certificat d'inscription au RCA",
    categorieDocumentDelivrance: "Certificat d'inscription",
    correspondanceDila: false
  },
  {
    id: "5ce13f3a-d98c-401a-a2fe-8fde23878b4c",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_CS_01",
    libelle: "Courrier de non délivrance certificat de situation - mariage actif",
    categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
    correspondanceDila: false
  },
  {
    id: "0c82b27a-7ade-4dce-aa61-b88f07726c1b",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_CSPAC_01",
    libelle: "Courrier de refus demande incomplète ou illisible PACS/RC/RCA",
    categorieDocumentDelivrance: "Courrier sans délivrance PACS/Certificat",
    correspondanceDila: false
  },
  {
    id: "1d5eb83e-f4e0-4a94-8035-393a55489013",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "NOTICE_CTV",
    libelle: "Notice CTV",
    categorieDocumentDelivrance: "Notice CTV",
    correspondanceDila: true
  },
  {
    id: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_117",
    libelle: "Informations diverses manquantes (117)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Requête incomplète",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "0296fc7a-fb81-4eb7-a72f-94286b8d8301",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_18",
    libelle: "Mandat généalogiste manquant (18)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Requête incomplète",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "fd2c6d07-367f-4770-994c-397c0bc63fba",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_19",
    libelle: "Justificatif représentant légal manquant (19)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Requête incomplète",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "c1c17758-98ce-444e-82eb-a4f885fddc2c",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_115",
    libelle: "Acte non trouvé (115)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Acte non détenu au SCEC",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "c40bccfd-8e65-47fc-a3eb-1d25d7779a29",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_64",
    libelle: "Acte non trouvé Algérie (64)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Acte non détenu au SCEC",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "002f64ff-b3da-4ff1-8f81-704059134327",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_24",
    libelle: "Acte de naissance non trouvé pour mariage (24)",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Acte non détenu au SCEC",
    correspondanceDila: false,
    texteLibre: true
  },
  {
    id: "db0a3d5a-34ca-47bf-bce5-33ec7ffb9148",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_APR",
    libelle: "Attestation de pension de réversion",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Acte non détenu au SCEC",
    correspondanceDila: false,
    texteLibre: false
  },
  {
    id: "062526c5-e5a7-48d1-bc22-11938347f0bc",
    categorie: "DOCUMENT_DELIVRANCE",
    code: "CARN_EC_PTA",
    libelle: "Proposition de transcription d'acte",
    categorieDocumentDelivrance: "Courrier sans délivrance E/C - Acte non détenu au SCEC",
    correspondanceDila: false,
    texteLibre: true
  }
] as IDocumentDelivrance[];
