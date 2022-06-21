// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { storeRece } from "./views/common/util/storeRece";

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

const TIME_OUT_MS = 30000;
jest.setTimeout(TIME_OUT_MS);

process.env.DEBUG_PRINT_LIMIT = "1000000"; // Pour debug
