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
  let documentDelivrance: IDocumentReponse;
  let requete: IRequeteDelivrance;
  DocumentDelivrance.getCourrierNonDelivranceAttestationPacsUUID().then(
    uuidTypeDocument => {
      documentDelivrance = {
        nom: "test",
        typeDocument: uuidTypeDocument
      } as IDocumentReponse;
      const autreDocument = {
        nom: "autre",
        typeDocument: "123456"
      } as IDocumentReponse;
      requete = {
        documentsReponses: [autreDocument, documentDelivrance, autreDocument]
      } as IRequeteDelivrance;
      console.log(RequeteDelivrance.getDocumentsDeDelivrance(requete));
    }
  );

  await waitFor(() => {
    expect(RequeteDelivrance.getDocumentsDeDelivrance(requete)).toEqual([
      documentDelivrance
    ]);
  });
});

afterAll(() => {
  superagentMock.unset();
});
