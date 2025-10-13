import { Orientation } from "@model/composition/enum/Orientation";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { EValidation } from "@model/requete/enum/EValidation";
import { EMimeType } from "../../../ressources/EMimeType";
import { imagePngVideBase64 } from "./ImagePng";

export const idDocumentsReponse = ["bbac2335-562c-4b14-96aa-4386814c02a2", "ccac2335-562c-4b14-96aa-4386814c02b3"];

export const documentReponseCARN_CSPAC_01: IDocumentReponse = {
  id: idDocumentsReponse[0],
  nom: "CARN_CSPAC_01",
  typeDocument: "0c82b27a-7ade-4dce-aa61-b88f07726c1b",
  mimeType: EMimeType.IMAGE_PNG,
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift"
};

export const documentReponseCertificatRCA: IDocumentReponse = {
  id: idDocumentsReponse[1],
  nom: "CERTIFICAT_INSCRIPTION_RCA",
  typeDocument: "d407f403-ca22-4e06-9c46-b7ab7fa5b9fc",
  mimeType: EMimeType.IMAGE_PNG,
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift"
};

export const documentReponseCourrier117: IDocumentReponse = {
  id: "c4f4c8fb-562c-4b14-96aa-4386814c05d8",
  nom: "CARN_EC_117",
  typeDocument: "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2",
  mimeType: EMimeType.IMAGE_PNG,
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  texteLibreCourrier: {
    id: "e56bfaf1-8c0e-422f-ba49-58a40039bcbe",
    texte: "Texte libre Courrier 117"
  },
  optionsCourrier: [
    {
      idOptioncourrier: "4ca2229c-dfaa-44f2-b3b8-55910282f969",
      code: "fc60d127-45c1-4453-916a-e4d107a5d026",
      numeroOrdreEdition: 1,
      texte: "- le lieu de l'événement (ville et/ou pays)",
      idDocumentReponse: "c4f4c8fb-562c-4b14-96aa-4386814c05d8"
    }
  ],
  conteneurSwift: "conteneurSwift"
};

export const documentReponseCopieIntegrale: IDocumentReponse = {
  id: idDocumentsReponse[1],
  nom: "COPIE_INTEGRALE",
  typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
  mimeType: EMimeType.IMAGE_PNG,
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift",
  avecCtv: true
};

export const documentReponseExtraitAvecFiliation: IDocumentReponse = {
  id: "9bfa865e-6d7a-4d66-900e-b548178854db",
  nom: "Extrait copie avec filiation",
  typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1",
  mimeType: EMimeType.APPLI_PDF,
  taille: 28828,
  contenu: imagePngVideBase64,
  avecCtv: false,
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  referenceSwift: "9bfa282d-1e66-4538-b242-b9de4f683f0f_9bfaca5e-a9f5-4e68-83fb-4b97d3e50285.pdf",
  conteneurSwift: "documents-delivres-2022-2",
  validation: EValidation.N,
  idActe: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
  optionsCourrier: [],
  mentionsRetirees: []
};

export const documentReponseCopieNonSignee: IDocumentReponse = {
  id: idDocumentsReponse[1],
  nom: "COPIE_NON_SIGNEE",
  typeDocument: "8b808725-a83e-4ce5-81a2-192cd09e0cb2",
  mimeType: EMimeType.IMAGE_PNG,
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift"
};
