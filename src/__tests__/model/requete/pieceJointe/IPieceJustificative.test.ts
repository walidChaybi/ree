import { mapPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";

test("DOIT mapper correctement une PJ venant du serveur en IPieceJustificative", () => {
  const pjDuServeur = {
    base64File: {
      fileName: "AN_plurinlingue_v2.png",
      base64String: "+base64==",
      extension: "png",
      mimeType: "image/png",
      taille: 63736
    },
    type: {
      value: "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a",
      str: "Acte à transcrire",
      ordre: 1
    }
  };

  const pjFront = mapPieceJustificative(pjDuServeur);

  expect(pjFront.typePieceJustificative).toBe(
    "0f1f9eba-a0a7-47ea-bfb2-f473f88beb9a"
  );
});
