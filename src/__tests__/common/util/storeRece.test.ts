import { storeRece } from "@util/storeRece";
import request from "superagent";
import officier from "../../../mock/data/connectedUser.json";
import { configAgent } from "../../../mock/superagent-config/superagent-mock-agent";

const superagentMock = require("superagent-mock")(request, configAgent);

test("store rece works ", async () => {
  expect(storeRece.utilisateurCourant).toBeUndefined();

  storeRece.utilisateurCourant = { ...officier, idSSO: "idSSo" };
  expect(storeRece.utilisateurCourant).toBeDefined();
});

test("store rece code pin ", async () => {
  expect(storeRece.codePin).toBeUndefined();

  storeRece.codePin = "1234";
  expect(storeRece.codePin).toBeDefined();
});

test("store rece listeUtilisateurs", async () => {
  expect(storeRece.listeUtilisateurs).toStrictEqual([]);

  storeRece.listeUtilisateurs = [
    {
      idArobas: "1234",
      idUtilisateur: "1234",

      nom: "Benoit",
      prenom: "Newton"
    }
  ];
  expect(storeRece.listeUtilisateurs).toBeDefined();
});

test("store rece listeEntite ", async () => {
  expect(storeRece.listeEntite).toStrictEqual([]);

  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: "Salle",
      code: "1234",
      libelleEntite: "Salut"
    }
  ];
  expect(storeRece.listeEntite).toBeDefined();
});

test("get prenom d'un id ", () => {
  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Young",
      nom: "Ashley"
    }
  ];
  expect(
    storeRece.getPrenomUtilisateurFromID("7a091a3b-6835-4824-94fb-527d68926d56")
  ).toStrictEqual("Young");
});

test("get nom d'un id ", () => {
  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Young",
      nom: "Ashley"
    }
  ];
  expect(
    storeRece.getNomUtilisateurFromID("7a091a3b-6835-4824-94fb-527d68926d56")
  ).toStrictEqual("Ashley");
});

test("get nom d'une entité ", () => {
  storeRece.listeEntite = [
    {
      idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
      libelleEntite: "BAG Assitance Informatique",
      type: "etrange",
      code: "1234"
    }
  ];
  expect(
    storeRece.getLibelleEntite("6737d2f8-f2af-450d-a376-f22f6df6ff1d")
  ).toStrictEqual("BAG Assitance Informatique");
});

afterAll(() => {
  superagentMock.unset();
});
