import { waitFor } from "@testing-library/react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IDocumentReponse } from "../../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/IRequeteDelivrance";
const superagentMock = require("superagent-mock")(request, configRequetes);

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

test("estAuStatut", () => {
  const requete = {
    statutCourant: {
      statut: StatutRequete.A_TRAITER
    }
  } as IRequeteDelivrance;
  expect(
    RequeteDelivrance.estAuStatut(requete, StatutRequete.A_TRAITER)
  ).toBeTruthy();
});

test("estAuStatutASigner", () => {
  const requete = {
    statutCourant: {
      statut: StatutRequete.A_TRAITER
    }
  } as IRequeteDelivrance;
  expect(RequeteDelivrance.estAuStatutASigner(requete)).toBeFalsy();
});

afterAll(() => {
  superagentMock.unset();
});
