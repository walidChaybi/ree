// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { IService } from "@model/agent/IService";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypePopinSignature } from "@model/signature/ITypePopinSignature";
import { Request, Response, fetch } from "@remix-run/web-fetch";
import { storeRece } from "@util/storeRece";
import React from "react";
import request from "superagent";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { servicesALL } from "../mock/data/servicesALL";
import { configAgent } from "../mock/superagent-config/superagent-mock-agent";
import { configComposition } from "../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../mock/superagent-config/superagent-mock-etatcivil";
import { configMail } from "../mock/superagent-config/superagent-mock-mail";
import { configOutiltech } from "../mock/superagent-config/superagent-mock-outiltech";
import { configParamsBaseRequete } from "../mock/superagent-config/superagent-mock-params";
import { configRequetes } from "../mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "../mock/superagent-config/superagent-mock-televerification";

// @ts-expect-error
if (!globalThis.testSetuped) {
  // Permet d'éviter de devoir importer React inutilement dans les tests
  global.React = React;

  // Permet de tester la navigation via ReactRouterDom
  // @ts-expect-error
  globalThis.fetch = fetch;
  // @ts-expect-error
  globalThis.Request = Request;
  // @ts-expect-error
  globalThis.Response = Response;

  // @ts-expect-error
  globalThis.mockLocalStorageFF = () => {
    let store: any = {
      FF_CONSULT_ACTE_RQT: "true",
      FF_DELIV_CS: "true",
      FF_RQT_INFORMATION: "true",
      FF_DELIVRANCE_EXTRAITS_COPIES: "true",
      FF_LOG_SERVEUR: "true",
      FF_RETOUR_SDANF: "true",
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
  };

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

  storeRece.listeServices = servicesALL.data as any as IService[];

  window.URL.createObjectURL = vi.fn(() => "url_test");

  window.HTMLElement.prototype.scrollIntoView = vi.fn();

  window.alert = () => {};

  process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug

  // @ts-expect-error
  globalThis.testSetuped = true;
}

// @ts-expect-error
export const localStorageFeatureFlagMock = globalThis.mockLocalStorageFF();

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
  await DocumentDelivrance.init();
  await NatureMention.init();
  await TypeMention.init();
  await TypePopinSignature.init();
  await TypePieceJustificative.init();
  await PaysSecabilite.init();
  await ParametreBaseRequete.init();
  storeRece.listeServices = servicesALL.data as any as IService[];
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
