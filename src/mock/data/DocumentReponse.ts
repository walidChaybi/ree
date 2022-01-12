import { Orientation } from "../../model/composition/enum/Orientation";
import { IDocumentReponse } from "../../model/requete/IDocumentReponse";
import { imagePngVideBase64 } from "./ImagePng";

export const idDocumentsReponse = [
  "bbac2335-562c-4b14-96aa-4386814c02a2",
  "ccac2335-562c-4b14-96aa-4386814c02b3"
];

export const idDocumentsReponse2 = [
  "bbac2335-562c-4b14-96aa-4386814c02a2", // intentionnel: 3 uuid identiques
  "bbac2335-562c-4b14-96aa-4386814c02a2",
  "bbac2335-562c-4b14-96aa-4386814c02a2"
];

export const documentReponseCARN_CSPAC_01: IDocumentReponse = {
  id: idDocumentsReponse[0],
  nom: "CARN_CSPAC_01",
  typeDocument: "0c82b27a-7ade-4dce-aa61-b88f07726c1b",
  mimeType: "image/png",
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
  mimeType: "image/png",
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
  mimeType: "image/png",
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
  mimeType: "image/png",
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift"
};

export const documentReponseCopieNonSigne: IDocumentReponse = {
  id: idDocumentsReponse[1],
  nom: "COPIE_NON_SIGNEE",
  typeDocument: "8b808725-a83e-4ce5-81a2-192cd09e0cb2",
  mimeType: "image/png",
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneurSwift"
};
