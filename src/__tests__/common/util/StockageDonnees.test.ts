import { stockageDonnees } from "../../../views/common/util/stockageDonnees";

test("gestion du stockage des critères de RMC Requête", async () => {
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

test("gestion du stockage des critères de RMC Acte Inscription", async () => {
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
