// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { IEntite } from "@model/agent/IEntiteRattachement";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import "@testing-library/jest-dom/extend-expect";
import { storeRece } from "@util/storeRece";
import React from "react";
import request from "superagent";
import { entitesRattachementALL } from "./mock/data/entitesRattachementALL";
import { configAgent } from "./mock/superagent-config/superagent-mock-agent";
import { configComposition } from "./mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "./mock/superagent-config/superagent-mock-etatcivil";
import { configMail } from "./mock/superagent-config/superagent-mock-mail";
import { configOutiltech } from "./mock/superagent-config/superagent-mock-outiltech";
import { configParamsBaseRequete } from "./mock/superagent-config/superagent-mock-params";
import { configRequetes } from "./mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "./mock/superagent-config/superagent-mock-televerification";

// Permet d'éviter de devoir importer React inutilement dans les tests
global.React = React;

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configEtatcivil[0],
  configParamsBaseRequete[0],
  configMail[0],
  configAgent[0],
  configComposition[0],
  configOutiltech[0],
  configTeleverification[0]
]);

export const localStorageFeatureFlagMock = (function () {
  let store: any = {
    FF_CONSULT_ACTE_RQT: "true",
    FF_DELIV_CS: "true",
    FF_RQT_INFORMATION: "true",
    FF_DELIV_EC_PAC: "true",
    FF_NATALI: "true",
    LOG_SERVEUR: "1",
    FF_RETOUR_SDANF: "true",
    FF_ACQUISITION_DECRET: "true",
    FF_INTEGRATION_REQUETE_CIBLE: "true",
    FF_SIGNER_ACTE_ETABLISSEMENT: "true"
  };
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

beforeAll(async () => {
  await DocumentDelivrance.init();
  await NatureMention.init();
  await TypeMention.init();
  await TypePieceJustificative.init();
  await PaysSecabilite.init();
  await ParametreBaseRequete.init();
});

afterAll(() => {
  superagentMock.unset();
});

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageFeatureFlagMock,
    writable: true
  });
});

afterEach(() => {
  // Réactivation de la log après chaque test (certains tests la désactive car les erreurs logguées sont normales)
  storeRece.logErrorOff = false;
});

if (window.document) {
  window.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });
}

storeRece.listeEntite = entitesRattachementALL.data as any as IEntite[];

window.URL.createObjectURL = jest.fn(() => "url_test");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

window.alert = () => {};

const TIME_OUT_MS = 3000000;
jest.setTimeout(TIME_OUT_MS);

process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug
