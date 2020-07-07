import request from "superagent";
import config from "../../../../../../api/mock/superagent-mock-config.js";
import { requestDocumentApi } from "../DocumentRequeteHook";
import requetes from "../../../../../../api/mock/requetes.json";
import { GroupementDocument } from "../../../../../../model/requete/GroupementDocument";
const superagentMock = require("superagent-mock")(request, config);

test("Appel d'api retournant le contenu d'une pièce justificative", async () => {
  const pieceJustificative = requetes.data[0].piecesJustificatives[0];
  const resultApi = await requestDocumentApi(
    pieceJustificative.idPieceJustificative,
    GroupementDocument.PieceJustificative,
    pieceJustificative.mimeType
  );
  expect(resultApi).toBeInstanceOf(Blob);
  expect(resultApi.size).toBe(385179);
  expect(resultApi.type).toBe("image/png");
});

test("Appel d'api retournant le contenu d'un courrier d'accompagnement", async () => {
  const courrierAccompagnement = requetes.data[0].reponse.documentsDelivres[1];
  const resultApi = await requestDocumentApi(
    courrierAccompagnement.idDocumentDelivre,
    GroupementDocument.CourrierAccompagnement
  );
  expect(resultApi).toBeInstanceOf(Blob);
  expect(resultApi.size).toBe(151807);
  expect(resultApi.type).toBe("application/pdf");
});

test("Appel d'api retournant le contenu d'un courrier d'accompagnement KO", async () => {
  const courrierAccompagnement = requetes.data[0].reponse.documentsDelivres[1];
  return requestDocumentApi(
    `${courrierAccompagnement.idDocumentDelivre}fakedoc`,
    GroupementDocument.CourrierAccompagnement
  )
    .then(result => {
      expect(result).toBe("ko");
    })
    .catch(error => {
      expect(error).toBeTruthy();
    });
});
