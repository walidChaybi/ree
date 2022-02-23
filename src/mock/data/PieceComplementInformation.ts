import { Provenance } from "../../model/requete/enum/Provenance";
import { IPieceComplementInformation } from "../../model/requete/pieceJointe/IPieceComplementInformation";
import { imagePngVideBase64 } from "./ImagePng";

export const idPieceComplementInformation = [
  "c4306a3c-6bd4-422f-a56b-20760795ba61"
];

export const pieceComplementInformation: IPieceComplementInformation = {
  id: idPieceComplementInformation[0],
  provenance: Provenance.COURRIER,
  nom: "nom",
  cheminSwift: "chemin",
  contenu: imagePngVideBase64, // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
  mimeType: "image/png"
};
