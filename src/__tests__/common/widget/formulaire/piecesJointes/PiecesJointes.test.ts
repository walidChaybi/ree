import { PieceJointe } from "@util/FileUtils";
import { verificationAvantDOuvriLeMenu } from "@widget/formulaire/piecesJointes/PiecesJointes";

test("Attendu La vérification du nombre maximal de pièces jointes fonctionne correctement", () => {
  let pjs = [] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeTruthy();
  pjs = [{}, {}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeTruthy();
  pjs = [{}, {}, {}] as PieceJointe[];
  expect(verificationAvantDOuvriLeMenu(pjs)).toBeFalsy();
});
