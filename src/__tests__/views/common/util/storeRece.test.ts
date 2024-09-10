import officier from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { storeRece } from "@util/storeRece";
import { expect, test } from "vitest";

test("store rece works ", async () => {
  expect(storeRece.utilisateurCourant).toBeUndefined();

  storeRece.utilisateurCourant = {
    ...officier,
    idSSO: "idSSo"
  } as any as IOfficier;
  expect(storeRece.utilisateurCourant).toBeDefined();
});

test("get prenom d'un id ", () => {
  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Young",
      nom: "Ashley"
    } as IUtilisateur
  ];
  expect(
    storeRece.getPrenomUtilisateurAPartirID(
      "7a091a3b-6835-4824-94fb-527d68926d56"
    )
  ).toStrictEqual("Young");
});

test("get nom d'un id ", () => {
  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Young",
      nom: "Ashley"
    } as IUtilisateur
  ];
  expect(
    storeRece.getNomUtilisateurAPartirID("7a091a3b-6835-4824-94fb-527d68926d56")
  ).toStrictEqual("Ashley");
});

test("get nom d'un service ", () => {
  expect(
    storeRece.getLibelleService("6737d2f8-f2af-450d-a376-f22f6df6ff1d")
  ).toStrictEqual("BAG Assitance Informatique");
});
