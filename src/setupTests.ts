// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { storeRece } from "./views/common/util/storeRece";

export const localStorageFeatureFlagMock = (function () {
  let store: any = {
    FF_CONSULT_ACTE_RQT: "true",
    FF_DELIV_CS: "true",
    FF_RQT_INFORMATION: "true",
    FF_DELIV_EC_PAC: "true",
    FF_NATALI: "true",
    LOG_SERVEUR: "1"
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

window.URL.createObjectURL = jest.fn(() => "url_test");

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const TIME_OUT_MS = 30000;
jest.setTimeout(TIME_OUT_MS);

process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug
