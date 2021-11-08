import request from "superagent";
import {
  getCompteurRequetes,
  getDocument,
  getRequete,
  getRequetes,
  patchDocumentsDelivresRequetes,
  patchStatutRequete,
  patchUtilisateurAssigneRequete,
  TypeAppelRequete
} from "../../../api/appels/requeteApi";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { GroupementDocument } from "../../../model/requete/GroupementDocument";
import { StatutRequete } from "../../../model/requete/StatutRequete";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("requeteapi api DocumentDelivre doc a signer", () => {
  getDocument(
    "f9279c00-5d2b-11ea-bc55-0242ac130004",
    GroupementDocument.DocumentDelivre
  ).then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api getDocumentASigner piece justificative", () => {
  getDocument(
    "e496f1d1-18c3-48ca-ae87-e97582fbf188",
    GroupementDocument.PieceJustificative
  ).then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api getRequetes mes requetes", () => {
  getRequetes(
    TypeAppelRequete.MES_REQUETES,
    "A_SIGNER",
    "idSagaDila",
    "ASC"
  ).then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api getRequetes requete service", () => {
  getRequetes(
    TypeAppelRequete.REQUETE_SERVICE,
    "A_SIGNER",
    "dateStatut",
    "ASC"
  ).then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api getRequete", () => {
  getRequete("104b8563-c7f8-4748-9daa-f26558985894").then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api getCompteurRequetes", () => {
  getCompteurRequetes().then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api patchStatutRequete", () => {
  patchStatutRequete({ statut: StatutRequete.ASigner, idRequete: "test" }).then(
    (result: any) => {
      expect(result).toBeDefined();
    }
  );
});

test("requeteapi api patchDocumentsDelivresRequetes", () => {
  patchDocumentsDelivresRequetes([
    { contenu: "", nom: "", conteneurSwift: "" }
  ]).then((result: any) => {
    expect(result).toBeDefined();
  });
});

test("requeteapi api patchUtilisateurAssigneRequete", () => {
  patchUtilisateurAssigneRequete({ nomOec: "", prenomOec: "" }).then(
    (result: any) => {
      expect(result).toBeDefined();
    }
  );
});

afterAll(() => {
  superagentMock.unset();
});
