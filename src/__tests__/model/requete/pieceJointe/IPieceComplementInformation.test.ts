import { mapPieceComplementInformation } from "@model/requete/pieceJointe/IPieceComplementInformation";
import { expect, test } from "vitest";

test("DOIT mapper correctement une PC venant du serveur en IPieceComplementInformation", () => {
  const pjDuServeur = {
    base64File: {
      fileName: "AN_plurinlingue_v2.png",
      base64String: "+base64==",
      extension: "png",
      mimeType: "image/png",
      taille: 63736
    },
    type: {
      cle: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
      libelle: "Acte à transcrire",
      ordre: 1
    }
  };

  const pjFront = mapPieceComplementInformation(pjDuServeur);
  expect(pjFront.provenance).toBe("OEC");
});
