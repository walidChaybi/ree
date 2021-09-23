import { Orientation } from "../../model/composition/enum/Orientation";
import { IDocumentReponse } from "../../model/requete/v2/IDocumentReponse";
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
  typeDocument: "c4f4c8fb-5ab1-40df-98ef-b4ea0dde4cb6",
  mimeType: "image/png",
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT
};

export const documentReponseCertificatRCA: IDocumentReponse = {
  id: idDocumentsReponse[1],
  nom: "CERTIFICAT_INSCRIPTION_RCA",
  typeDocument: "c4f4c8fb-5ab1-40df-98ef-b4ea0dde4cc7",
  mimeType: "image/png",
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT
};
