import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import {
    IRequeteDelivrance,
    RequeteDelivrance
} from "@model/requete/IRequeteDelivrance";
import { waitFor } from "@testing-library/react";
import { actions } from "../../../../mock/data/Actions";

test("Attendu: RequeteDelivrance.getDocumentsDeDelivrance fonctionne correctement", async () => {
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

test("RequeteDelivrance.estARevoir DOIT retourner VRAI QUAND une action à revoir est présente en dernier ou avant des actions 'a signer sinon FAUX'", () => {
  expect(
    RequeteDelivrance.estARevoir({ actions: [] } as any as IRequeteDelivrance)
  ).toBeFalsy();

  expect(
    RequeteDelivrance.estARevoir({ actions } as IRequeteDelivrance)
  ).toBeTruthy();

  expect(
    RequeteDelivrance.estARevoir({
      actions: [...actions, { libelle: "À revoir", numeroOrdre: 7 }]
    } as IRequeteDelivrance)
  ).toBeTruthy();

  expect(
    RequeteDelivrance.estARevoir({
      actions: [actions[0]]
    } as IRequeteDelivrance)
  ).toBeFalsy();

  expect(
    RequeteDelivrance.estARevoir({
      actions: [actions[0], actions[1]]
    } as IRequeteDelivrance)
  ).toBeFalsy();

  expect(
    RequeteDelivrance.estARevoir({
      actions: [...actions, { libelle: "Requête transmise", numeroOrdre: 7 }]
    } as IRequeteDelivrance)
  ).toBeFalsy();
});
