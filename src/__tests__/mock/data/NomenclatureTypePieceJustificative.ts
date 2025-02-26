import { ITypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";

export const TYPE_PIECE_JUSTIFICATIVE = [
  {
    id: "877300ab-555a-418f-ab0d-9963610c36e2",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "AUTORISATION",
    libelle: "Autorisation de consultation",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "DELIVRANCE",
    ordre: 1
  },
  {
    id: "83b0f8c8-7800-443c-879a-fdb5ab5e2013",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "INFORMATION",
    libelle: "Pièce requête information",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "INFORMATION",
    ordre: 1
  },
  {
    id: "00c885c9-2918-46fe-b743-798b1b90e5dd",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "CARTE_PROFESSIONNELLE",
    libelle: "Carte professionnelle",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "DELIVRANCE",
    ordre: 2
  },
  {
    id: "ab32e570-9171-4760-ac66-851e52110a27",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "DECISION_PROTECTION",
    libelle: "Décision de mise sous protection",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "DELIVRANCE",
    ordre: 3
  },
  {
    id: "d4f9e898-cf26-42cc-850b-007e9e475e7a",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "CREATION",
    libelle: "Pièce requête création",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "CREATION",
    typeRedactionActe: "ETABLI",
    ordre: 1
  },
  {
    id: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "TRANSCRIPTION_ACTE",
    libelle: "Acte à transcrire",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "CREATION",
    typeRedactionActe: "TRANSCRIT",
    ordre: 1
  },
  {
    id: "6c95641f-59fe-4155-a6ba-8b42433c04ec",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "TRANSCRIPTION_TITULAIRE_ACTE",
    libelle: "Titulaire",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "CREATION",
    typeRedactionActe: "TRANSCRIT",
    ordre: 2
  },
  {
    id: "93e4f39b-0fc5-47f4-8434-2d362f897987",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "TRANSCRIPTION_PARENT_TITULAIRE_ACTE",
    libelle: "Parents du titulaire",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "CREATION",
    typeRedactionActe: "TRANSCRIT",
    ordre: 3
  },
  {
    id: "f14f8f0d-a146-48c3-a04e-285b9a2a4451",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "TRANSCRIPTION_AUTRE",
    libelle: "Autres pièces justificatives",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "CREATION",
    typeRedactionActe: "TRANSCRIT",
    ordre: 4
  },
  {
    id: "d2aa8943-d904-4f4f-bb4b-72d02978ef2e",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "AUTRE",
    libelle: "Autre",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "DELIVRANCE",
    ordre: 5
  },
  {
    id: "f4e3453b-7713-45ef-a82c-e40df43d5b67",
    categorie: "TYPE_PIECE_JUSTIFICATIVE",
    code: "MANDAT",
    libelle: "Mandat",
    usageTeleprocedure: true,
    usageRECE: true,
    typeRequete: "DELIVRANCE",
    ordre: 4
  }
] as ITypePieceJustificative[];
