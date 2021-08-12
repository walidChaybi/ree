import { Orientation } from "../../model/composition/enum/Orientation";
import { IDocumentReponse } from "../../model/requete/v2/IDocumentReponse";
import { imagePngVideBase64 } from "./ImagePng";

export const idDocumentReponse1 = "188c2a72-1942-4592-8c2d-5d1e47d1d57b";

export const documentReponseCARN_CSPAC_01: IDocumentReponse = {
  id: idDocumentReponse1,
  nom: "CARN_CSPAC_01.pdf",
  typeDocument: "c4f4c8fb-5ab1-40df-98ef-b4ea0dde4cb6",
  mimeType: "application/pdf",
  taille: 37236,
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  nbPages: 1,
  orientation: Orientation.PORTRAIT
};
