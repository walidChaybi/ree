import { MimeType } from "../../../ressources/MimeType";
import { PieceJointe } from "../../../utils/FileUtils";

export const piecesJointesMock = [
  {
    base64File: {
      base64String: "12345",
      fileName: "blaBla",
      taille: 18,
      mimeType: MimeType.APPLI_PDF
    }
  } as PieceJointe,
  {
    base64File: {
      base64String: "12345",
      fileName: "blaBla",
      taille: 18,
      mimeType: MimeType.APPLI_PDF
    }
  } as PieceJointe
];
