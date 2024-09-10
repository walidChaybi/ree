import { stockageDonnees } from "@util/stockageDonnees";
import { expect, test } from "vitest";

test("gestion du stockage des critères de RMC Requête", () => {
  const localStorageMock = (function () {
    let store: any = {};
    return {
      getItem: function (key: string) {
        return store[key];
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key: string) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const values = { titutlaire: { nom: "nom" } };
  stockageDonnees.stockerCriteresRMCReq(values);
  expect(stockageDonnees.recupererCriteresRMCReq()).toEqual(values);
});

test("gestion du stockage des critères de RMC Acte Inscription", () => {
  const localStorageMock = (function () {
    let store: any = {};
    return {
      getItem: function (key: string) {
        return store[key];
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key: string) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const values = { titutlaire: { prenom: "prenom" } };
  stockageDonnees.stockerCriteresRMCActeInspt(values);
  expect(stockageDonnees.recupererCriteresRMCActeInspt()).toEqual(values);
});
