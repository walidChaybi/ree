// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { Request, Response, fetch } from "@remix-run/web-fetch";
import React from "react";
import request from "superagent";
import { afterAll, beforeAll, beforeEach, vi } from "vitest";
import { configAgent } from "./mock/superagent-config/superagent-mock-agent";
import { configComposition } from "./mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "./mock/superagent-config/superagent-mock-etatcivil";
import { configMail } from "./mock/superagent-config/superagent-mock-mail";
import { configOutiltech } from "./mock/superagent-config/superagent-mock-outiltech";
import { configParamsBaseRequete } from "./mock/superagent-config/superagent-mock-params";
import { configRequetes } from "./mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "./mock/superagent-config/superagent-mock-televerification";

export const localStorageFeatureFlagMock = (() => {
  let store: any = {
    FF_DELIVRANCE_CERTIFS_SITUATION: "true",
    FF_DELIVRANCE_EXTRAITS_COPIES: "true",
    FF_LOG_SERVEUR: "true",
    FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION: "true",
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

beforeAll(async () => {
  // Permet d'éviter de devoir importer React inutilement dans les tests
  global.React = React;

  // Permet de tester la navigation via ReactRouterDom
  // @ts-expect-error
  globalThis.fetch = fetch;
  // @ts-expect-error
  globalThis.Request = Request;
  // @ts-expect-error
  globalThis.Response = Response;

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

  window.URL.createObjectURL = vi.fn(() => "url_test");

  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  window.alert = () => {};

  process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug
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
