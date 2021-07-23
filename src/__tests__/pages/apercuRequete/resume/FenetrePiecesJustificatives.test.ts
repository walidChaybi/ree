import { onClose } from "../../../../views/pages/apercuRequete/resume/contenu/piecesJustificatives/FenetrePiecesJustificatives";

test("onClose", () => {
  const toggleFenetre = jest.fn();
  onClose({
    idPiece: "string",
    nom: "string",
    numRequete: "string",
    toggleFenetre
  });
  expect(toggleFenetre).toHaveBeenCalledTimes(1);
});
