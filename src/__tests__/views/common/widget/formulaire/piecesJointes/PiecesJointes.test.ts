import { verificationAvantDOuvriLeMenu } from "@widget/formulaire/piecesJointes/PiecesJointes";
import { expect, test } from "vitest";
import { PieceJointe } from "../../../../../../utils/FileUtils";

test("Attendu La vérification du nombre maximal de pièces jointes fonctionne correctement", () => {
  let pjs = [] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeTruthy();
  pjs = [{}, {}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeTruthy();
  pjs = [{}, {}, {}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeFalsy();
});

test("DOIT accepter la nouvelle pièce jointe QUAND le nombre maximum n'a pas été atteint", () => {
  let pjs = [] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs, 2)).toBeTruthy();
  pjs = [{}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs, 2)).toBeTruthy();
  pjs = [{}, {}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs, 2)).toBeFalsy();
});
