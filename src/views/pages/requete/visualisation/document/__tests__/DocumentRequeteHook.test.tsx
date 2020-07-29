import request from "superagent";
import config from "../../../../../../api/mock/superagent-mock-config.js";
import {
  requestDocumentApi,
  IRequestDocumentApiResult,
} from "../DocumentRequeteHook";
import requetes from "../../../../../../api/mock/requetes.json";
import { GroupementDocument } from "../../../../../../model/requete/GroupementDocument";
import { convertToBlob } from "../DocumentPresentation";

const superagentMock = require("superagent-mock")(request, config);

test("Appel d'api retournant le contenu d'une pièce justificative", async () => {
  const pieceJustificative = requetes.data[0].piecesJustificatives[0];
  const resultApi: IRequestDocumentApiResult = await requestDocumentApi(
    pieceJustificative.idPieceJustificative,
    GroupementDocument.PieceJustificative,
    pieceJustificative.mimeType
  );

  const base64 = resultApi.documentDelivre.contenu;
  const blob = convertToBlob(base64, "image/png");
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.size).toBe(385179);
  expect(blob.type).toBe("image/png");
});

test("Appel d'api retournant le contenu d'un courrier d'accompagnement", async () => {
  const courrierAccompagnement = requetes.data[0].reponse.documentsDelivres[1];
  const resultApi = await requestDocumentApi(
    courrierAccompagnement.idDocumentDelivre,
    GroupementDocument.CourrierAccompagnement
  );
  const base64 = resultApi.documentDelivre.contenu;
  const blob = convertToBlob(base64, "application/pdf");
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.size).toBe(151807);
  expect(blob.type).toBe("application/pdf");
});

test("Appel d'api retournant le contenu d'un courrier d'accompagnement KO", async () => {
  const courrierAccompagnement = requetes.data[0].reponse.documentsDelivres[1];
  return requestDocumentApi(
    `${courrierAccompagnement.idDocumentDelivre}fakedoc`,
    GroupementDocument.CourrierAccompagnement
  )
    .then((result) => {
      expect(result).toBe("ko");
    })
    .catch((error) => {
      expect(error).toBeTruthy();
    });
});
