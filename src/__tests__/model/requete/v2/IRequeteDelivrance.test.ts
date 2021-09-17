import { waitFor } from "@testing-library/react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../src/mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/v2/IRequeteDelivrance";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("Attendu: RequeteDelivrance.getDocumentsDeDelivrance fonctionne correctement", async () => {
  await DocumentDelivrance.init();
  let documentDelivrance: IDocumentReponse;
  let requete: IRequeteDelivrance;

  documentDelivrance = {
    nom: "test",
    typeDocument:
      DocumentDelivrance.getCourrierNonDelivranceAttestationPacsUUID()
  } as IDocumentReponse;

  const autreDocument = {
    nom: "autre",
    typeDocument: "123456"
  } as IDocumentReponse;

  requete = {
    documentsReponses: [autreDocument, documentDelivrance, autreDocument]
  } as IRequeteDelivrance;

  await waitFor(() => {
    expect(RequeteDelivrance.getDocumentsDeDelivrance(requete)).toEqual([
      documentDelivrance
    ]);
  });
});

afterAll(() => {
  superagentMock.unset();
});
