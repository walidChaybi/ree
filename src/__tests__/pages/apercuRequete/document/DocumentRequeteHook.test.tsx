import request from "superagent";
import config from "../../../../mock/superagent-config/superagent-mock-requetes";
import { requestDocumentApi } from "../../../../views/common/hook/DocumentRequeteHook";
import requetes from "../../../../mock/data/requetes.json";
import { GroupementDocument } from "../../../../model/requete/GroupementDocument";
import { MimeType } from "../../../../ressources/MimeType";
import { IRequestDocumentApiResult } from "../../../../api/appels/requeteApi";
import { convertToBlob } from "../../../../views/pages/apercuRequete/contenu/document/DocumentPresentation";

const superagentMock = require("superagent-mock")(request, config);

test("Appel d'api retournant le contenu d'une pièce justificative", async () => {
  const pieceJustificative = requetes.data[0].piecesJustificatives[0];
  const resultApi: IRequestDocumentApiResult = await requestDocumentApi(
    pieceJustificative.idPieceJustificative,
    GroupementDocument.PieceJustificative,
    pieceJustificative.mimeType
  );

  const base64 = resultApi.documentDelivre.contenu;
  const blob = convertToBlob(base64, MimeType.IMAGE_PNG);
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.size).toBe(385179);
  expect(blob.type).toBe(MimeType.IMAGE_PNG);
});

test("Appel d'api retournant le contenu d'un courrier d'accompagnement", async () => {
  const courrierAccompagnement = requetes.data[0].reponse.documentsDelivres[1];
  const resultApi = await requestDocumentApi(
    courrierAccompagnement.idDocumentDelivre,
    GroupementDocument.CourrierAccompagnement
  );
  const base64 = resultApi.documentDelivre.contenu;
  const blob = convertToBlob(base64, MimeType.APPLI_PDF);
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.size).toBe(151807);
  expect(blob.type).toBe(MimeType.APPLI_PDF);
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

afterAll(() => {
  superagentMock.unset();
});
